// 1. IMPORTACIONES
// **********************************************************

import { catalogoHSK } from './datos/catalogo-hsk.js?v=24';
import { eliminarFavorito, obtenerDatosUsuario } from './user-data.js?v=1';


// 2. CONFIGURACIÓN
// **********************************************************

const parametros = new URLSearchParams(window.location.search);
const embedded = parametros.get('embed') === '1';


// 3. ELEMENTOS HTML
// **********************************************************

const elements = {
  wordCard: document.querySelector('.word-card'),
  exampleCard: document.querySelector('.example-card'),
  lessonNav: document.querySelector('.lesson-nav'),
  completion: document.querySelector('#completion-card'),
  completionTitle: document.querySelector('#completion-title'),
  word: document.querySelector('#word'),
  pinyin: document.querySelector('#pinyin'),
  translation: document.querySelector('#translation'),
  exampleChinese: document.querySelector('#example-chinese'),
  examplePinyin: document.querySelector('#example-pinyin'),
  exampleSpanish: document.querySelector('#example-spanish'),
  counter: document.querySelector('#lesson-counter'),
  previous: document.querySelector('#previous-button'),
  next: document.querySelector('#next-button'),
  favorite: document.querySelector('.favorite'),
  back: document.querySelector('.back-button')
};


// 4. ESTADO
// **********************************************************

let favoriteWords = [];
let currentIndex = 0;
const userData = await obtenerDatosUsuario();


// 5. FUNCIONES
// **********************************************************

function getFavoriteWords() {
  const result = [];
  const savedFavorites = new Set(
    userData.favoritos.map((item) => `${item.hsk}:${item.unidad}:${item.palabra}`)
  );

  catalogoHSK.forEach((level) => {
    level.unidades.forEach((unit) => {
      unit.vocabulario.forEach((word) => {
        if (savedFavorites.has(`${level.id}:${unit.id}:${word.hanzi}`)) {
          result.push({ ...word, hsk: level.id, unidad: unit.id });
        }
      });
    });
  });

  return result;
}

function showEmptyState() {
  elements.wordCard.hidden = true;
  elements.exampleCard.hidden = true;
  elements.lessonNav.hidden = true;
  elements.completion.hidden = false;
  elements.completionTitle.textContent = 'No hay favoritos aún';
  document.querySelector('#unit-completion-actions').hidden = true;
}

function renderFavorite() {
  if (!favoriteWords.length) {
    showEmptyState();
    return;
  }

  const word = favoriteWords[currentIndex];

  elements.wordCard.hidden = false;
  elements.exampleCard.hidden = false;
  elements.lessonNav.hidden = false;
  elements.completion.hidden = true;

  elements.word.textContent = word.hanzi;
  elements.pinyin.textContent = word.pinyin;
  elements.translation.textContent = word.spanish;
  elements.exampleChinese.textContent = word.example;
  elements.examplePinyin.textContent = word.examplePinyin;
  elements.exampleSpanish.textContent = word.exampleSpanish;
  elements.counter.textContent = `${currentIndex + 1} / ${favoriteWords.length}`;
  elements.previous.disabled = currentIndex === 0;
  elements.next.disabled = currentIndex === favoriteWords.length - 1;
  elements.favorite.classList.add('active');
}

async function removeCurrentFavorite() {
  const word = favoriteWords[currentIndex];
  elements.favorite.disabled = true;
  try {
    await eliminarFavorito(word.hsk, word.unidad, word.hanzi);
    favoriteWords.splice(currentIndex, 1);

    if (currentIndex >= favoriteWords.length) {
      currentIndex = Math.max(0, favoriteWords.length - 1);
    }

    renderFavorite();
  } finally {
    elements.favorite.disabled = false;
  }
}

function showPreviousFavorite() {
  currentIndex -= 1;
  renderFavorite();
}

function showNextFavorite() {
  currentIndex += 1;
  renderFavorite();
}

function returnToVocabulary() {
  if (embedded) {
    window.parent.postMessage({ type: 'hanzi-hub:close-lesson' }, '*');
    return;
  }

  window.location.href = './vocabulario.html?v=37';
}


// 6. EVENTOS
// **********************************************************

function addEventListeners() {
  elements.previous.addEventListener('click', showPreviousFavorite);
  elements.next.addEventListener('click', showNextFavorite);
  elements.favorite.addEventListener('click', removeCurrentFavorite);
  elements.back.addEventListener('click', returnToVocabulary);
}


// 7. INICIALIZACIÓN
// **********************************************************

function initializeFavorites() {
  document.body.classList.toggle('is-embedded', embedded);
  favoriteWords = getFavoriteWords();

  document.querySelector('.progress-row').hidden = true;
  document.querySelector('.course-progress').hidden = true;
  document.querySelector('#word-position').hidden = true;
  document.querySelector('#word-audio').hidden = true;
  document.querySelector('#example-audio').hidden = true;
  document.querySelector('#completion-message').hidden = true;
  document.querySelector('#restart-button').hidden = true;
  document.querySelector('#level-completion-actions').hidden = true;
  document.querySelector('.intro h1').textContent = 'Tus palabras favoritas';
  document.querySelector('.intro > p:not(.audio-status)').textContent =
    'Repasa las palabras que has guardado';

  addEventListeners();
  renderFavorite();
}

initializeFavorites();
