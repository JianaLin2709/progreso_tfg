import { catalogoHSK } from './datos/catalogo-hsk.js?v=20';

// Permite reutilizar este script desde páginas situadas en distintas carpetas.
const rootPrefix = document.body.dataset.rootPrefix || '';

// Calcula el progreso de una unidad a partir de los datos guardados en el navegador.
// storageKey identifica la unidad y wordCount indica cuántas palabras contiene.
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

// Referencias a los elementos de la interfaz que se actualizan dinámicamente.
const elements = {
  selector: document.querySelector('#hsk-selector'),
  trigger: document.querySelector('#hsk-select-trigger'),
  selectedLabel: document.querySelector('#hsk-selected-label'),
  options: document.querySelector('#hsk-options'),
  path: document.querySelector('#hsk-one-path'),
  //********************************************************************

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

// Contenedores usados para alternar entre la ruta de aprendizaje y una lección.
elements.learningMain = document.querySelector('.learning-main');
elements.levelSwitcher = document.querySelector('.level-switcher');

// Abre una lección dentro del panel principal mediante un iframe.
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

// Cierra la lección incrustada y vuelve a renderizar el progreso actualizado.
function closeLessonPanel() {
  const frame = elements.learningMain?.querySelector('.embedded-lesson-frame');
  frame?.remove();
  if (elements.levelSwitcher) elements.levelSwitcher.hidden = false;
  if (elements.path) elements.path.hidden = false;

  const selectedHsk = Number(localStorage.getItem('current-hsk')) || initialHsk;
  showHsk(selectedHsk);
}

const savedHsk = Number(localStorage.getItem('current-hsk'));

// Un nivel se completa cuando todas sus unidades están marcadas como terminadas.
function isLevelComplete(level) {
  return level.unidades.every((unit) => localStorage.getItem(`hsk${level.id}-unit${unit.id}-completed`) === 'true');
}

// Cada nivel se desbloquea al completar el nivel inmediatamente anterior.
function isLevelUnlocked(index) {
  return index === 0 || isLevelComplete(catalogoHSK[index - 1]);
}

// Recupera el último nivel elegido si sigue desbloqueado; en caso contrario,
// selecciona el nivel desbloqueado más avanzado.
const savedLevelIndex = catalogoHSK.findIndex((level) => level.id === savedHsk);
const initialHsk = savedLevelIndex >= 0 && isLevelUnlocked(savedLevelIndex)
  ? savedHsk
  : [...catalogoHSK].reverse().find((_, reverseIndex) => isLevelUnlocked(catalogoHSK.length - 1 - reverseIndex))?.id
    || catalogoHSK[0].id;


// Etiqueta china correspondiente a la etapa de cada nivel HSK.
const stageLabels = {
  1: '初级',
  2: '初级',
  3: '中级',
  4: '中级',
  5: '高级',
  6: '高级',
  7: '高等'
};

// Usa hasta dos caracteres de la primera palabra de la unidad como icono.
function getUnitIcon(unit) {
  const firstWord = unit.vocabulario.find((entry) => entry.hanzi)?.hanzi || '字';
  return [...firstWord.replace(/[，。…]/g, '')].slice(0, 2).join('');
}

function renderLevel(level) {
  // Reúne el progreso individual y calcula los totales del nivel.
  const unitProgress = level.unidades.map((unit) => ({
    unit,
    ...getUnitProgress(`hsk${level.id}-unit${unit.id}`, unit.vocabulario.length)
  }));
  const totalWords = level.unidades.reduce((total, unit) => total + unit.vocabulario.length, 0);
  const wordsSeen = unitProgress.reduce((total, progress) => total + progress.wordsSeen, 0);
  const completedUnits = unitProgress.filter((progress) => progress.completed).length;
  const overallPercent = totalWords ? Math.round(wordsSeen / totalWords * 100) : 0;

  // Las unidades se desbloquean en orden, al completar la anterior.
  const unlocked = unitProgress.map((_, index) => index === 0 || unitProgress[index - 1].completed);
  const allUnlocked = unlocked.every(Boolean);
  const currentIndex = unitProgress.findIndex((progress, index) => unlocked[index] && !progress.completed);
  const activeIndex = currentIndex === -1 ? unitProgress.length - 1 : currentIndex;
  const nextUnit = unitProgress[activeIndex];

  // Actualiza el resumen de progreso mostrado en la cabecera y la barra lateral.
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

  // Genera una tarjeta por unidad con su estado y acción correspondiente.
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

  // Construye la ruta y sus controles con los datos del nivel seleccionado.
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

  // Centra la tarjeta solicitada y sincroniza el estado de los botones.
  function scrollToCard(index, behavior = 'smooth') {
    visibleIndex = Math.min(Math.max(index, 0), cardElements.length - 1);
    const card = cardElements[visibleIndex];
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior });
    if (previousButton) previousButton.disabled = visibleIndex === 0;
    if (nextButton) nextButton.disabled = visibleIndex === cardElements.length - 1;
  }

  // Espera a que el navegador calcule el ancho y la posición de las tarjetas.
  requestAnimationFrame(() => requestAnimationFrame(() => scrollToCard(activeIndex)));

  previousButton.addEventListener('click', () => scrollToCard(visibleIndex - 1));
  nextButton.addEventListener('click', () => scrollToCard(visibleIndex + 1));
  // Detecta qué tarjeta queda más cerca del inicio tras un desplazamiento manual.
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

  // Conserva el desplazamiento vertical de la página y captura solo el horizontal.
  track.addEventListener('wheel', (event) => {
    if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
    event.preventDefault();
    event.stopPropagation();
    track.scrollLeft += event.deltaX;
  }, { passive: false });

  /* Interacción táctil desactivada temporalmente.
  let touchStartX = 0;
  let touchStartY = 0;
  let touchStartScroll = 0;

  // Guarda el punto inicial para distinguir un gesto horizontal de uno vertical.
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
  */
}

function showHsk(hskId) {
  // Ignora identificadores desconocidos y niveles que aún estén bloqueados.
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

// Crea las opciones del selector y refleja visualmente los niveles bloqueados.
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

// Abre o cierra la lista de niveles.
elements.trigger.addEventListener('click', () => {
  const willOpen = elements.options.hidden;
  elements.options.hidden = !willOpen;
  elements.trigger.setAttribute('aria-expanded', String(willOpen));
});

// La delegación de eventos permite gestionar todas las opciones desde su contenedor.
elements.options.addEventListener('click', (event) => {
  const option = event.target.closest('.hsk-option');
  if (!option) return;
  showHsk(Number(option.dataset.hsk));
  elements.options.hidden = true;
  elements.trigger.setAttribute('aria-expanded', 'false');
  elements.trigger.focus();
});

// Cierra el selector al hacer clic fuera de él.
document.addEventListener('click', (event) => {
  if (elements.selector.contains(event.target)) return;
  elements.options.hidden = true;
  elements.trigger.setAttribute('aria-expanded', 'false');
});

/* Cierre del selector con la tecla Escape desactivado temporalmente.
document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  elements.options.hidden = true;
  elements.trigger.setAttribute('aria-expanded', 'false');
});
*/

// Render inicial con el nivel guardado o el último nivel disponible.
showHsk(initialHsk);

// Abre las unidades sin abandonar la página principal.
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

// Recibe del iframe la petición de cerrar la lección y valida su origen.
window.addEventListener('message', (event) => {
  if (event.data?.type !== 'hanzi-hub:close-lesson') return;
  const frame = elements.learningMain?.querySelector('.embedded-lesson-frame');
  if (!frame || event.source !== frame.contentWindow) return;
  closeLessonPanel();
});
