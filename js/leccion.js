// Importa el catálogo de unidades y el reproductor de audio.
import { catalogoHSK, obtenerUnidad } from './datos/catalogo-hsk.js?v=24';
import { prepararAudioUnidad } from './audio-unidad.js?v=3';

// Lee la unidad solicitada y activa el modo integrado cuando corresponde.
const parametros = new URLSearchParams(window.location.search);
const embedded = parametros.get('embed') === '1';
document.body.classList.toggle('is-embedded', embedded);
const numeroHSK = Number(parametros.get('hsk')) || 1;
const numeroUnidad = Number(parametros.get('unidad')) || 1;
const unidadActual = obtenerUnidad(numeroHSK, numeroUnidad);

// Detiene la carga si la unidad solicitada no existe.
if (!unidadActual) {
  throw new Error(`No existe la unidad ${numeroUnidad} de HSK ${numeroHSK}.`);
}
// Prepara el vocabulario, la clave de guardado y la posición en el catálogo.
const vocabulary = unidadActual.vocabulario;
const storageKey = `hsk${unidadActual.hsk}-unit${unidadActual.id}`;
const currentLevelIndex = catalogoHSK.findIndex((hsk) => hsk.id === unidadActual.hsk);
const currentLevel = catalogoHSK[currentLevelIndex];
const previousLevel = catalogoHSK[currentLevelIndex - 1];
const currentUnitIndex = currentLevel.unidades.findIndex((unit) => unit.id === unidadActual.id);
// Comprueba que el nivel anterior y la unidad anterior estén completados.
const levelUnlocked = !previousLevel || previousLevel.unidades.every(
  (unit) => localStorage.getItem(`hsk${previousLevel.id}-unit${unit.id}-completed`) === 'true'
);
const unitUnlocked = currentUnitIndex === 0 || localStorage.getItem(
  `hsk${currentLevel.id}-unit${currentLevel.unidades[currentUnitIndex - 1].id}-completed`
) === 'true';

// Devuelve a vocabulario si se intenta acceder a una unidad bloqueada.
if (!levelUnlocked || !unitUnlocked) {
  localStorage.setItem('current-hsk', String(previousLevel?.id || currentLevel.id));
  window.location.replace('./vocabulario.html');
  throw new Error('Esta unidad todavía está bloqueada.');
}

// Recuerda el nivel actual y comprueba si hay otro nivel al que avanzar.
localStorage.setItem('current-hsk', String(unidadActual.hsk));
const lastUnit = currentLevel.unidades[currentLevel.unidades.length - 1];
const nextLevel = catalogoHSK[currentLevelIndex + 1];
const isLastUnitOfLevel = unidadActual.id === lastUnit.id;

// Impide mostrar una lección que no contenga palabras.
if (!vocabulary.length) {
  throw new Error(`La unidad ${unidadActual.id} de HSK ${unidadActual.hsk} todavía no tiene vocabulario.`);
}

// Localiza las tarjetas, los textos y los botones de la lección.
const elements = {
  wordCard: document.querySelector('.word-card'),
  exampleCard: document.querySelector('.example-card'),
  lessonNav: document.querySelector('.lesson-nav'),
  completion: document.querySelector('#completion-card'),
  position: document.querySelector('#word-position'),
  word: document.querySelector('#word'),
  pinyin: document.querySelector('#pinyin'),
  translation: document.querySelector('#translation'),
  exampleChinese: document.querySelector('#example-chinese'),
  examplePinyin: document.querySelector('#example-pinyin'),
  exampleSpanish: document.querySelector('#example-spanish'),
  progressFill: document.querySelector('#progress-fill'),
  progressRow: document.querySelector('.progress-row'),
  progressText: document.querySelector('#progress-text'),
  counter: document.querySelector('#lesson-counter'),
  previous: document.querySelector('#previous-button'),
  next: document.querySelector('#next-button'),
  nextLabel: document.querySelector('#next-button .button-label'),
  favorite: document.querySelector('.favorite'),
  courseHsk: document.querySelector('#course-hsk'),
  courseUnit: document.querySelector('#course-unit'),
  completionTitle: document.querySelector('#completion-title'),
  completionMessage: document.querySelector('#completion-message'),
  restart: document.querySelector('#restart-button'),
  levelActions: document.querySelector('#level-completion-actions'),
  reviewHsk: document.querySelector('#review-hsk-button'),
  nextHsk: document.querySelector('#next-hsk-button')
};

// Muestra los títulos de la unidad y su mensaje de finalización.
elements.courseHsk.textContent = currentLevel.nombre;
elements.courseUnit.textContent = `Unidad ${unidadActual.id}: ${unidadActual.titulo}`;
elements.completionMessage.textContent = `Has completado ${unidadActual.titulo} de HSK ${unidadActual.hsk}.`;

// Recupera la posición y los favoritos, y prepara el audio de la palabra actual.
let currentIndex = Number(localStorage.getItem(`${storageKey}-position`)) || 0;
currentIndex = Math.min(Math.max(currentIndex, 0), vocabulary.length - 1);
const favorites = new Set(JSON.parse(localStorage.getItem(`${storageKey}-favorites`) || '[]'));
const audioUnidad = prepararAudioUnidad(unidadActual, () => currentIndex);

// Dibuja la palabra actual y su ejemplo, con animación opcional.
function renderLesson(animate = false) {
  const entry = vocabulary[currentIndex];
  const number = currentIndex + 1;

  if (animate) {
    elements.wordCard.classList.add('is-changing');
    elements.exampleCard.classList.add('is-changing');
  }

  // Actualiza los textos y el progreso tras la espera de la animación.
  window.setTimeout(() => {
    elements.position.textContent = `PALABRA ${number} DE ${vocabulary.length}`;
    elements.word.textContent = entry.hanzi;
    elements.pinyin.textContent = entry.pinyin;
    elements.translation.textContent = entry.spanish;
    elements.exampleChinese.textContent = entry.example;
    elements.examplePinyin.textContent = entry.examplePinyin;
    elements.exampleSpanish.textContent = entry.exampleSpanish;
    elements.progressText.textContent = `${number} / ${vocabulary.length}`;
    elements.counter.textContent = `${number} / ${vocabulary.length}`;
    const progressPercent = number / vocabulary.length * 100;
    elements.progressFill.style.width = `${progressPercent}%`;
    elements.progressRow.style.setProperty('--lesson-progress', `${progressPercent}%`);
    elements.previous.disabled = currentIndex === 0;
    elements.nextLabel.textContent = currentIndex === vocabulary.length - 1 ? 'Finalizar' : 'Siguiente';

    // Actualiza el botón de favoritos y guarda la posición de estudio.
    const isFavorite = favorites.has(entry.hanzi);
    elements.favorite.classList.toggle('active', isFavorite);
    elements.favorite.setAttribute('aria-pressed', String(isFavorite));
    elements.favorite.setAttribute('aria-label', isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos');
    localStorage.setItem(`${storageKey}-position`, String(currentIndex));

    elements.wordCard.classList.remove('is-changing');
    elements.exampleCard.classList.remove('is-changing');
  }, animate ? 160 : 0);
}

// Detiene el audio y retrocede una palabra cuando es posible.
elements.previous.addEventListener('click', () => {
  audioUnidad.detener();
  if (currentIndex > 0) {
    currentIndex -= 1;
    renderLesson(true);
  }
});

// Avanza una palabra o completa la unidad al llegar al final.
elements.next.addEventListener('click', () => {
  audioUnidad.detener();
  if (currentIndex < vocabulary.length - 1) {
    currentIndex += 1;
    renderLesson(true);
    return;
  }

  // Guarda la finalización y prepara las opciones para pasar de nivel.
  localStorage.setItem(`${storageKey}-completed`, 'true');
  const canAdvanceToNextLevel = isLastUnitOfLevel && nextLevel;

  if (canAdvanceToNextLevel) {
    localStorage.setItem(`hsk${unidadActual.hsk}-completed`, 'true');
    elements.completionTitle.textContent = `¡Has completado ${currentLevel.nombre}!`;
    elements.completionMessage.textContent = '¿Quieres seguir repasando este nivel o avanzar al siguiente?';
    elements.restart.hidden = true;
    elements.levelActions.hidden = false;
    elements.reviewHsk.textContent = `Seguir repasando ${currentLevel.nombre}`;
    elements.nextHsk.textContent = `Pasar a ${nextLevel.nombre}`;
  }

  // Sustituye las tarjetas de estudio por el mensaje de finalización.
  elements.wordCard.hidden = true;
  elements.exampleCard.hidden = true;
  elements.lessonNav.hidden = true;
  elements.completion.hidden = false;
});

// Vuelve a la primera palabra para repasar sin borrar la finalización guardada.
elements.restart.addEventListener('click', () => {
  audioUnidad.detener();
  currentIndex = 0;
  elements.completion.hidden = true;
  elements.wordCard.hidden = false;
  elements.exampleCard.hidden = false;
  elements.lessonNav.hidden = false;
  renderLesson();
});

// Regresa a la ruta del nivel, tanto en modo integrado como en página completa.
elements.reviewHsk.addEventListener('click', () => {
  localStorage.setItem('current-hsk', String(unidadActual.hsk));
  if (embedded) {
    window.parent.postMessage({ type: 'hanzi-hub:close-lesson' }, '*');
    return;
  }
  window.location.href = './vocabulario.html';
});

// Abre la primera unidad del siguiente nivel conservando el modo integrado.
elements.nextHsk.addEventListener('click', () => {
  if (!nextLevel) return;

  const firstUnitOfNextLevel = nextLevel.unidades[0];
  localStorage.setItem('current-hsk', String(nextLevel.id));
  window.location.href = `./leccion.html?hsk=${nextLevel.id}&unidad=${firstUnitOfNextLevel.id}${embedded ? '&embed=1' : ''}`;
});

// Añade o quita la palabra actual de los favoritos guardados.
elements.favorite.addEventListener('click', () => {
  const word = vocabulary[currentIndex].hanzi;
  favorites.has(word) ? favorites.delete(word) : favorites.add(word);
  localStorage.setItem(`${storageKey}-favorites`, JSON.stringify([...favorites]));
  renderLesson();
});

// Detiene el audio y vuelve a vocabulario al pulsar el botón de regreso.
document.querySelector('.back-button').addEventListener('click', () => {
  audioUnidad.detener();
  if (embedded) {
    window.parent.postMessage({ type: 'hanzi-hub:close-lesson' }, '*');
    return;
  }
  window.location.href = './vocabulario.html';
});

// Muestra la primera palabra o la posición recuperada al iniciar.
renderLesson();
