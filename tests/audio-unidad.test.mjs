// Importa las herramientas de prueba, el reproductor y los datos de la unidad.
import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { obtenerFragmento, prepararAudioUnidad } from '../js/audio-unidad.js';
import { unidad1 } from '../js/datos/hsk1/unidad1.js';

// Lee los tiempos reales de la primera unidad para usarlos en las comprobaciones.
const mapa = JSON.parse(readFileSync(new URL(unidad1.audio.mapa), 'utf8'));

// Selecciona las demás unidades cuyas grabaciones se van a comprobar.
const unidadesConAudio = [
  ...[2, 3, 4, 5, 6].map((numero) => ({ hsk: 1, numero })),
  ...Array.from({ length: 10 }, (_, i) => ({ hsk: 2, numero: i + 1 })),
  { hsk: 3, numero: 7 }
];
// Verifica los archivos, los tiempos sin solapamientos y el texto de los ejemplos.
for (const { hsk, numero } of unidadesConAudio) {
  const modulo = await import(`../js/datos/hsk${hsk}/unidad${numero}.js`);
  const unidad = modulo[`unidad${numero}`];
  test(`HSK ${hsk}, unidad ${numero}: cada palabra y ejemplo tiene tiempos válidos y archivo disponible`, () => {
    const tiempos = JSON.parse(readFileSync(new URL(unidad.audio.mapa), 'utf8'));
    assert.ok(existsSync(new URL(tiempos.archivo, unidad.audio.mapa)));
    assert.deepEqual(Object.keys(tiempos.entradas), unidad.vocabulario.map((v) => v.hanzi));
    let finAnterior = 0;
    for (const entrada of unidad.vocabulario) {
      for (const tipo of ['palabra', 'ejemplo']) {
        const fragmento = obtenerFragmento(tiempos, entrada.hanzi, tipo, tiempos.duracion);
        assert.ok(fragmento.inicio >= finAnterior, 'los fragmentos no se solapan');
        finAnterior = fragmento.fin;
      }
      assert.equal(tiempos.entradas[entrada.hanzi].ejemplo.texto, entrada.example);
    }
  });
}

// Comprueba que la primera unidad tiene archivo y fragmentos para todas sus entradas.
test('el JSON apunta al MP3 compatible y contiene las 9 palabras y sus 9 ejemplos', () => {
  assert.ok(existsSync(new URL(mapa.archivo, unidad1.audio.mapa)));
  assert.equal(Object.keys(mapa.entradas).length, unidad1.vocabulario.length);
  for (const entrada of unidad1.vocabulario) {
    for (const tipo of ['palabra', 'ejemplo']) {
      const fragmento = obtenerFragmento(mapa, entrada.hanzi, tipo, 49.94);
      assert.ok(fragmento.fin - fragmento.inicio > 0.2);
    }
    assert.equal(mapa.entradas[entrada.hanzi].ejemplo.texto, entrada.example);
  }
});

// Comprueba que los tiempos inválidos provocan un error.
test('rechaza tiempos inválidos o que superan la duración del archivo', () => {
  for (const fragmento of [null, { inicio: -1, fin: 1 }, { inicio: 1, fin: 1 },
    { inicio: 2, fin: 1 }, { inicio: 0, fin: 60 }, { inicio: '0', fin: 1 }, { inicio: 0, fin: NaN }]) {
    assert.throws(() => obtenerFragmento({ entradas: { a: { palabra: fragmento } } }, 'a', 'palabra', 49.94));
  }
});

// Verifica que una entrada ausente no impide consultar otras válidas.
test('una entrada ausente no bloquea los audios que sí tienen tiempos', () => {
  assert.throws(() => obtenerFragmento(mapa, 'sin-audio', 'palabra', 49.94));
  assert.equal(obtenerFragmento(mapa, '你好', 'palabra', 49.94).inicio, 0);
});

// Simula el navegador para comprobar reproducción, reutilización y cancelación.
test('los botones usan los tiempos del JSON y cancelan el audio al navegar', async () => {
  // Crea controles simulados que permiten emitir clics sin abrir un navegador.
  function elemento() {
    const eventos = {};
    const clases = new Set();
    return {
      textContent: '',
      classList: { add: (s) => clases.add(s), remove: (s) => clases.delete(s) },
      setAttribute() {}, removeAttribute() {},
      addEventListener: (nombre, fn) => { eventos[nombre] = fn; },
      emitir: (nombre) => eventos[nombre]()
    };
  }
  const nodos = Object.fromEntries(['audio-status', 'word-audio', 'example-audio'].map((id) => [`#${id}`, elemento()]));
  const audio = { duration: 49.94 };
  let peticiones = 0;
  const fuentes = [];
  let decodificaciones = 0;
  let indice = 0;
  let liberar;
  let espera = Promise.resolve();
  const originales = { document: globalThis.document, window: globalThis.window, fetch: globalThis.fetch };
  // Sustituye temporalmente el documento, el audio y las descargas por simulaciones.
  globalThis.document = { querySelector: (s) => nodos[s] };
  globalThis.window = {
    addEventListener() {},
    AudioContext: class {
      resume() { return espera; }
      async decodeAudioData() { decodificaciones += 1; return audio; }
      createBufferSource() {
        const fuente = { connect() {}, disconnect() {}, stop() { this.detenida = true; }, start(...args) { this.args = args; } };
        fuentes.push(fuente);
        return fuente;
      }
    }
  };
  globalThis.fetch = async (url) => {
    peticiones += 1;
    assert.ok(url.endsWith('tiempos.json') || url.endsWith('leccion.mp3'));
    return { ok: true, json: async () => mapa, arrayBuffer: async () => new ArrayBuffer(0) };
  };
  // Ejecuta clics y comprueba qué fragmentos se reproducen y cuándo se detienen.
  try {
    const control = prepararAudioUnidad(unidad1, () => indice);
    await nodos['#word-audio'].emitir('click');
    assert.equal(fuentes.length, 1);
    assert.deepEqual(fuentes[0].args, [0, 0, 0.83]);
    await nodos['#example-audio'].emitir('click');
    assert.ok(fuentes[0].detenida);
    assert.deepEqual(fuentes[1].args, [0, 2.9, 4.36 - 2.9]);
    indice = 1;
    await nodos['#word-audio'].emitir('click');
    assert.deepEqual(fuentes[2].args, [0, 6.4, 7.2 - 6.4]);
    assert.equal(decodificaciones, 1);
    assert.equal(peticiones, 2, 'el JSON y el MP3 se cargan una sola vez');
    control.detener();
    assert.ok(fuentes[2].detenida);
    assert.equal(nodos['#audio-status'].textContent, '');

    // Simula una carga pendiente y comprueba que detenerla evita una reproducción tardía.
    espera = new Promise((resolve) => { liberar = resolve; });
    const pendiente = nodos['#word-audio'].emitir('click');
    control.detener();
    liberar();
    await pendiente;
    assert.equal(fuentes.length, 3, 'un clic pendiente no debe sonar tras navegar');

    // Comprueba el aviso cuando la palabra solicitada no tiene audio.
    prepararAudioUnidad({ ...unidad1, vocabulario: [{ hanzi: 'sin-audio' }, unidad1.vocabulario[0]] }, () => 0);
    await nodos['#word-audio'].emitir('click');
    assert.match(nodos['#audio-status'].textContent, /todavía no está disponible/);
    assert.equal(fuentes.length, 3, 'no reproduce otro audio cuando falta una entrada');

    // Verifica que reordenar el vocabulario no cambia el audio asociado a cada palabra.
    prepararAudioUnidad({ ...unidad1, vocabulario: [...unidad1.vocabulario].reverse() }, () => 0);
    await nodos['#word-audio'].emitir('click');
    assert.deepEqual(fuentes[3].args, [0, 45.86, 46.73 - 45.86], 'reordenar las tarjetas no desplaza los audios');
  // Restaura los objetos originales del entorno aunque alguna comprobación falle.
  } finally {
    for (const [nombre, valor] of Object.entries(originales)) {
      if (valor === undefined) delete globalThis[nombre];
      else globalThis[nombre] = valor;
    }
  }
});
