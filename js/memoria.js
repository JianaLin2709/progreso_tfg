// Importa el vocabulario que se utilizará para formar las parejas.
import { catalogoHSK } from './datos/catalogo-hsk.js?v=2';
import { obtenerDatosUsuario } from './user-data.js?v=1';

// Relaciona las dificultades con niveles HSK y fija ocho parejas por partida.
const ranges = {
  easy: [1],
  medium: [2, 3],
  hard: [4, 5],
  expert: [6, 7]
};
const pairAmount = 8;
// Elige la dificultad de la URL o de las preferencias de la cuenta.
const params = new URLSearchParams(location.search);
const requested = params.get('dificultad');
const saved = (await obtenerDatosUsuario()).preferencias.dificultad;
const difficulty = Object.hasOwn(ranges, requested) ? requested : Object.hasOwn(ranges, saved) ? saved : 'easy';
const difficultyNames = { easy: 'Fácil', medium: 'Medio', hard: 'Difícil', expert: 'Experto' };
const difficultyBadge = document.querySelector('#difficulty-badge');
difficultyBadge.textContent = difficultyNames[difficulty];
difficultyBadge.dataset.difficulty = difficulty;
const levels = ranges[difficulty].map((id) => catalogoHSK.find((level) => level.id === id)).filter(Boolean);
const board = document.querySelector('#memory-board');
const attempts = document.querySelector('#attempts');
const matched = document.querySelector('#matched-pairs');
const total = document.querySelector('#total-pairs');
const timer = document.querySelector('#timer');
const message = document.querySelector('#game-message');
const hint = document.querySelector('#hint-button');
const hintsLeft = document.querySelector('#hints-left');
const restart = document.querySelector('#restart-button');
const panelToggle = document.querySelector('#game-panel-toggle');
const panelContent = document.querySelector('#game-panel-content');
const compactPanelQuery = window.matchMedia('(max-width: 1280px)');

// Conserva el estado de la partida y las referencias a sus cartas.
let state;
let gameCounter = 0;
let cardElements = new Map();

// Mezcla una copia de la lista mediante intercambios aleatorios.
function shuffle(items) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[randomIndex]] = [result[randomIndex], result[index]];
  }
  return result;
}

// Reúne palabras válidas de un nivel y elimina parejas de textos repetidas.
function vocabularyFor(level) {
  const seen = new Set();
  return level.unidades
    .flatMap((unit) => unit.vocabulario || [])
    .filter((word) => {
      if (!word?.hanzi?.trim() || !word?.spanish?.trim()) return false;
      const key = `${word.hanzi}|${word.spanish}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

// Reparte la selección de palabras entre los niveles de la dificultad.
function chooseWords() {
  const baseAmount = Math.floor(pairAmount / levels.length);
  const remaining = pairAmount % levels.length;
  return shuffle(levels.flatMap((level, index) => (
    shuffle(vocabularyFor(level)).slice(0, baseAmount + (index < remaining ? 1 : 0))
  )));
}

// Crea una carta china y otra española por pareja y las mezcla.
function buildCards() {
  return shuffle(chooseWords().flatMap((word, pair) => [
    { id: `${pair}-hanzi`, pair, type: 'hanzi', text: word.hanzi },
    { id: `${pair}-spanish`, pair, type: 'spanish', text: word.spanish }
  ]));
}

// Convierte los segundos transcurridos al formato minutos:segundos.
function formatTime(seconds) {
  return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
}

// Inicia el cronómetro solo una vez por partida.
function startTimer() {
  if (state.started) return;
  state.started = true;
  state.timerId = setInterval(() => {
    state.seconds += 1;
    timer.textContent = formatTime(state.seconds);
  }, 1000);
}

// Construye el botón de una carta con su reverso y su texto oculto.
function createCardElement(card) {
  const button = document.createElement('button');
  button.className = 'memory-card';
  button.type = 'button';
  button.dataset.id = card.id;
  button.setAttribute('aria-label', 'Carta oculta');

  const inner = document.createElement('span');
  inner.className = 'card-inner';

  const back = document.createElement('span');
  back.className = 'card-face card-back';
  const paw = document.createElement('img');
  paw.className = 'paw-image';
  paw.src = '../img/huella-carta.png';
  paw.alt = '';
  back.append(paw);

  const front = document.createElement('span');
  front.className = 'card-face card-front';
  const text = document.createElement('strong');
  text.textContent = card.text;
  if (card.type === 'hanzi') text.lang = 'zh-Hans';
  front.append(text);

  inner.append(back, front);
  button.append(inner);
  return button;
}

// Inserta las cartas nuevas y guarda sus elementos para actualizarlos.
function renderBoard() {
  cardElements = new Map();
  const elements = state.cards.map((card) => {
    const element = createCardElement(card);
    cardElements.set(card.id, element);
    return element;
  });
  board.dataset.pairs = pairAmount;
  board.replaceChildren(...elements);
}

// Refleja las cartas giradas, los aciertos y los contadores en la pantalla.
function updateInterface() {
  state.cards.forEach((card) => {
    const element = cardElements.get(card.id);
    element.classList.toggle('is-flipped', card.flipped);
    element.classList.toggle('is-matched', card.matched);
    element.classList.toggle('is-selected', card.selected);
    element.disabled = card.matched || state.busy;
    element.setAttribute('aria-label', card.flipped || card.matched ? card.text : 'Carta oculta');
  });
  attempts.textContent = state.attempts;
  matched.textContent = state.matches;
  total.textContent = pairAmount;
  hintsLeft.textContent = state.hints;
  hint.disabled = state.hints === 0 || state.busy || state.selected.length > 0;
}

// Selecciona una carta válida y programa la comprobación al tener dos.
function selectCard(id) {
  if (state.busy) return;
  const card = state.cards.find((item) => item.id === id);
  if (!card || card.matched || card.selected || state.selected.length === 2) return;
  startTimer();
  card.flipped = true;
  card.selected = true;
  state.selected.push(card);
  message.textContent = state.selected.length === 1 ? 'Selecciona ahora su pareja.' : 'Comprobando la pareja…';
  updateInterface();
  if (state.selected.length === 2) setTimeout(verifyPair, 420);
}

// Comprueba si las dos cartas pertenecen a la misma pareja.
function verifyPair() {
  if (state.selected.length !== 2 || state.busy) return;
  state.busy = true;
  state.attempts += 1;
  const currentGame = state.gameId;
  const [first, second] = state.selected;
  const success = first.pair === second.pair && first.type !== second.type;

  // Conserva las parejas acertadas y detiene el reloj al completar el tablero.
  if (success) {
    first.matched = true;
    second.matched = true;
    first.selected = false;
    second.selected = false;
    state.matches += 1;
    state.selected = [];
    state.busy = false;
    message.textContent = '¡Pareja correcta!';
    updateInterface();
    if (state.matches === pairAmount) {
      clearInterval(state.timerId);
      message.textContent = `¡Has encontrado todas las parejas en ${state.attempts} intentos!`;
    }
    return;
  }

  // Deja ver brevemente el fallo antes de volver a ocultar las cartas.
  message.textContent = 'No forman una pareja. Memoriza sus posiciones.';
  updateInterface();
  setTimeout(() => {
    // Evita que una espera de una partida anterior modifique la nueva.
    if (state.gameId !== currentGame) return;
    first.flipped = false;
    second.flipped = false;
    first.selected = false;
    second.selected = false;
    state.selected = [];
    state.busy = false;
    updateInterface();
  }, 850);
}

// Consume una pista y descubre temporalmente las cartas pendientes.
function showHint() {
  if (state.hints === 0 || state.busy || state.selected.length) return;
  startTimer();
  const currentGame = state.gameId;
  state.hints -= 1;
  state.busy = true;
  state.cards.forEach((card) => { if (!card.matched) card.flipped = true; });
  message.textContent = 'Memoriza rápidamente las cartas.';
  updateInterface();
  setTimeout(() => {
    if (state.gameId !== currentGame) return;
    state.cards.forEach((card) => { if (!card.matched) card.flipped = false; });
    state.busy = false;
    message.textContent = '';
    updateInterface();
  }, 1400);
}

// Reinicia el reloj, las cartas, los intentos y las tres pistas.
function resetGame() {
  if (state?.timerId) clearInterval(state.timerId);
  gameCounter += 1;
  state = {
    gameId: gameCounter,
    cards: buildCards().map((card) => ({ ...card, flipped: false, matched: false, selected: false })),
    selected: [], attempts: 0, matches: 0, hints: 3, seconds: 0, started: false, timerId: null, busy: false
  };
  timer.textContent = '00:00';
  message.textContent = '';
  renderBoard();
  updateInterface();
}

// Expande o contrae el panel y actualiza su estado accesible.
function setPanelExpanded(expanded) {
  panelToggle.setAttribute('aria-expanded', String(expanded));
  panelContent.hidden = !expanded;
}

// Adapta el panel de controles al ancho de la ventana.
function adaptPanelToViewport(event) {
  const compact = event.matches;
  panelToggle.disabled = !compact;
  setPanelExpanded(!compact);
}

// Conecta la selección de cartas, las pistas y el reinicio.
board.addEventListener('click', (event) => {
  const card = event.target.closest('.memory-card');
  if (card) selectCard(card.dataset.id);
});
hint.addEventListener('click', showHint);
restart.addEventListener('click', resetGame);
// Permite plegar el panel en pantallas compactas y escucha cambios de tamaño.
panelToggle.addEventListener('click', () => {
  if (!compactPanelQuery.matches) return;
  setPanelExpanded(panelToggle.getAttribute('aria-expanded') !== 'true');
});
compactPanelQuery.addEventListener('change', adaptPanelToViewport);
// Ajusta el panel e inicia la primera partida.
adaptPanelToViewport(compactPanelQuery);
resetGame();
