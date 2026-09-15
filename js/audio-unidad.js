// Obtiene un fragmento y valida que sus tiempos estén dentro del audio.
export function obtenerFragmento(mapa, hanzi, tipo, duracion) {
  const fragmento = mapa.entradas?.[hanzi]?.[tipo];
  if (!fragmento || !Number.isFinite(fragmento.inicio) || !Number.isFinite(fragmento.fin)
      || fragmento.inicio < 0 || fragmento.fin <= fragmento.inicio || fragmento.fin > duracion) {
    throw new Error('Este audio todavía no está disponible.');
  }
  return fragmento;
}

// Prepara los botones de audio; permite detener aunque la unidad no tenga grabación.
export function prepararAudioUnidad(unidad, obtenerIndice) {
  if (!unidad.audio) return { detener() {} };

  // Localiza los controles y conserva el estado de carga y reproducción.
  const estado = document.querySelector('#audio-status');
  const botones = [document.querySelector('#word-audio'), document.querySelector('#example-audio')];
  let contexto;
  let preparacion;
  let fuente;
  let solicitud = 0;

  // Detiene el audio actual e invalida las reproducciones pendientes.
  function detener() {
    solicitud += 1;
    if (fuente) {
      fuente.onended = null;
      fuente.stop();
      fuente.disconnect();
      fuente = null;
    }
    botones.forEach((boton) => {
      boton.classList.remove('is-playing');
      boton.removeAttribute('aria-busy');
    });
    estado.textContent = '';
  }

  // Carga el mapa de tiempos y decodifica el archivo de audio de la unidad.
  async function cargar() {
    const respuestaMapa = await fetch(unidad.audio.mapa, { cache: 'no-cache' });
    if (!respuestaMapa.ok) throw new Error('No se pudieron cargar los audios de la unidad. Vuelve a intentarlo.');
    const mapa = await respuestaMapa.json();
    if (typeof mapa.archivo !== 'string' || !mapa.archivo) throw new Error('Falta el archivo de audio de esta unidad.');
    const respuestaAudio = await fetch(new URL(mapa.archivo, unidad.audio.mapa).href);
    if (!respuestaAudio.ok) throw new Error('No se pudo cargar el audio. Vuelve a intentarlo.');
    const buffer = await contexto.decodeAudioData(await respuestaAudio.arrayBuffer());
    return { mapa, buffer };
  }

  // Asocia cada botón con la grabación de la palabra o de su ejemplo.
  botones.forEach((boton, indiceTipo) => {
    const tipo = indiceTipo === 0 ? 'palabra' : 'ejemplo';
    boton.addEventListener('click', async () => {
      detener();
      const actual = solicitud;
      const hanzi = unidad.vocabulario[obtenerIndice()].hanzi;
      boton.setAttribute('aria-busy', 'true');
      estado.textContent = 'Preparando el audio…';
      try {
        // Activa el sistema de audio del navegador y reutiliza la carga preparada.
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) throw new Error('Este navegador no admite la reproducción de estos audios. Prueba con otro navegador.');
        contexto ||= new AudioContext();
        // Se activa durante el clic para respetar las restricciones de reproducción móvil.
        const activacion = contexto.resume();
        preparacion ||= cargar().catch((error) => {
          preparacion = null;
          throw error;
        });
        // Descarta clics cancelados y prepara la reproducción del fragmento solicitado.
        const [, { buffer, mapa }] = await Promise.all([activacion, preparacion]);
        if (actual !== solicitud) return;
        const fragmento = obtenerFragmento(mapa, hanzi, tipo, buffer.duration);
        fuente = contexto.createBufferSource();
        fuente.buffer = buffer;
        fuente.connect(contexto.destination);
        boton.removeAttribute('aria-busy');
        boton.classList.add('is-playing');
        // Limpia el estado visual cuando termina el fragmento.
        estado.textContent = tipo === 'palabra' ? 'Escuchando la palabra…' : 'Escuchando el ejemplo…';
        fuente.onended = () => {
          fuente.disconnect();
          fuente = null;
          boton.classList.remove('is-playing');
          estado.textContent = '';
        };
        // Muestra el error de reproducción si la solicitud sigue vigente.
        fuente.start(0, fragmento.inicio, fragmento.fin - fragmento.inicio);
      } catch (error) {
        if (actual !== solicitud) return;
        detener();
        estado.textContent = error.message || 'No se pudo preparar el audio. Vuelve a intentarlo.';
      }
    });
  });
// Detiene la reproducción al abandonar la página y expone el control de parada.

  window.addEventListener('pagehide', detener);
  return { detener };
}
