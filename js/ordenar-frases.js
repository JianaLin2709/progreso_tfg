// Define las frases ordenadas y sus pistas para cada dificultad.
const content = {
  easy: {
    label: 'Fácil',
    phrases: [
      { words: ['我', '学习', '中文', '。'], hint: 'Yo estudio chino.' },
      { words: ['他', '是', '老师', '。'], hint: 'Él es profesor.' },
      { words: ['妈妈', '在', '厨房', '做饭', '。'], hint: 'Mamá cocina en la cocina.' },
      { words: ['我们', '明天', '去', '学校', '。'], hint: 'Mañana vamos a la escuela.' },
      { words: ['我', '喜欢', '喝', '茶', '。'], hint: 'Me gusta beber té.' },
      { words: ['小猫', '在', '桌子', '下面', '。'], hint: 'El gato está debajo de la mesa.' },
      { words: ['你', '想', '吃', '什么', '？'], hint: '¿Qué quieres comer?' },
      { words: ['今天', '的', '天气', '很', '好', '。'], hint: 'Hoy hace buen tiempo.' },
      { words: ['我', '坐', '地铁', '去', '公司', '。'], hint: 'Voy a la empresa en metro.' },
      { words: ['他们', '周末', '一起', '打', '篮球', '。'], hint: 'Ellos juegan juntos al baloncesto el fin de semana.' }
    ]
  },
  medium: {
    label: 'Medio',
    phrases: [
      { words: ['姐姐', '正在', '看', '一本书', '。'], hint: 'La hermana mayor está leyendo un libro.' },
      { words: ['他', '已经', '吃过', '午饭', '了', '。'], hint: 'Él ya ha comido.' },
      { words: ['明天', '可能', '会', '下雨', '。'], hint: 'Puede que mañana llueva.' },
      { words: ['妹妹', '比', '我', '起得', '早', '。'], hint: 'Mi hermana menor se levanta antes que yo.' },
      { words: ['请', '把', '门', '关上', '。'], hint: 'Por favor, cierra la puerta.' },
      { words: ['这本书', '是', '朋友', '送给', '我的', '。'], hint: 'Este libro me lo regaló un amigo.' },
      { words: ['虽然', '很累', '但是', '她', '没有', '休息', '。'], hint: 'Aunque estaba cansada, no descansó.' },
      { words: ['我们', '坐地铁', '去', '博物馆', '。'], hint: 'Vamos al museo en metro.' },
      { words: ['他', '一边', '听音乐', '一边', '写作业', '。'], hint: 'Él hace los deberes mientras escucha música.' },
      { words: ['你', '去过', '北京', '几次', '？'], hint: '¿Cuántas veces has estado en Pekín?' }
    ]
  },
  hard: {
    label: 'Difícil',
    phrases: [
      { words: ['如果', '明天', '不下雨', '我们', '就', '去爬山', '。'], hint: 'Si mañana no llueve, iremos a la montaña.' },
      { words: ['我', '把', '昨天买的书', '放在', '桌子上', '了', '。'], hint: 'Puse sobre la mesa el libro que compré ayer.' },
      { words: ['他的手机', '被', '弟弟', '弄坏', '了', '。'], hint: 'Su hermano menor le rompió el móvil.' },
      { words: ['除了', '中文以外', '她', '还会说', '法语', '。'], hint: 'Además de chino, ella también habla francés.' },
      { words: ['吃完晚饭以后', '我们', '出去', '散步', '了', '。'], hint: 'Después de cenar salimos a pasear.' },
      { words: ['因为', '路上堵车', '所以', '他', '迟到', '了', '。'], hint: 'Llegó tarde porque había atasco.' },
      { words: ['这件事情', '没有', '你想象得', '那么', '简单', '。'], hint: 'Este asunto no es tan sencillo como imaginas.' },
      { words: ['无论', '遇到', '什么困难', '都', '不要', '放弃', '。'], hint: 'No abandones sin importar qué dificultad encuentres.' },
      { words: ['老师', '让我们', '下课以前', '交', '作业', '。'], hint: 'El profesor nos pidió entregar la tarea antes de acabar la clase.' },
      { words: ['只有', '认真练习', '才能', '提高', '口语水平', '。'], hint: 'Solo practicando seriamente se mejora la expresión oral.' }
    ]
  },
  expert: {
    label: 'Experto',
    phrases: [
      { words: ['随着', '科技的发展', '人们的生活', '发生了', '巨大变化', '。'], hint: 'Con el desarrollo tecnológico, la vida ha cambiado enormemente.' },
      { words: ['尽管', '这个方案', '存在问题', '我们', '仍然决定', '继续实施', '。'], hint: 'Aunque el plan tiene problemas, decidimos seguir aplicándolo.' },
      { words: ['与其', '浪费时间抱怨', '不如', '想办法', '解决问题', '。'], hint: 'En vez de perder tiempo quejándose, es mejor buscar una solución.' },
      { words: ['他', '之所以', '取得成功', '是因为', '从未放弃努力', '。'], hint: 'Tuvo éxito porque nunca dejó de esforzarse.' },
      { words: ['这篇文章', '不仅', '观点明确', '而且', '论据', '十分充分', '。'], hint: 'El artículo tiene ideas claras y argumentos suficientes.' },
      { words: ['无论', '结果如何', '我们', '都应该', '承担', '自己的责任', '。'], hint: 'Sea cual sea el resultado, debemos asumir nuestra responsabilidad.' },
      { words: ['经过', '反复讨论', '委员会', '最终通过了', '这项提议', '。'], hint: 'Tras debatirlo repetidamente, el comité aprobó la propuesta.' },
      { words: ['这种现象', '在一定程度上', '反映了', '社会的变化', '。'], hint: 'Este fenómeno refleja en cierta medida los cambios sociales.' },
      { words: ['如果', '忽视实际情况', '再好的计划', '也', '无法实现', '。'], hint: 'Si se ignora la realidad, ni el mejor plan podrá realizarse.' },
      { words: ['只有', '充分了解问题以后', '才能', '作出', '合理判断', '。'], hint: 'Solo después de comprender el problema se puede juzgar razonablemente.' }
    ]
  }
};

// Elige la dificultad de la URL o de la preferencia guardada.
const difficultyParam = new URLSearchParams(window.location.search).get('dificultad');
const savedDifficulty = localStorage.getItem('exercise-difficulty');
const difficulty = Object.hasOwn(content, difficultyParam)
  ? difficultyParam
  : Object.hasOwn(content, savedDifficulty) ? savedDifficulty : 'easy';
// Utiliza todas las frases de la dificultad en una sola sesión.
const phrases = content[difficulty].phrases;

// Localiza las zonas de palabras, los indicadores y los botones.
const elements = {
  gameCard: document.querySelector('#game-card'), actions: document.querySelector('#game-actions'),
  bank: document.querySelector('#word-bank'), answer: document.querySelector('#answer-zone'),
  progressText: document.querySelector('#phrase-progress'), progressFill: document.querySelector('#progress-fill'),
  score: document.querySelector('#score'), feedback: document.querySelector('#game-feedback'),
  hint: document.querySelector('#hint-button'), reset: document.querySelector('#reset-button'),
  check: document.querySelector('#check-button'), checkLabel: document.querySelector('#check-label'),
  completion: document.querySelector('#completion-card'), finalScore: document.querySelector('#final-score'),
  playAgain: document.querySelector('#play-again'),
  completionTitle: document.querySelector('#completion-title'), completionMessage: document.querySelector('#completion-message'),
  difficultyBadge: document.querySelector('#difficulty-badge')
};

// Guarda la frase actual, la respuesta formada y la puntuación.
const state = { current: 0, score: 0, tokens: [], shuffledIds: [], answerIds: [], correct: false, draggedId: null };

// Mezcla las fichas y evita conservar exactamente su orden inicial.
function shuffle(values) {
  const result = [...values];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const random = Math.floor(Math.random() * (index + 1));
    [result[index], result[random]] = [result[random], result[index]];
  }
  if (result.every((value, index) => value === values[index])) result.reverse();
  return result;
}

// Busca una ficha por su identificador, aunque haya palabras repetidas.
function tokenById(id) { return state.tokens.find((token) => token.id === id); }
// Genera el botón arrastrable de una ficha y señala su zona actual.
function tokenMarkup(token, location) { return `<button class="sentence-token" type="button" draggable="true" data-token-id="${token.id}" data-location="${location}">${token.text}</button>`; }

// Dibuja las fichas disponibles y la respuesta; habilita comprobar al completarla.
function render() {
  const available = state.shuffledIds.filter((id) => !state.answerIds.includes(id));
  elements.bank.innerHTML = available.map((id) => tokenMarkup(tokenById(id), 'bank')).join('');
  elements.answer.innerHTML = state.tokens.map((_, index) => {
    const id = state.answerIds[index];
    return `<div class="answer-slot${id ? ' has-token' : ''}" data-slot-index="${index}">${id ? tokenMarkup(tokenById(id), 'answer') : ''}</div>`;
  }).join('');
  elements.check.disabled = state.answerIds.length !== state.tokens.length;
}

// Prepara una frase nueva, mezcla sus fichas y limpia la respuesta anterior.
function startPhrase() {
  const phrase = phrases[state.current];
  state.tokens = phrase.words.map((text, index) => ({ id: `${state.current}-${index}`, text }));
  state.shuffledIds = shuffle(state.tokens.map((token) => token.id));
  state.answerIds = [];
  state.correct = false;
  elements.gameCard.classList.remove('is-correct', 'is-wrong');
  elements.feedback.textContent = '';
  elements.checkLabel.textContent = 'Comprobar';
  elements.progressText.textContent = `Frase ${state.current + 1} de ${phrases.length}`;
  elements.progressFill.style.width = `${(state.current + 1) / phrases.length * 100}%`;
  render();
}

// Inicia una sesión de todas las frases con la puntuación a cero.
function restartGame() {
  state.current = 0;
  state.score = 0;
  state.draggedId = null;
  elements.score.textContent = '0';
  elements.completion.hidden = true;
  elements.gameCard.hidden = false;
  elements.actions.hidden = false;
  startPhrase();
}

// Inserta o recoloca una ficha dentro de la respuesta sin duplicarla.
function moveToAnswer(id, targetIndex = state.answerIds.length) {
  if (state.correct || !tokenById(id)) return;
  const next = state.answerIds.filter((tokenId) => tokenId !== id);
  next.splice(Math.min(targetIndex, next.length), 0, id);
  state.answerIds = next; elements.feedback.textContent = ''; render();
}
// Devuelve una ficha al banco mientras la frase no esté resuelta.
function moveToBank(id) { if (!state.correct) { state.answerIds = state.answerIds.filter((tokenId) => tokenId !== id); elements.feedback.textContent = ''; render(); } }

// Conecta los clics para mover fichas entre las dos zonas.
elements.bank.addEventListener('click', (event) => { const token = event.target.closest('.sentence-token'); if (token) moveToAnswer(token.dataset.tokenId); });
elements.answer.addEventListener('click', (event) => { const token = event.target.closest('.sentence-token'); if (token) moveToBank(token.dataset.tokenId); });
// Registra la ficha arrastrada y prepara su transferencia.
document.addEventListener('dragstart', (event) => {
  const token = event.target.closest('.sentence-token'); if (!token || state.correct) return;
  state.draggedId = token.dataset.tokenId; token.classList.add('dragging');
  event.dataTransfer.effectAllowed = 'move'; event.dataTransfer.setData('text/plain', state.draggedId);
});
// Limpia el estado de arrastre al soltar la ficha.
document.addEventListener('dragend', (event) => { event.target.closest('.sentence-token')?.classList.remove('dragging'); state.draggedId = null; });
// Permite soltar fichas en una posición de la respuesta.
elements.answer.addEventListener('dragover', (event) => event.preventDefault());
elements.answer.addEventListener('drop', (event) => {
  event.preventDefault(); const slot = event.target.closest('.answer-slot');
  moveToAnswer(state.draggedId || event.dataTransfer.getData('text/plain'), slot ? Number(slot.dataset.slotIndex) : state.answerIds.length);
});
// Permite devolver fichas al banco mediante arrastre.
elements.bank.addEventListener('dragover', (event) => event.preventDefault());
elements.bank.addEventListener('drop', (event) => { event.preventDefault(); moveToBank(state.draggedId || event.dataTransfer.getData('text/plain')); });

// Muestra la puntuación final después de completar todas las frases.
function finishGame() {
  elements.gameCard.hidden = true;
  elements.actions.hidden = true;
  elements.completion.hidden = false;
  elements.finalScore.textContent = state.score;
  elements.completionTitle.textContent = '¡Muy buen trabajo!';
  elements.completionMessage.textContent = `Has completado las ${phrases.length} frases de dificultad ${content[difficulty].label}.`;
}

// Comprueba el orden de la respuesta o avanza si ya era correcta.
elements.check.addEventListener('click', () => {
  if (state.correct) {
    if (state.current === phrases.length - 1) finishGame();
    else { state.current += 1; startPhrase(); }
    return;
  }
  const answer = state.answerIds.map((id) => tokenById(id).text);
  const expected = phrases[state.current].words;
  if (answer.length === expected.length && answer.every((word, index) => word === expected[index])) {
    state.correct = true; state.score += 10; elements.score.textContent = state.score;
    elements.feedback.textContent = '¡Correcto! La frase está perfectamente ordenada.';
    elements.gameCard.classList.add('is-correct');
    elements.checkLabel.textContent = state.current === phrases.length - 1 ? 'Finalizar' : 'Siguiente';
    elements.check.disabled = false;
  } else {
    elements.feedback.textContent = 'Todavía no está en el orden correcto. Inténtalo de nuevo.';
    elements.gameCard.classList.remove('is-wrong'); void elements.gameCard.offsetWidth; elements.gameCard.classList.add('is-wrong');
  }
});

// Muestra la traducción y la primera ficha como pista.
elements.hint.addEventListener('click', () => { const p = phrases[state.current]; elements.feedback.textContent = `Pista: ${p.hint} Empieza por “${p.words[0]}”.`; });
// Vacía y mezcla de nuevo una frase que todavía no esté resuelta.
elements.reset.addEventListener('click', () => { if (!state.correct) { state.answerIds = []; state.shuffledIds = shuffle(state.tokens.map((token) => token.id)); elements.feedback.textContent = ''; render(); } });
// Permite repetir el ejercicio desde la primera frase.
elements.playAgain.addEventListener('click', restartGame);

// Muestra y guarda la dificultad e inicia el ejercicio.
elements.difficultyBadge.textContent = content[difficulty].label;
elements.difficultyBadge.dataset.difficulty = difficulty;
localStorage.setItem('exercise-difficulty', difficulty);
restartGame();
