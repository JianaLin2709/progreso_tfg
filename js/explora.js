// Importa las lecturas y la función para buscarlas por identificador.
import { lecturas, obtenerLectura } from './datos/lecturas/lecturas.js?v=8';

// Localiza la lista, el detalle y los filtros de lectura.
const listView = document.querySelector('#reading-list-view');
const detailView = document.querySelector('#reading-detail-view');
const list = document.querySelector('#reading-list');
const empty = document.querySelector('#reading-empty');
const filters = document.querySelector('#reading-filters');
// Recupera la lectura indicada en la URL.
const params = new URLSearchParams(window.location.search);
const selectedReading = obtenerLectura(params.get('lectura'));

// Mantiene el filtro activo y las imágenes asociadas a cada lectura.
const state = { difficulty: 'all' };
const readingImages = {
  medioambiente: '../img/lectura-medioambiente.png',
  viaje: '../img/lectura-viaje.png',
  medico: '../img/lectura-medico.png',
  compras: '../img/lectura-compras.png',
  clase: '../img/lectura-clase.png'
};

// Crea los botones para filtrar las lecturas por dificultad.
function renderDifficultyFilters() {
  filters.innerHTML = `
    <button class="reading-filter is-active" type="button" data-difficulty="all" aria-pressed="true">Todas</button>
    <button class="reading-filter" type="button" data-difficulty="Fácil" aria-pressed="false">Fácil</button>
    <button class="reading-filter" type="button" data-difficulty="Intermedio" aria-pressed="false">Intermedio</button>
    <button class="reading-filter" type="button" data-difficulty="Difícil" aria-pressed="false">Difícil</button>
  `;
}

// Escapa caracteres especiales para insertarlos como texto dentro del HTML.
function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

// Añade pinyin sobre el texto chino y botones en las palabras del vocabulario.
function renderRubyText(text, reading) {
  const vocabulary = new Map(reading.vocabulario.map((word) => [word.chino, word]));
  const words = Object.entries(reading.pinyinTexto)
    .map(([chinese, pinyin]) => ({ chinese, pinyin }))
    // Prioriza las expresiones largas para no dividirlas en coincidencias menores.
    .sort((a, b) => b.chinese.length - a.chinese.length);
  let result = '';
  let position = 0;

  // Recorre el texto y añade cada coincidencia o carácter sin pinyin.
  while (position < text.length) {
    const match = words.find((word) => text.startsWith(word.chinese, position));
    if (!match) {
      result += escapeHtml(text[position]);
      position += 1;
      continue;
    }

    const vocabularyWord = vocabulary.get(match.chinese);
    const base = vocabularyWord
      ? `<button class="interactive-word" type="button" data-vocab="${escapeHtml(match.chinese)}" aria-label="Doble clic para traducir ${escapeHtml(match.chinese)}">${escapeHtml(match.chinese)}</button>`
      : escapeHtml(match.chinese);
    result += `<ruby>${base}<rt class="pinyin-content">${escapeHtml(match.pinyin)}</rt></ruby>`;
    position += match.chinese.length;
  }

  return result;
}

// Filtra las lecturas y construye sus tarjetas en orden inverso.
function renderList() {
  const visible = [...lecturas]
    .filter((lectura) => state.difficulty === 'all' || lectura.dificultad === state.difficulty)
    .reverse();

  list.innerHTML = visible.map((lectura) => `
    <article class="reading-list-card">
      <div class="reading-thumbnail">
        <img src="${readingImages[lectura.id]}" alt="Ilustración de ${lectura.tituloEspanol}">
      </div>
      <div class="reading-card-body">
        <div class="reading-card-top">
          <h2 lang="zh-Hans">${lectura.titulo}</h2>
        </div>
        <p lang="zh-Hans">${lectura.resumen}</p>
        <div class="reading-card-meta">
          <span>${lectura.categoria}</span>
          <span>${lectura.serie}</span>
        </div>
      </div>
      <a class="start-reading" href="explora.html?v=9&lectura=${lectura.id}">Comenzar lectura <span aria-hidden="true">→</span></a>
    </article>
  `).join('');

  // Muestra el aviso solo cuando el filtro no devuelve lecturas.
  empty.hidden = visible.length > 0;
}

// Muestra el artículo elegido con sus títulos y párrafos.
function renderDetail(lectura) {
  listView.hidden = true;
  detailView.hidden = false;
  document.title = lectura.titulo;
  document.querySelector('#article-series').textContent = `${lectura.serie} · ${lectura.seriePinyin}`;
  document.querySelector('#article-title').textContent = lectura.titulo;
  document.querySelector('#article-title-pinyin').textContent = lectura.tituloPinyin;
  document.querySelector('#article-meta').innerHTML = `
    <span>${lectura.dificultad}</span><span>${lectura.categoria}</span>
  `;
  document.querySelector('#reading-copy').innerHTML = lectura.parrafos.map((parrafo) => `
    <section class="reading-paragraph">
      <p class="chinese-text" lang="zh-Hans">${renderRubyText(parrafo.chino, lectura)}</p>
    </section>
  `).join('');
  const translation = document.querySelector('#word-translation');

  // Busca una palabra y sitúa su traducción junto al botón pulsado.
  function showTranslation(wordButton) {
    const word = lectura.vocabulario.find((item) => item.chino === wordButton.dataset.vocab);
    if (!word) return;
    translation.innerHTML = `<strong lang="zh-Hans">${word.chino}</strong><span>${word.pinyin}</span><p>${word.espanol}</p>`;
    translation.hidden = false;
    const rect = wordButton.getBoundingClientRect();
    const width = translation.offsetWidth;
    const left = Math.min(window.innerWidth - width - 12, Math.max(12, rect.left + rect.width / 2 - width / 2));
    const placeAbove = rect.top > translation.offsetHeight + 18;
    translation.style.left = `${left}px`;
    translation.style.top = placeAbove
      ? `${rect.top - translation.offsetHeight - 10}px`
      : `${rect.bottom + 10}px`;
  }

  // Muestra la traducción al hacer doble clic en una palabra interactiva.
  detailView.addEventListener('dblclick', (event) => {
    const wordButton = event.target.closest('.interactive-word');
    if (!wordButton) return;
    showTranslation(wordButton);
  });

  // Permite abrir la traducción con Enter o la barra espaciadora.
  detailView.addEventListener('keydown', (event) => {
    const wordButton = event.target.closest('.interactive-word');
    if (!wordButton || !['Enter', ' '].includes(event.key)) return;
    event.preventDefault();
    showTranslation(wordButton);
  });

  // Oculta la traducción al pulsar fuera de ella y de las palabras.
  document.addEventListener('click', (event) => {
    if (translation.hidden || event.target.closest('.interactive-word') || translation.contains(event.target)) return;
    translation.hidden = true;
  });

  // Cierra la traducción con Escape.
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') translation.hidden = true;
  });

  // Permite ampliar, reducir o restablecer el tamaño del texto.
  let fontScale = 1;
  document.querySelector('.font-controls').addEventListener('click', (event) => {
    const button = event.target.closest('button[data-font]');
    if (!button) return;
    if (button.dataset.font === 'increase') fontScale = Math.min(fontScale + 0.1, 1.3);
    if (button.dataset.font === 'decrease') fontScale = Math.max(fontScale - 0.1, 0.8);
    if (button.dataset.font === 'reset') fontScale = 1;
    document.querySelector('.reading-article').style.setProperty('--reading-scale', fontScale);
  });

  // Alterna la visibilidad del pinyin y el estado accesible del botón.
  document.querySelector('#pinyin-toggle').addEventListener('click', (event) => {
    const hidden = detailView.classList.toggle('hide-pinyin');
    event.currentTarget.classList.toggle('is-active', !hidden);
    event.currentTarget.setAttribute('aria-pressed', String(!hidden));
  });
}

// Abre el artículo solicitado o inicia la lista con sus filtros.
if (selectedReading) {
  renderDetail(selectedReading);
} else {
  renderDifficultyFilters();
  renderList();
  // Aplica el filtro pulsado y vuelve a dibujar la lista.
  filters.addEventListener('click', (event) => {
    const button = event.target.closest('.reading-filter');
    if (!button) return;
    state.difficulty = button.dataset.difficulty;
    filters.querySelectorAll('.reading-filter').forEach((item) => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    renderList();
  });
}
