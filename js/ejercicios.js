// Localiza la lista de ejercicios y el aviso de lista vacía.
const grid = document.querySelector('#exercise-grid');
const emptyState = document.querySelector('#exercise-empty');

// Define las tarjetas, su orden, duración y enlace; algunas aún no tienen página.
const exercises = [
  { id: 9, category: 'vocabulario', title: 'Observa y escribe', description: 'Observa una imagen y escribe tres elementos en chino.', image: '../img/ejercicio-observa-escribe.png', minutes: 5, duration: '5 min', order: 14, path: 'observa-escribe.html?v=1' },
  { id: 1, category: 'vocabulario', title: 'Traducción correcta', description: 'Decide si la traducción es correcta y encuentra la palabra equivocada.', image: '../img/ejercicio-traduccion.png', minutes: 5, duration: '5 min', order: 10, path: 'traduccion-correcta.html?v=2' },
  { id: 2, category: 'memoria', title: 'Memoria visual', description: 'Empareja cada hanzi con su traducción española.', image: '../img/ejercicio-memoria.png', minutes: 5, duration: '5 min', order: 13, path: 'memoria-visual.html?v=2' },
  { id: 3, category: 'gramatica', title: 'Ordena la frase', description: 'Coloca las palabras en orden para construir una frase correcta.', image: '../img/ejercicio-ordenar.png', minutes: 4, duration: '3–5 min', order: 9, path: 'ordenar-frases.html?v=4' },
  { id: 4, category: 'escucha', title: 'Escucha y escribe', description: 'Reproduce una frase en chino y escribe exactamente lo que oyes.', image: '../img/ejercicio-escucha.png', minutes: 7, duration: '5–10 min', order: 11, path: 'escucha-escribe.html?v=2' },
  { id: 6, category: 'vocabulario', title: 'Quiz rápidos', description: 'Elige traducciones de distintos HSK según la dificultad seleccionada.', image: '../img/ejercicio-quiz.png', minutes: 6, duration: '5–8 min', order: 12 },
  { id: 8, category: 'escucha', title: 'Diálogo cotidiano', description: 'Escucha una conversación breve y responde las preguntas.', image: '../img/ejercicio-dialogo.png', minutes: 10, duration: '10 min', order: 8 }
];

// Mantiene la dificultad seleccionada para los enlaces de ejercicios.
const state = {
  difficulty: getInitialDifficulty()
};

// Recupera una dificultad válida del navegador o utiliza la fácil.
function getInitialDifficulty() {
  const saved = localStorage.getItem('exercise-difficulty');
  return ['easy', 'medium', 'hard', 'expert'].includes(saved) ? saved : 'easy';
}
// Ordena las tarjetas y genera sus enlaces o el botón de próximamente.
function renderExercises() {
  const visible = exercises
    .sort((a, b) => b.order - a.order);

  grid.innerHTML = visible.map((exercise) => `
    <article class="exercise-card" data-category="${exercise.category}">
      <div class="exercise-card-main">
        <div class="exercise-card-icon" aria-hidden="true"><img src="${exercise.image}" alt=""></div>
        <div>
          <h3>${exercise.title}</h3>
          <p>${exercise.description}</p>
          <span class="category-tag">${exercise.category}</span>
        </div>
      </div>
      <div class="exercise-card-footer">
        <span class="exercise-time">${exercise.duration}</span>
        ${exercise.path
          ? `<a class="start-button" href="${exercise.path}&dificultad=${state.difficulty}" aria-label="Comenzar ${exercise.title}">Comenzar</a>`
          : '<button class="start-button unavailable" type="button" disabled>Próximamente</button>'}
      </div>
    </article>
  `).join('');

  emptyState.hidden = visible.length > 0;
}

// Marca la dificultad activa y guarda los cambios que elija el usuario.
document.querySelectorAll('.difficulty-card').forEach((card) => {
  const selected = card.dataset.difficulty === state.difficulty;
  card.classList.toggle('is-selected', selected);
  card.setAttribute('aria-pressed', String(selected));

  card.addEventListener('click', () => {
    state.difficulty = card.dataset.difficulty;
    localStorage.setItem('exercise-difficulty', state.difficulty);
    document.querySelectorAll('.difficulty-card').forEach((item) => {
      const isSelected = item === card;
      item.classList.toggle('is-selected', isSelected);
      item.setAttribute('aria-pressed', String(isSelected));
    });
    renderExercises();
  });
});

// Dibuja la lista inicial de ejercicios.
renderExercises();
