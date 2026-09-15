// Define las frases, las pistas y la velocidad de voz por dificultad.
const content = {
  easy: {
    label: 'Fácil', rate: 0.72,
    phrases: [
      ['我喜欢喝茶。', 'Me gusta beber té.'], ['他是老师。', 'Él es profesor.'],
      ['今天天气很好。', 'Hoy hace muy buen tiempo.'], ['妈妈在家做饭。', 'Mamá cocina en casa.'],
      ['我明天去学校。', 'Mañana voy a la escuela.'], ['她有一只小猫。', 'Ella tiene un gato pequeño.'],
      ['你想吃什么？', '¿Qué quieres comer?'], ['我的朋友住在北京。', 'Mi amigo vive en Pekín.'],
      ['我们一起学习中文。', 'Estudiamos chino juntos.'], ['爸爸坐地铁去公司。', 'Papá va a la empresa en metro.']
    ]
  },
  medium: {
    label: 'Intermedio', rate: 0.78,
    phrases: [
      ['姐姐正在看一本书。', 'Mi hermana mayor está leyendo un libro.'], ['他已经吃过午饭了。', 'Él ya ha comido.'],
      ['明天可能会下雨。', 'Puede que mañana llueva.'], ['妹妹比我起得早。', 'Mi hermana menor se levanta antes que yo.'],
      ['请把门关上。', 'Por favor, cierra la puerta.'], ['这本书是朋友送给我的。', 'Este libro me lo regaló un amigo.'],
      ['虽然很累，但是她没有休息。', 'Aunque estaba cansada, no descansó.'], ['我们坐地铁去博物馆。', 'Vamos al museo en metro.'],
      ['他一边听音乐一边写作业。', 'Hace los deberes mientras escucha música.'], ['你去过北京几次？', '¿Cuántas veces has estado en Pekín?']
    ]
  },
  hard: {
    label: 'Difícil', rate: 0.84,
    phrases: [
      ['如果明天不下雨，我们就去爬山。', 'Si mañana no llueve, iremos a la montaña.'], ['我把昨天买的书放在桌子上了。', 'Puse en la mesa el libro que compré ayer.'],
      ['他的手机被弟弟弄坏了。', 'Su hermano menor le rompió el móvil.'], ['除了中文以外，她还会说法语。', 'Además de chino, también habla francés.'],
      ['吃完晚饭以后，我们出去散步了。', 'Después de cenar salimos a pasear.'], ['因为路上堵车，所以他迟到了。', 'Llegó tarde porque había atasco.'],
      ['这件事情没有你想象得那么简单。', 'Este asunto no es tan sencillo como imaginas.'], ['无论遇到什么困难，都不要放弃。', 'No abandones sin importar qué dificultad encuentres.'],
      ['老师让我们下课以前交作业。', 'El profesor pidió entregar la tarea antes de acabar la clase.'], ['只有认真练习，才能提高口语水平。', 'Solo practicando seriamente mejora la expresión oral.']
    ]
  },
  expert: {
    label: 'Experto', rate: 0.9,
    phrases: [
      ['随着科技的发展，人们的生活发生了巨大变化。', 'Con el desarrollo tecnológico, la vida ha cambiado enormemente.'], ['尽管这个方案存在问题，我们仍然决定继续实施。', 'Aunque el plan tiene problemas, decidimos seguir aplicándolo.'],
      ['与其浪费时间抱怨，不如想办法解决问题。', 'En vez de perder tiempo quejándose, es mejor buscar una solución.'], ['他之所以取得成功，是因为从未放弃努力。', 'Tuvo éxito porque nunca dejó de esforzarse.'],
      ['这篇文章不仅观点明确，而且论据十分充分。', 'El artículo tiene ideas claras y argumentos suficientes.'], ['无论结果如何，我们都应该承担自己的责任。', 'Sea cual sea el resultado, debemos asumir nuestra responsabilidad.'],
      ['经过反复讨论，委员会最终通过了这项提议。', 'Tras debatirlo repetidamente, el comité aprobó la propuesta.'], ['这种现象在一定程度上反映了社会的变化。', 'Este fenómeno refleja en cierta medida los cambios sociales.'],
      ['如果忽视实际情况，再好的计划也无法实现。', 'Si se ignora la realidad, ni el mejor plan podrá realizarse.'], ['只有充分了解问题以后，才能作出合理判断。', 'Solo después de comprender el problema se puede juzgar razonablemente.']
    ]
  }
};

// Selecciona la dificultad solicitada o la guardada en el navegador.
const parameter = new URLSearchParams(location.search).get('dificultad');
const saved = localStorage.getItem('exercise-difficulty');
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
const phrases = content[difficulty].phrases.map(([text, hint]) => ({ text, hint, words: segmentChinese(text) }));
// Localiza los controles de reproducción, respuesta y puntuación.
const elements = {
  card: document.querySelector('#question-card'), listen: document.querySelector('#listen-button'), instruction: document.querySelector('#audio-instruction'), plays: document.querySelector('#play-count'),
  slots: document.querySelector('#word-slots'), check: document.querySelector('#check-button'), hint: document.querySelector('#hint-button'), feedback: document.querySelector('#feedback'), next: document.querySelector('#next-button'),
  dots: document.querySelector('#question-dots'), count: document.querySelector('#question-count'), score: document.querySelector('#score'), badge: document.querySelector('#difficulty-badge'),
  completion: document.querySelector('#completion-card'), finalScore: document.querySelector('#final-score'), restart: document.querySelector('#restart-button')
};
// Mantiene la pregunta actual, los intentos y los resultados de la sesión.
const state = { index: 0, score: 0, attempts: 0, playCount: 0, resolved: false, statuses: Array(phrases.length).fill(null) };


//MODIFICAR POR GRABACIONES MP3 NO POR LA DEL NAVEGADOR 

// Busca una voz china instalada en el navegador.
function chineseVoice() { return speechSynthesis.getVoices().find((voice) => /^zh(-|_)/i.test(voice.lang)) || null; }
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

// Reproduce la frase con voz sintetizada y actualiza el contador de escuchas.
function speak() {
  if (!('speechSynthesis' in window)) { setFeedback('Tu navegador no permite reproducir voz. Prueba con Safari, Chrome o Edge.', 'error'); return; }
  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(phrases[state.index].text);
  utterance.lang = 'zh-CN'; utterance.rate = content[difficulty].rate; utterance.pitch = 1;
  const voice = chineseVoice(); if (voice) utterance.voice = voice;
  utterance.onstart = () => { elements.listen.classList.add('is-playing'); elements.instruction.textContent = 'Escucha con atención…'; };
  utterance.onend = () => { elements.listen.classList.remove('is-playing'); elements.instruction.textContent = 'Pulsa otra vez para repetir la frase'; focusFirstEmpty(); };
  utterance.onerror = () => { elements.listen.classList.remove('is-playing'); setFeedback('No se pudo reproducir la voz china en este navegador.', 'error'); };
  speechSynthesis.speak(utterance); state.playCount += 1;
  elements.plays.textContent = state.playCount === 1 ? 'Has escuchado la frase una vez.' : `Has escuchado la frase ${state.playCount} veces.`;
}

// Prepara la siguiente pregunta y reinicia sus intentos y reproducciones.
function renderQuestion() {
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
  if (state.index === phrases.length - 1) { if ('speechSynthesis' in window) speechSynthesis.cancel(); elements.card.hidden = true; elements.dots.hidden = true; elements.completion.hidden = false; elements.finalScore.textContent = state.score; return; }
  state.index += 1; renderQuestion();
});
// Reinicia la sesión, la puntuación y los indicadores.
elements.restart.addEventListener('click', () => { state.index = 0; state.score = 0; state.statuses.fill(null); elements.score.textContent = '0'; elements.completion.hidden = true; elements.card.hidden = false; elements.dots.hidden = false; renderQuestion(); });
// Cancela la voz al abandonar la página.
window.addEventListener('beforeunload', () => { if ('speechSynthesis' in window) speechSynthesis.cancel(); });
// Muestra y guarda la dificultad e inicia la primera pregunta.
elements.badge.textContent = content[difficulty].label; elements.badge.dataset.difficulty = difficulty;
localStorage.setItem('exercise-difficulty', difficulty); renderQuestion();
