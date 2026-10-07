// 1. IMPORTACIONES
// **********************************************************

import { catalogoHSK, obtenerUnidad } from './datos/catalogo-hsk.js?v=25';
import { prepararAudioUnidad } from './audio-unidad.js?v=3';
import {
  añadirFavorito,
  eliminarFavorito,
  guardarPreferencias,
  guardarProgreso,
  obtenerDatosUsuario
} from './user-data.js?v=1';


// 2. CONFIGURACIÓN DE LA LECCIÓN
// **********************************************************

const parametros = new URLSearchParams(window.location.search);
const embedded = parametros.get('embed') === '1';
const numeroHSK = Number(parametros.get('hsk')) || 1;
const numeroUnidad = Number(parametros.get('unidad')) || 1;
const unidadActual = obtenerUnidad(numeroHSK, numeroUnidad);

if (!unidadActual) {
  throw new Error(`No existe la unidad ${numeroUnidad} de HSK ${numeroHSK}.`);
}

const vocabulary = unidadActual.vocabulario;

if (!vocabulary.length) {
  throw new Error(`La unidad ${unidadActual.id} de HSK ${unidadActual.hsk} todavía no tiene vocabulario.`);
}

const currentLevelIndex = catalogoHSK.findIndex((hsk) => hsk.id === unidadActual.hsk);
const currentLevel = catalogoHSK[currentLevelIndex];
const currentUnitIndex = currentLevel.unidades.findIndex((unit) => unit.id === unidadActual.id);
const nextUnit = currentLevel.unidades[currentUnitIndex + 1];
const lastUnit = currentLevel.unidades[currentLevel.unidades.length - 1];
const nextLevel = catalogoHSK[currentLevelIndex + 1];
const isLastUnitOfLevel = unidadActual.id === lastUnit.id;


// 3. ELEMENTOS HTML
// **********************************************************

const elements = {
  body: document.body,
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
  back: document.querySelector('.back-button'),
  courseHsk: document.querySelector('#course-hsk'),
  courseUnit: document.querySelector('#course-unit'),
  completionTitle: document.querySelector('#completion-title'),
  completionMessage: document.querySelector('#completion-message'),
  restart: document.querySelector('#restart-button'),
  unitActions: document.querySelector('#unit-completion-actions'),
  nextUnit: document.querySelector('#next-unit-button'),
  levelActions: document.querySelector('#level-completion-actions'),
  reviewHsk: document.querySelector('#review-hsk-button'),
  nextHsk: document.querySelector('#next-hsk-button')
};


// 4. ESTADO DE LA LECCIÓN
// **********************************************************

const userData = await obtenerDatosUsuario();
const savedProgress = userData.progreso.find(
  (item) => item.hsk === unidadActual.hsk && item.unidad === unidadActual.id
);
let currentIndex = Number(savedProgress?.posicion) || 0;
currentIndex = Math.min(Math.max(currentIndex, 0), vocabulary.length - 1);
let unitCompleted = savedProgress?.completada === true;
const favorites = new Set(
  userData.favoritos
    .filter((item) => item.hsk === unidadActual.hsk && item.unidad === unidadActual.id)
    .map((item) => item.palabra)
);

const audioUnidad = prepararAudioUnidad(unidadActual, () => currentIndex);


// 5. FUNCIONES
// **********************************************************

function renderLesson(animate = false) {
  const entry = vocabulary[currentIndex];
  const number = currentIndex + 1;

  if (animate) {
    elements.wordCard.classList.add('is-changing');
    elements.exampleCard.classList.add('is-changing');
  }

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
    elements.nextLabel.textContent = currentIndex === vocabulary.length - 1
      ? 'Finalizar'
      : 'Siguiente';

    const isFavorite = favorites.has(entry.hanzi);
    elements.favorite.classList.toggle('active', isFavorite);
    elements.favorite.setAttribute('aria-pressed', String(isFavorite));
    elements.favorite.setAttribute(
      'aria-label',
      isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'
    );

    guardarProgreso(unidadActual.hsk, unidadActual.id, {
      posicion: currentIndex,
      completada: unitCompleted
    }).catch(console.error);
    elements.wordCard.classList.remove('is-changing');
    elements.exampleCard.classList.remove('is-changing');
  }, animate ? 160 : 0);
}

async function showCompletion() {
  unitCompleted = true;
  await guardarProgreso(unidadActual.hsk, unidadActual.id, {
    posicion: currentIndex,
    completada: true
  });

  if (isLastUnitOfLevel && nextLevel) {
    elements.completionTitle.textContent = `¡Has completado ${currentLevel.nombre}!`;
    elements.completionMessage.textContent = '¿Quieres seguir repasando este nivel o avanzar al siguiente?';
    if (elements.unitActions) elements.unitActions.hidden = true;
    elements.levelActions.hidden = false;
    elements.reviewHsk.textContent = `Seguir repasando ${currentLevel.nombre}`;
    elements.nextHsk.textContent = `Pasar a ${nextLevel.nombre}`;
  }

  elements.wordCard.hidden = true;
  elements.exampleCard.hidden = true;
  elements.lessonNav.hidden = true;
  elements.completion.hidden = false;
}

function openNextUnit() {
  if (!nextUnit) return;

  audioUnidad.detener();
  const embeddedParameter = embedded ? '&embed=1' : '';
  window.location.href = `./leccion.html?hsk=${currentLevel.id}&unidad=${nextUnit.id}${embeddedParameter}`;
}

function returnToVocabulary() {
  audioUnidad.detener();

  if (embedded) {
    window.parent.postMessage({ type: 'hanzi-hub:close-lesson' }, '*');
    return;
  }

  window.location.href = './vocabulario.html?v=37';
}

async function openNextLevel() {
  if (!nextLevel) return;

  const firstUnit = nextLevel.unidades[0];
  const embeddedParameter = embedded ? '&embed=1' : '';

  await guardarPreferencias({ hskActual: nextLevel.id });
  window.location.href = `./leccion.html?hsk=${nextLevel.id}&unidad=${firstUnit.id}${embeddedParameter}`;
}


// 6. FUNCIONES DE LOS EVENTOS
// **********************************************************

function handlePreviousClick() {
  audioUnidad.detener();

  if (currentIndex > 0) {
    currentIndex -= 1;
    renderLesson(true);
  }
}

async function handleNextClick() {
  audioUnidad.detener();

  if (currentIndex < vocabulary.length - 1) {
    currentIndex += 1;
    renderLesson(true);
    return;
  }

  await showCompletion();
}

function handleRestartClick() {
  audioUnidad.detener();
  currentIndex = 0;
  elements.completion.hidden = true;
  elements.wordCard.hidden = false;
  elements.exampleCard.hidden = false;
  elements.lessonNav.hidden = false;
  renderLesson();
}

async function handleReviewHskClick() {
  await guardarPreferencias({ hskActual: unidadActual.hsk });
  returnToVocabulary();
}

async function handleFavoriteClick() {
  const word = vocabulary[currentIndex].hanzi;
  elements.favorite.disabled = true;

  try {
    if (favorites.has(word)) {
      await eliminarFavorito(unidadActual.hsk, unidadActual.id, word);
      favorites.delete(word);
    } else {
      await añadirFavorito(unidadActual.hsk, unidadActual.id, word);
      favorites.add(word);
    }
    renderLesson();
  } finally {
    elements.favorite.disabled = false;
  }
}


// 7. APLICACIÓN DE EVENTOS
// **********************************************************

function addEventListeners() {
  elements.previous.addEventListener('click', handlePreviousClick);
  elements.next.addEventListener('click', handleNextClick);
  elements.restart.addEventListener('click', handleRestartClick);
  elements.nextUnit?.addEventListener('click', openNextUnit);
  elements.reviewHsk.addEventListener('click', handleReviewHskClick);
  elements.nextHsk.addEventListener('click', openNextLevel);
  elements.favorite.addEventListener('click', handleFavoriteClick);
  elements.back.addEventListener('click', returnToVocabulary);
}

// 8. INICIALIZACIÓN
// **********************************************************

function initializeLessonInformation() {
  elements.body.classList.toggle('is-embedded', embedded);
  elements.courseHsk.textContent = currentLevel.nombre;
  elements.courseUnit.textContent = `Unidad ${unidadActual.id}: ${unidadActual.titulo}`;
  elements.completionMessage.textContent = `Has completado ${unidadActual.titulo} de HSK ${unidadActual.hsk}.`;
  if (elements.nextUnit) elements.nextUnit.hidden = !nextUnit;
}

async function initializeLesson() {
  await guardarPreferencias({ hskActual: unidadActual.hsk });
  initializeLessonInformation();
  addEventListeners();
  renderLesson();
}

await initializeLesson();
