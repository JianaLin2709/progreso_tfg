//============================================================
// 1. Importaciones
//============================================================
import { catalogoHSK } from './datos/catalogo-hsk.js?v=20';
import { guardarPreferencias, obtenerDatosUsuario } from './user-data.js?v=1';

//============================================================
// 2. Configuración y constantes
//============================================================
const rootPrefix = document.body.dataset.rootPrefix || '';
const stageLabels = {
  1: '初级', 2: '初级', 3: '中级', 4: '中级',
  5: '高级', 6: '高级', 7: '高等'
};

//============================================================
// 3. Elementos HTML
//============================================================
const elements = {
  selector: document.querySelector('#hsk-selector'),
  trigger: document.querySelector('#hsk-select-trigger'),
  selectedLabel: document.querySelector('#hsk-selected-label'),
  options: document.querySelector('#hsk-options'),
  hskTemplate: document.querySelector('#hsk-option-template'),
  learningMain: document.querySelector('.learning-main'),
  levelSwitcher: document.querySelector('.level-switcher'),
  path: document.querySelector('#hsk-one-path'),
  continueLearning: document.querySelector('#continue-learning'),
  vocabulary: document.querySelector('#open-vocabulary'),
  favorites: document.querySelector('#open-favorites'),
  profileLevel: document.querySelector('#sidebar-level'),
  sidebarProgress: document.querySelector('#sidebar-progress-bar'),
  levelName: document.querySelector('#path-level-name'),
  levelStage: document.querySelector('#path-level-stage'),
  progressPercent: document.querySelector('#path-progress-percent'),
  progressIllustration: document.querySelector('#progress-illustration'),
  progressBar: document.querySelector('#path-progress-bar'),
  completedUnits: document.querySelector('#path-completed-units'),
  totalUnits: document.querySelector('#path-total-units'),
  unitsGrid: document.querySelector('#units-grid'),
  unitTemplate: document.querySelector('#unit-card-template'),
  previousButton: document.querySelector('.carousel-previous'),
  nextButton: document.querySelector('.carousel-next')
};

//============================================================
// 4. Estado
//============================================================
let visibleIndex = 0;
let userData = await obtenerDatosUsuario();

//============================================================
// 5. Funciones
//============================================================

// Progreso
function getInitialHsk() {
  const savedHsk = Number(userData.preferencias.hskActual);
  return catalogoHSK.some((level) => level.id === savedHsk) ? savedHsk : catalogoHSK[0].id;
}

function getUnitProgress(hsk, unidad, wordCount) {
  const saved = userData.progreso.find((item) => item.hsk === hsk && item.unidad === unidad);
  const savedPosition = saved?.posicion;
  const completed = saved?.completada === true;
  const wordsSeen = completed
    ? wordCount
    : savedPosition === undefined
      ? 0
      : Math.min(Math.max(Number(savedPosition) + 1, 0), wordCount);

  return {
    completed,
    wordsSeen,
    percent: wordCount ? Math.round(wordsSeen / wordCount * 100) : 0
  };
}

function getLevelProgress(level) {
  const units = level.unidades.map((unit) => ({
    unit,
    ...getUnitProgress(level.id, unit.id, unit.vocabulario.length)
  }));
  const totalWords = units.reduce((total, item) => total + item.unit.vocabulario.length, 0);
  const wordsSeen = units.reduce((total, item) => total + item.wordsSeen, 0);
  const completedUnits = units.filter((item) => item.completed).length;
  const firstIncomplete = units.findIndex((item) => !item.completed);
  const activeIndex = firstIncomplete === -1 ? Math.max(units.length - 1, 0) : firstIncomplete;

  return {
    units,
    completedUnits,
    activeIndex,
    nextUnit: units[activeIndex],
    percent: totalWords ? Math.round(wordsSeen / totalWords * 100) : 0
  };
}

// Unidades
function getUnitIcon(unit) {
  const firstWord = unit.vocabulario.find((entry) => entry.hanzi)?.hanzi || '字';
  return [...firstWord.replace(/[，。…]/g, '')].slice(0, 2).join('');
}

function createUnitCard(level, progress, index, activeIndex) {
  const card = elements.unitTemplate.content.firstElementChild.cloneNode(true);
  const { unit, completed, wordsSeen, percent } = progress;
  const inProgress = wordsSeen > 0 && !completed;
  const state = completed ? 'Completada ✓' : inProgress ? 'En curso' : 'Disponible';
  const action = completed ? 'Repasar unidad' : inProgress ? 'Continuar unidad' : 'Comenzar unidad';

  card.dataset.unitIndex = String(index);
  card.classList.toggle('current', index === activeIndex);
  card.setAttribute('aria-label', `Unidad ${unit.id}: ${state}`);
  card.querySelector('.unit-number').textContent = String(unit.id);

  const stateElement = card.querySelector('.unit-state');
  stateElement.textContent = state;
  stateElement.classList.toggle('upcoming', !completed && !inProgress);

  card.querySelector('.unit-icon').textContent = getUnitIcon(unit);
  card.querySelector('.unit-title').textContent = unit.titulo.trim();
  card.querySelector('.unit-description').textContent =
    `Aprende ${unit.vocabulario.length} palabras relacionadas con ${unit.titulo.trim().toLowerCase()}.`;
  card.querySelector('.unit-progress span').style.width = `${percent}%`;
  card.querySelector('.unit-percent').textContent = `${percent}%`;

  const button = card.querySelector('.unit-button');
  button.href = `${rootPrefix}paginas/leccion.html?hsk=${level.id}&unidad=${unit.id}`;
  button.textContent = `${action} →`;
  return card;
}

function renderLevel(level) {
  const progress = getLevelProgress(level);
  const fragment = document.createDocumentFragment();

  progress.units.forEach((unit, index) => {
    fragment.append(createUnitCard(level, unit, index, progress.activeIndex));
  });

  elements.unitsGrid.replaceChildren(fragment);
  elements.levelName.textContent = level.nombre;
  elements.levelStage.textContent = stageLabels[level.id] || '高级';
  elements.progressPercent.textContent = `${progress.percent}%`;
  elements.progressBar.style.width = `${progress.percent}%`;
  elements.completedUnits.textContent = String(progress.completedUnits);
  elements.totalUnits.textContent = String(level.unidades.length);
  elements.profileLevel.textContent = level.nombre;
  elements.sidebarProgress.style.width = `${progress.percent}%`;
  elements.progressIllustration.style.setProperty('--progress-position', `${progress.percent}%`);

  if (progress.nextUnit) {
    elements.continueLearning.href =
      `${rootPrefix}paginas/leccion.html?hsk=${level.id}&unidad=${progress.nextUnit.unit.id}`;
  }

  visibleIndex = progress.activeIndex;
  requestAnimationFrame(() => requestAnimationFrame(() => scrollToCard(visibleIndex)));
}

// Selector HSK
function createHskOption(level) {
  const option = elements.hskTemplate.content.firstElementChild.cloneNode(true);
  option.dataset.hsk = String(level.id);
  option.querySelector('.hsk-option-name').textContent = level.nombre;
  return option;
}

function renderHskOptions() {
  const fragment = document.createDocumentFragment();
  catalogoHSK.forEach((level) => fragment.append(createHskOption(level)));
  elements.options.replaceChildren(fragment);
}

function showHsk(hskId, persist = true) {
  const level = catalogoHSK.find((item) => item.id === hskId);
  if (!level) return;

  userData.preferencias.hskActual = level.id;
  if (persist) guardarPreferencias({ hskActual: level.id }).catch(console.error);
  elements.selectedLabel.textContent = level.nombre;
  elements.path.hidden = false;
  elements.options.querySelectorAll('.hsk-option').forEach((option) => {
    option.setAttribute('aria-selected', String(Number(option.dataset.hsk) === level.id));
  });
  renderLevel(level);
}

function toggleHskSelector() {
  const willOpen = elements.options.hidden;
  elements.options.hidden = !willOpen;
  elements.trigger.setAttribute('aria-expanded', String(willOpen));
}

function closeHskSelector() {
  elements.options.hidden = true;
  elements.trigger.setAttribute('aria-expanded', 'false');
}

// Carrusel
function getUnitCards() {
  return [...elements.unitsGrid.querySelectorAll('.unit-card')];
}

function updateCarouselButtons() {
  const cards = getUnitCards();
  elements.previousButton.disabled = visibleIndex === 0;
  elements.nextButton.disabled = visibleIndex === cards.length - 1;
}

function scrollToCard(index, behavior = 'smooth') {
  const cards = getUnitCards();
  if (!cards.length) return;

  visibleIndex = Math.min(Math.max(index, 0), cards.length - 1);
  elements.unitsGrid.scrollTo({
    left: cards[visibleIndex].offsetLeft - elements.unitsGrid.offsetLeft,
    behavior
  });
  updateCarouselButtons();
}

function showPreviousCard() {
  scrollToCard(visibleIndex - 1);
}

function showNextCard() {
  scrollToCard(visibleIndex + 1);
}

function handleCarouselScroll() {
  const cards = getUnitCards();
  if (!cards.length) return;

  visibleIndex = cards.reduce((bestIndex, card, index) => {
    const bestDistance = Math.abs(
      cards[bestIndex].offsetLeft - elements.unitsGrid.offsetLeft - elements.unitsGrid.scrollLeft
    );
    const distance = Math.abs(
      card.offsetLeft - elements.unitsGrid.offsetLeft - elements.unitsGrid.scrollLeft
    );
    return distance < bestDistance ? index : bestIndex;
  }, 0);
  updateCarouselButtons();
}

function handleCarouselWheel(event) {
  if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
  event.preventDefault();
  event.stopPropagation();
  elements.unitsGrid.scrollLeft += event.deltaX;
}

// Panel de lección
function openLessonInPanel(href) {
  const lessonUrl = new URL(href, window.location.href);
  lessonUrl.searchParams.set('embed', '1');
  elements.levelSwitcher.hidden = true;
  elements.path.hidden = true;

  let frame = elements.learningMain.querySelector('.embedded-lesson-frame');
  if (!frame) {
    frame = document.createElement('iframe');
    frame.className = 'embedded-lesson-frame';
    frame.title = 'Lección de vocabulario';
    elements.learningMain.append(frame);
  }
  frame.src = lessonUrl.href;
}

async function closeLessonPanel() {
  elements.learningMain.querySelector('.embedded-lesson-frame')?.remove();
  elements.levelSwitcher.hidden = false;
  elements.path.hidden = false;
  elements.vocabulary.classList.add('active');
  elements.favorites.classList.remove('active');

  const currentUrl = new URL(window.location.href);
  currentUrl.searchParams.delete('vista');
  window.history.replaceState({}, '', currentUrl);

  userData = await obtenerDatosUsuario(true);
  showHsk(getInitialHsk(), false);
}

function openFavoritesInPanel() {
  elements.vocabulary.classList.remove('active');
  elements.favorites.classList.add('active');
  openLessonInPanel('./leccion.html?modo=favoritos');
}

// Controladores de eventos
function handleHskSelection(event) {
  const option = event.target.closest('.hsk-option');
  if (!option) return;
  showHsk(Number(option.dataset.hsk));
  closeHskSelector();
  elements.trigger.focus();
}

function handleOutsideClick(event) {
  if (!elements.selector.contains(event.target)) closeHskSelector();
}

function handleUnitClick(event) {
  const link = event.target.closest('a.unit-button');
  if (!link) return;
  event.preventDefault();
  openLessonInPanel(link.href);
}

function handleContinueLearning(event) {
  event.preventDefault();
  openLessonInPanel(elements.continueLearning.href);
}

function handleFavoritesClick(event) {
  event.preventDefault();
  openFavoritesInPanel();
}

function handleVocabularyClick(event) {
  event.preventDefault();
  closeLessonPanel();
}

function openInitialView() {
  const parametros = new URLSearchParams(window.location.search);
  if (parametros.get('vista') === 'favoritos') openFavoritesInPanel();
  if (parametros.get('vista') === 'continuar') openLessonInPanel(elements.continueLearning.href);
}

function handleLessonMessage(event) {
  if (event.data?.type !== 'learnchinese:close-lesson') return;
  const frame = elements.learningMain.querySelector('.embedded-lesson-frame');
  if (frame && event.source === frame.contentWindow) closeLessonPanel();
}

//============================================================
// 6. Aplicación de eventos
//============================================================
elements.trigger.addEventListener('click', toggleHskSelector);
elements.options.addEventListener('click', handleHskSelection);
document.addEventListener('click', handleOutsideClick);
elements.previousButton.addEventListener('click', showPreviousCard);
elements.nextButton.addEventListener('click', showNextCard);
elements.unitsGrid.addEventListener('scroll', handleCarouselScroll, { passive: true });
elements.unitsGrid.addEventListener('wheel', handleCarouselWheel, { passive: false });
elements.path.addEventListener('click', handleUnitClick);
elements.continueLearning.addEventListener('click', handleContinueLearning);
elements.vocabulary.addEventListener('click', handleVocabularyClick);
elements.favorites.addEventListener('click', handleFavoritesClick);
window.addEventListener('message', handleLessonMessage);

// Los eventos táctiles y el cierre mediante Escape permanecen desactivados.

//============================================================
// 7. Llamadas iniciales
//============================================================
renderHskOptions();
showHsk(getInitialHsk(), false);
openInitialView();
