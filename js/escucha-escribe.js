import { obtenerDatosUsuario } from './user-data.js?v=1';

const audioPath = (fileName) => new URL(`../audios/ejercicios/escucha-escribe/${fileName}`, import.meta.url).href;

// Define cinco frases y sus grabaciones individuales para cada dificultad.
const content = {
  easy: {
    label: 'Fácil',
    phrases: [
      ['我喜欢喝茶。', 'Me gusta beber té.', 'facil-01.m4a'],
      ['他是老师。', 'Él es profesor.', 'facil-02.m4a'],
      ['今天天气很好。', 'Hoy hace muy buen tiempo.', 'facil-03.m4a'],
      ['妈妈在家做饭。', 'Mamá cocina en casa.', 'facil-04.m4a'],
      ['我明天去学校。', 'Mañana voy a la escuela.', 'facil-05.m4a']
    ]
  },
  medium: {
    label: 'Intermedio',
    phrases: [
      ['姐姐正在看一本书。', 'Mi hermana mayor está leyendo un libro.', 'medio-01.m4a'],
      ['明天可能会下雨。', 'Puede que mañana llueva.', 'medio-02.m4a'],
      ['爸爸坐地铁去公司。', 'Papá va a la empresa en metro.', 'medio-03.m4a'],
      ['虽然很累，但是她没有休息。', 'Aunque está muy cansada, no descansa.', 'medio-04.m4a'],
      ['请把门关上。', 'Por favor, cierra la puerta.', 'medio-05.m4a']
    ]
  },
  hard: {
    label: 'Difícil',
    phrases: [
      ['如果明天下雨，我们就去爬山。', 'Si mañana llueve, iremos a la montaña.', 'dificil-01.m4a'],
      ['他的手机被弟弟弄坏了。', 'Su hermano menor le rompió el móvil.', 'dificil-02.m4a'],
      ['吃完晚饭以后，我们出去散步了。', 'Después de cenar salimos a pasear.', 'dificil-03.m4a'],
      ['这件事情没有你想象的那么简单。', 'Este asunto no es tan sencillo como imaginas.', 'dificil-04.m4a'],
      ['老师让我们下课以前交作业。', 'El profesor pidió entregar la tarea antes de acabar la clase.', 'dificil-05.m4a']
    ]
  },
  expert: {
    label: 'Experto',
    phrases: [
      ['随着科技的发展，人们的生活发生了巨大的变化。', 'Con el desarrollo tecnológico, la vida ha cambiado enormemente.', 'experto-01.m4a'],
      ['与其浪费时间抱怨，不如想办法解决问题。', 'En vez de perder tiempo quejándose, es mejor buscar una solución.', 'experto-02.m4a'],
      ['这篇文章不仅观点明确，而且论据十分充分。', 'El artículo tiene ideas claras y argumentos suficientes.', 'experto-03.m4a'],
      ['经过反复讨论，委员会最终通过了这项提议。', 'Tras debatirlo repetidamente, el comité aprobó la propuesta.', 'experto-04.m4a'],
      ['如果忽视实际情况，再好的计划也无法实现。', 'Si se ignora la realidad, ni el mejor plan podrá realizarse.', 'experto-05.m4a']
    ]
  }
};

// Selecciona la dificultad solicitada o la guardada en el navegador.
const parameter = new URLSearchParams(location.search).get('dificultad');
const saved = (await obtenerDatosUsuario()).preferencias.dificultad;
const difficulty = Object.hasOwn(content, parameter) ? parameter : Object.hasOwn(content, saved) ? saved : 'easy';
// Normaliza las respuestas e ignora diferencias de espacios y puntuación.
function normalize(value) { return value.normalize('NFKC').toLowerCase().replace(/[\s，。！？、,.!?;；:：'“”‘’"-]/g, ''); }
// Divide el chino en palabras; usa caracteres si no existe el segmentador.
function segmentChinese(text) {
  if (typeof Intl.Segmenter !== 'function') return Array.from(normalize(text));
  return [...new Intl.Segmenter('zh-CN', { granularity: 'word' }).segment(text)]
    .filter((part) => part.isWordLike)
    .map((part) => part.segment);
}
// Prepara las frases del nivel junto con sus casillas de respuesta.
const phrases = content[difficulty].phrases.map(([text, hint, audio]) => ({ text, hint, audio: audioPath(audio), words: segmentChinese(text) }));
// Localiza los controles de reproducción, respuesta y puntuación.
const elements = {
  card: document.querySelector('#question-card'), listen: document.querySelector('#listen-button'), instruction: document.querySelector('#audio-instruction'), plays: document.querySelector('#play-count'),
  slots: document.querySelector('#word-slots'), check: document.querySelector('#check-button'), hint: document.querySelector('#hint-button'), feedback: document.querySelector('#feedback'), next: document.querySelector('#next-button'),
  dots: document.querySelector('#question-dots'), count: document.querySelector('#question-count'), score: document.querySelector('#score'), badge: document.querySelector('#difficulty-badge'),
  completion: document.querySelector('#completion-card'), finalScore: document.querySelector('#final-score'), restart: document.querySelector('#restart-button')
};
// Mantiene la pregunta actual, los intentos y los resultados de la sesión.
const state = { index: 0, score: 0, attempts: 0, playCount: 0, resolved: false, statuses: Array(phrases.length).fill(null) };

const recordedAudio = new Audio();
// Obtiene las casillas actuales de respuesta.
function slotInputs() { return [...elements.slots.querySelectorAll('.word-input')]; }
// Une el contenido de las casillas para comprobar la frase completa.
function answerValue() { return slotInputs().map((input) => input.value).join(''); }
// Habilita comprobar cuando todas las casillas contienen una respuesta.
function updateCheckState() { elements.check.disabled = slotInputs().some((input) => !normalize(input.value)); }
// Dirige el foco a la primera casilla vacía o a la primera disponible.
function focusFirstEmpty() { (slotInputs().find((input) => !normalize(input.value)) || slotInputs()[0])?.focus(); }
// Crea una casilla por palabra con tamaño e información accesible.
function renderWordSlots() {
  elements.slots.innerHTML = phrases[state.index].words.map((word, index) => `<input class="word-input" type="text" lang="zh-Hans" inputmode="text" autocomplete="off" autocapitalize="off" spellcheck="false" data-index="${index}" style="--characters:${Array.from(word).length}" aria-label="Palabra ${index + 1} de ${phrases[state.index].words.length}">`).join('');
}
// Dibuja los indicadores de pregunta activa, aciertos y errores.
function renderDots() { elements.dots.innerHTML = phrases.map((_, index) => `<span class="question-dot${index === state.index && !state.resolved ? ' is-active' : ''}${state.statuses[index] === 'success' ? ' is-success' : ''}${state.statuses[index] === 'error' ? ' is-error' : ''}">${state.statuses[index] === 'success' ? '✓' : index + 1}</span>`).join(''); }
// Actualiza el mensaje de respuesta y su estilo.
function setFeedback(message = '', type = '') { elements.feedback.textContent = message; elements.feedback.className = type ? `is-${type}` : ''; }

function setPlayingState(isPlaying) {
  elements.listen.classList.toggle('is-playing', isPlaying);
  elements.instruction.textContent = isPlaying ? 'Escucha con atención…' : 'Pulsa otra vez para repetir la frase';
  if (!isPlaying) focusFirstEmpty();
}

function stopRecordedPhrase() {
  recordedAudio.pause();
  recordedAudio.currentTime = 0;
  elements.listen.classList.remove('is-playing');
}

// Reproduce el archivo individual asociado a la pregunta actual.
async function playRecordedPhrase() {
  stopRecordedPhrase();
  recordedAudio.src = phrases[state.index].audio;
  recordedAudio.onended = () => setPlayingState(false);
  setPlayingState(true);
  await recordedAudio.play();
}

// Reproduce la grabación real de cualquiera de los cuatro niveles.
async function speak() {
  try { await playRecordedPhrase(); }
  catch { setPlayingState(false); setFeedback('No se pudo reproducir la grabación.', 'error'); return; }
  state.playCount += 1;
  elements.plays.textContent = state.playCount === 1 ? 'Has escuchado la frase una vez.' : `Has escuchado la frase ${state.playCount} veces.`;
}

// Prepara la siguiente pregunta y reinicia sus intentos y reproducciones.
function renderQuestion() {
  stopRecordedPhrase();
  state.attempts = 0; state.playCount = 0; state.resolved = false;
  renderWordSlots();
  elements.check.disabled = true; elements.check.hidden = false; elements.next.hidden = true;
  elements.count.textContent = `Frase ${state.index + 1} de ${phrases.length}`;
  elements.instruction.textContent = 'Pulsa el botón para escuchar la grabación';
  elements.plays.textContent = 'Puedes reproducirla todas las veces que necesites.';
  setFeedback(); renderDots();
}

// Compara la frase y concede diez puntos al primer intento o cinco después.
function checkAnswer() {
  if (state.resolved || elements.check.disabled) return;
  state.attempts += 1;
  if (normalize(answerValue()) === normalize(phrases[state.index].text)) {
    state.resolved = true; state.statuses[state.index] = 'success';
    const points = state.attempts === 1 ? 10 : 5; state.score += points; elements.score.textContent = state.score;
    slotInputs().forEach((input) => { input.className = 'word-input is-correct'; input.disabled = true; }); elements.check.hidden = true; elements.next.hidden = false;
    setFeedback(`¡Correcto! +${points} puntos`, 'success'); renderDots(); return;
  }
  state.statuses[state.index] = 'error'; slotInputs().forEach((input, index) => { input.classList.toggle('is-wrong', normalize(input.value) !== normalize(phrases[state.index].words[index])); });
  setFeedback('Todavía no coincide. Escucha otra vez y revisa los caracteres.', 'error'); renderDots();
}

// Conecta el botón de escucha con la reproducción de la frase.
elements.listen.addEventListener('click', speak);
// Actualiza las casillas y avanza el foco sin interrumpir la composición de texto.
elements.slots.addEventListener('input', (event) => {
  const input = event.target.closest('.word-input'); if (!input) return;
  input.classList.remove('is-wrong'); updateCheckState();
  const expected = phrases[state.index].words[Number(input.dataset.index)];
  if (!event.isComposing && normalize(input.value).length >= normalize(expected).length) slotInputs()[Number(input.dataset.index) + 1]?.focus();
});
// Permite comprobar con Enter o retroceder desde una casilla vacía.
elements.slots.addEventListener('keydown', (event) => {
  const input = event.target.closest('.word-input'); if (!input) return;
  const index = Number(input.dataset.index);
  if (event.key === 'Enter' && !elements.check.disabled) checkAnswer();
  if (event.key === 'Backspace' && !input.value && index > 0) slotInputs()[index - 1].focus();
});
// Distribuye un texto pegado entre las casillas si contiene varias palabras.
elements.slots.addEventListener('paste', (event) => {
  const pasted = event.clipboardData.getData('text'); const words = segmentChinese(pasted);
  if (words.length < 2) return; event.preventDefault();
  slotInputs().forEach((input, index) => { input.value = words[index] || ''; input.classList.remove('is-wrong'); }); updateCheckState(); focusFirstEmpty();
});
// Conecta la comprobación de la respuesta y la pista en español.
elements.check.addEventListener('click', checkAnswer);
elements.hint.addEventListener('click', () => setFeedback(`Pista: ${phrases[state.index].hint}`, ''));
// Avanza de pregunta o muestra el resultado final.
elements.next.addEventListener('click', () => {
  if (state.index === phrases.length - 1) { stopRecordedPhrase(); elements.card.hidden = true; elements.dots.hidden = true; elements.completion.hidden = false; elements.finalScore.textContent = state.score; return; }
  state.index += 1; renderQuestion();
});
// Reinicia la sesión, la puntuación y los indicadores.
elements.restart.addEventListener('click', () => { state.index = 0; state.score = 0; state.statuses.fill(null); elements.score.textContent = '0'; elements.completion.hidden = true; elements.card.hidden = false; elements.dots.hidden = false; renderQuestion(); });
// Detiene la grabación al abandonar la página.
window.addEventListener('beforeunload', stopRecordedPhrase);
// Muestra la dificultad e inicia la primera pregunta.
elements.badge.textContent = content[difficulty].label; elements.badge.dataset.difficulty = difficulty;
renderQuestion();
