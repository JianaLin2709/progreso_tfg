import { catalogoHSK } from './datos/catalogo-hsk.js?v=20';

const rootPrefix = document.body.dataset.rootPrefix || '';

//funcion para calcular el progreso de una unidad 
//storageKey: identificador de una unidad wordCount:número de palabras de una unidad 
function getUnitProgress(storageKey, wordCount) {
  const savedPosition = localStorage.getItem(`${storageKey}-position`);
  const completed = localStorage.getItem(`${storageKey}-completed`) === 'true';
  const wordsSeen = completed
    ? wordCount
    : savedPosition === null
      ? 0
      : Math.min(Number(savedPosition) + 1, wordCount);

  return {
    completed,
    wordsSeen,
    percent: wordCount ? (completed ? 100 : Math.round(wordsSeen / wordCount * 100)) : 0
  };
}

const elements = {
  selector: document.querySelector('#hsk-selector'),
  trigger: document.querySelector('#hsk-select-trigger'),
  selectedLabel: document.querySelector('#hsk-selected-label'),
  options: document.querySelector('#hsk-options'),
  path: document.querySelector('#hsk-one-path'),
  continueLearning: document.querySelector('#continue-learning'),
  wordsSeen: document.querySelector('#words-seen'),
  totalWords: document.querySelector('#total-words'),
  completedUnits: document.querySelector('#completed-units'),
  totalUnits: document.querySelector('#total-units-summary'),
  currentLevel: document.querySelector('.stat:nth-child(2) > strong'),
  currentLevelProgress: document.querySelector('.mini-progress span'),
  wordsSummary: document.querySelector('.stat:nth-child(1) > small'),
  unitsSummary: document.querySelector('.stat:nth-child(3) > small'),
  profileLevel: document.querySelector('#sidebar-level'),
  sidebarProgress: document.querySelector('#sidebar-progress-bar')
};

elements.learningMain = document.querySelector('.learning-main');
elements.levelSwitcher = document.querySelector('.level-switcher');

//inframe, abrir una página dentro del panel (cambiar panel)
function openLessonInPanel(href) {
  if (!elements.learningMain || !elements.path) return;

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

//cerrar panel de lección y actualizar 
function closeLessonPanel() {
  const frame = elements.learningMain?.querySelector('.embedded-lesson-frame');
  frame?.remove();
  if (elements.levelSwitcher) elements.levelSwitcher.hidden = false;
  if (elements.path) elements.path.hidden = false;

  const selectedHsk = Number(localStorage.getItem('current-hsk')) || initialHsk;
  showHsk(selectedHsk);
}

const savedHsk = Number(localStorage.getItem('current-hsk'));

function isLevelComplete(level) {
  return level.unidades.every((unit) => localStorage.getItem(`hsk${level.id}-unit${unit.id}-completed`) === 'true');
}

function isLevelUnlocked(index) {
  return index === 0 || isLevelComplete(catalogoHSK[index - 1]);
}

const savedLevelIndex = catalogoHSK.findIndex((level) => level.id === savedHsk);
const initialHsk = savedLevelIndex >= 0 && isLevelUnlocked(savedLevelIndex)
  ? savedHsk
  : [...catalogoHSK].reverse().find((_, reverseIndex) => isLevelUnlocked(catalogoHSK.length - 1 - reverseIndex))?.id
    || catalogoHSK[0].id;


//asociar los hsk presentes a etiquetas clasificatorias 
const stageLabels = {
  1: '初级',
  2: '初级',
  3: '中级',
  4: '中级',
  5: '高级',
  6: '高级',
  7: '高等'
};

function getUnitIcon(unit) {
  const firstWord = unit.vocabulario.find((entry) => entry.hanzi)?.hanzi || '字';
  return [...firstWord.replace(/[，。…]/g, '')].slice(0, 2).join('');
}

function renderLevel(level) {
  //calculo progreso de cada unidad 
  const unitProgress = level.unidades.map((unit) => ({
    unit,
    ...getUnitProgress(`hsk${level.id}-unit${unit.id}`, unit.vocabulario.length)
  }));
  const totalWords = level.unidades.reduce((total, unit) => total + unit.vocabulario.length, 0);
  const wordsSeen = unitProgress.reduce((total, progress) => total + progress.wordsSeen, 0);
  const completedUnits = unitProgress.filter((progress) => progress.completed).length;
  const overallPercent = totalWords ? Math.round(wordsSeen / totalWords * 100) : 0;
  const unlocked = unitProgress.map((_, index) => index === 0 || unitProgress[index - 1].completed);
  const allUnlocked = unlocked.every(Boolean);
  const currentIndex = unitProgress.findIndex((progress, index) => unlocked[index] && !progress.completed);
  const activeIndex = currentIndex === -1 ? unitProgress.length - 1 : currentIndex;
  const nextUnit = unitProgress[activeIndex];

  if (elements.wordsSeen) elements.wordsSeen.textContent = String(wordsSeen);
  if (elements.totalWords) elements.totalWords.textContent = String(totalWords);
  if (elements.completedUnits) elements.completedUnits.textContent = String(completedUnits);
  if (elements.totalUnits) elements.totalUnits.textContent = String(level.unidades.length);
  if (elements.currentLevel) elements.currentLevel.textContent = level.nombre;
  if (elements.currentLevelProgress) elements.currentLevelProgress.style.width = `${overallPercent}%`;
  if (elements.wordsSummary) elements.wordsSummary.innerHTML = `de <span id="total-words">${totalWords}</span> en ${level.nombre}`;
  if (elements.unitsSummary) elements.unitsSummary.textContent = level.nombre;
  if (elements.profileLevel) elements.profileLevel.textContent = level.nombre;
  if (elements.sidebarProgress) elements.sidebarProgress.style.width = `${overallPercent}%`;
  if (elements.continueLearning) elements.continueLearning.href = `${rootPrefix}paginas/leccion.html?hsk=${level.id}&unidad=${nextUnit.unit.id}`;

  const cards = unitProgress.map(({ unit, completed, wordsSeen: seen, percent }, index) => {
    const isUnlocked = unlocked[index];
    const inProgress = seen > 0 && !completed;
    const state = completed ? 'Completada ✓' : !isUnlocked ? 'Bloqueada 🔒' : inProgress ? 'En curso' : 'Disponible';
    const action = completed ? 'Repasar unidad' : inProgress ? 'Continuar unidad' : 'Comenzar unidad';
    const currentClass = index === activeIndex ? ' current' : '';
    const lockedClass = isUnlocked ? '' : ' locked';
    const actionControl = isUnlocked
      ? `<a class="unit-button" href="${rootPrefix}paginas/leccion.html?hsk=${level.id}&unidad=${unit.id}">${action} →</a>`
      : '<span class="unit-button disabled" aria-disabled="true">Completa la unidad anterior</span>';

    return `
      <article class="unit-card${currentClass}${lockedClass}" data-unit-index="${index}" aria-label="Unidad ${unit.id}: ${state}">
        <div class="unit-top">
          <span class="unit-number">${unit.id}</span>
          <span class="unit-state${completed || inProgress ? '' : ' upcoming'}">${state}</span>
        </div>
        <div class="unit-icon" lang="zh-Hans">${getUnitIcon(unit)}</div>
        <h3>${unit.titulo.trim()}</h3>
        <p>Aprende ${unit.vocabulario.length} palabras relacionadas con ${unit.titulo.trim().toLowerCase()}.</p>
        <div class="unit-progress"><span style="width:${percent}%"></span></div>
        <span class="unit-percent">${percent}%</span>
        ${actionControl}
      </article>`;
  }).join('');

  elements.path.innerHTML = `
    <div class="path-heading">
      <div>
        <span class="section-label">TU RUTA DE APRENDIZAJE</span>
        <h2>${level.nombre} <small>${stageLabels[level.id] || '高级'}</small></h2>
        <p class="path-encouragement">¡Vas genial! Sigue así <span aria-hidden="true">♡</span></p>
      </div>
      <div class="overall-progress">
        <span><strong>${overallPercent}%</strong> completado</span>
        <div class="progress-illustration" style="--progress-position:${overallPercent}%">
          <img class="progress-bunny" src="${rootPrefix}img/conejo-progreso.png" alt="" aria-hidden="true">
          <div class="progress-track"><span style="width:${overallPercent}%"></span></div>
        </div>
        <span>${completedUnits} / ${level.unidades.length} unidades</span>
      </div>
    </div>
    <div class="units-carousel">
      <div class="carousel-controls" aria-label="Navegar por las unidades">
        <button class="carousel-button carousel-previous" type="button" aria-label="Unidad anterior">←</button>
        <span>Desliza para ver todas las unidades</span>
        <button class="carousel-button carousel-next" type="button" aria-label="Unidad siguiente">→</button>
      </div>
      <div class="units-grid manual-scroll">${cards}</div>
    </div>
    <div class="learning-tip">
      <span class="tip-icon" aria-hidden="true">💡</span>
      <span>${allUnlocked ? 'Todas las unidades están desbloqueadas.' : 'Puedes explorar la ruta; completa cada unidad para desbloquear la siguiente.'}</span>
      <span class="tip-arrow" aria-hidden="true">›</span>
    </div>`;

  const track = elements.path.querySelector('.units-grid');
  const cardElements = [...track.querySelectorAll('.unit-card')];
  const previousButton = elements.path.querySelector('.carousel-previous');
  const nextButton = elements.path.querySelector('.carousel-next');
  let visibleIndex = activeIndex;

  function scrollToCard(index, behavior = 'smooth') {
    visibleIndex = Math.min(Math.max(index, 0), cardElements.length - 1);
    const card = cardElements[visibleIndex];
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior });
    if (previousButton) previousButton.disabled = visibleIndex === 0;
    if (nextButton) nextButton.disabled = visibleIndex === cardElements.length - 1;
  }

  requestAnimationFrame(() => requestAnimationFrame(() => scrollToCard(activeIndex)));

  previousButton.addEventListener('click', () => scrollToCard(visibleIndex - 1));
  nextButton.addEventListener('click', () => scrollToCard(visibleIndex + 1));
  track.addEventListener('scroll', () => {
    const closestIndex = cardElements.reduce((bestIndex, card, index) => {
      const bestDistance = Math.abs(cardElements[bestIndex].offsetLeft - track.offsetLeft - track.scrollLeft);
      const distance = Math.abs(card.offsetLeft - track.offsetLeft - track.scrollLeft);
      return distance < bestDistance ? index : bestIndex;
    }, 0);
    visibleIndex = closestIndex;
    previousButton.disabled = visibleIndex === 0;
    nextButton.disabled = visibleIndex === cardElements.length - 1;
  }, { passive: true });

  track.addEventListener('wheel', (event) => {
    if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
    event.preventDefault();
    event.stopPropagation();
    track.scrollLeft += event.deltaX;
  }, { passive: false });

  let touchStartX = 0;
  let touchStartY = 0;
  let touchStartScroll = 0;

  track.addEventListener('touchstart', (event) => {
    const touch = event.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
    touchStartScroll = track.scrollLeft;
  }, { passive: true });

  track.addEventListener('touchmove', (event) => {
    const touch = event.touches[0];
    const deltaX = touchStartX - touch.clientX;
    const deltaY = touchStartY - touch.clientY;
    if (Math.abs(deltaX) <= Math.abs(deltaY)) return;
    event.preventDefault();
    event.stopPropagation();
    track.scrollLeft = touchStartScroll + deltaX;
  }, { passive: false });
}

function showHsk(hskId) {
  const levelIndex = catalogoHSK.findIndex((item) => item.id === hskId);
  if (levelIndex < 0 || !isLevelUnlocked(levelIndex)) return;
  const level = catalogoHSK[levelIndex];
  localStorage.setItem('current-hsk', String(level.id));
  elements.selectedLabel.textContent = level.nombre;
  elements.path.hidden = false;

  elements.options.querySelectorAll('.hsk-option').forEach((option) => {
    option.setAttribute('aria-selected', String(Number(option.dataset.hsk) === level.id));
  });

  renderLevel(level);
}

catalogoHSK.forEach((level, index) => {
  const unlocked = isLevelUnlocked(index);
  const option = document.createElement('button');
  option.className = `hsk-option${unlocked ? '' : ' is-locked'}`;
  option.type = 'button';
  option.dataset.hsk = String(level.id);
  option.disabled = !unlocked;
  option.setAttribute('role', 'option');
  option.setAttribute('aria-disabled', String(!unlocked));
  option.innerHTML = `
    <span class="hsk-option-check" aria-hidden="true">✓</span>
    <img class="panda-option-icon" src="${rootPrefix}img/panda-selector.png" alt="" aria-hidden="true">
    <span>${level.nombre}</span>
    <span class="hsk-option-end-check" aria-hidden="true">${unlocked ? '✓' : '🔒'}</span>`;
  elements.options.append(option);
});

elements.trigger.addEventListener('click', () => {
  const willOpen = elements.options.hidden;
  elements.options.hidden = !willOpen;
  elements.trigger.setAttribute('aria-expanded', String(willOpen));
});

elements.options.addEventListener('click', (event) => {
  const option = event.target.closest('.hsk-option');
  if (!option) return;
  showHsk(Number(option.dataset.hsk));
  elements.options.hidden = true;
  elements.trigger.setAttribute('aria-expanded', 'false');
  elements.trigger.focus();
});

document.addEventListener('click', (event) => {
  if (elements.selector.contains(event.target)) return;
  elements.options.hidden = true;
  elements.trigger.setAttribute('aria-expanded', 'false');
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  elements.options.hidden = true;
  elements.trigger.setAttribute('aria-expanded', 'false');
});

showHsk(initialHsk);

elements.path.addEventListener('click', (event) => {
  const lessonLink = event.target.closest('a.unit-button');
  if (!lessonLink) return;
  event.preventDefault();
  openLessonInPanel(lessonLink.href);
});

elements.continueLearning?.addEventListener('click', (event) => {
  event.preventDefault();
  openLessonInPanel(elements.continueLearning.href);
});

window.addEventListener('message', (event) => {
  if (event.data?.type !== 'hanzi-hub:close-lesson') return;
  const frame = elements.learningMain?.querySelector('.embedded-lesson-frame');
  if (!frame || event.source !== frame.contentWindow) return;
  closeLessonPanel();
});
