// Localiza la escena, los indicadores, las pistas y el diálogo de respuesta.
const feedback = document.querySelector('#answer-feedback');
const hintButton = document.querySelector('#hint-button');
const hintMessage = document.querySelector('#hint-message');
const successCard = document.querySelector('#success-card');
const successAction = document.querySelector('#success-action');
const sceneCard = document.querySelector('#scene-card');
const sceneImage = document.querySelector('#scene-image');
const sceneInstruction = document.querySelector('#scene-instruction');
const hotspotLayer = document.querySelector('#hotspot-layer');
const foundSlots = [...document.querySelectorAll('#found-slots > div')];
const foundCount = document.querySelector('#found-count');
const progressText = document.querySelector('#scene-progress-text');
const progressBar = document.querySelector('#scene-progress-bar');
const dialog = document.querySelector('#object-dialog');
const objectForm = document.querySelector('#object-form');
const objectAnswer = document.querySelector('#object-answer');
const dialogFeedback = document.querySelector('#dialog-feedback');
const dialogClose = document.querySelector('#dialog-close');
const dialogCancel = document.querySelector('#dialog-cancel');

// Define cada escena y sus objetos: respuestas admitidas y caja en porcentajes.
const scenes = [
  {
    image: '../img/escena-dormitorio.png',
    alt: 'Dormitorio con cama, gato, escritorio, libros, plantas y otros objetos',
    instruction: 'Observa el dormitorio y elige un objeto.',
    hint: 'Los pequeños círculos rosas son interactivos. Prueba con los muebles, el gato o los objetos del escritorio.',
    hotspots: [
      { id: 'bed', answers: ['床', '一张床'], box: [2, 36, 54, 46] },
      { id: 'cat', answers: ['猫', '小猫', '一只猫'], box: [20, 48, 25, 16] },
      { id: 'desk', answers: ['书桌', '桌子', '桌', '一张桌子'], box: [43, 42, 45, 29] },
      { id: 'chair', answers: ['椅子', '座椅', '一把椅子'], box: [62, 51, 18, 38] },
      { id: 'computer', answers: ['电脑', '笔记本电脑', '手提电脑', '一台电脑'], box: [52, 35, 18, 16] },
      { id: 'books', answers: ['书', '书本', '书籍', '一本书'], box: [44, 39, 10, 10] },
      { id: 'lamp', answers: ['台灯', '灯', '一盏灯', '一盏台灯'], box: [72, 29, 11, 21] },
      { id: 'window', answers: ['窗户', '窗', '一扇窗户'], box: [49, 1, 23, 33] },
      { id: 'plant', answers: ['植物', '盆栽', '花盆', '一盆花'], box: [27, 1, 13, 34] },
      { id: 'bookcase', answers: ['书架', '书柜'], box: [84, 22, 16, 54] },
      { id: 'rug', answers: ['地毯'], box: [46, 78, 39, 21] },
      { id: 'slippers', answers: ['拖鞋', '兔子拖鞋'], box: [80, 72, 19, 17] },
      { id: 'floor-plant', answers: ['植物', '盆栽', '花盆', '一盆花'], box: [0, 55, 17, 43] },
      { id: 'picture', answers: ['画', '图画', '图片', '一幅画'], box: [2, 3, 22, 27] }
    ]
  },
  {
    image: '../img/escena-cocina.png',
    alt: 'Cocina con mesa, cubiertos, tazas, platos, frigorífico, horno y delantal',
    instruction: 'Observa la cocina y elige un objeto.',
    hint: 'Las zonas con un pequeño círculo rosa son interactivas. Prueba con los cubiertos, los electrodomésticos o la vajilla.',
    hotspots: [
      { id: 'fork', answers: ['叉子', '餐叉'], box: [47, 67, 7, 15] },
      { id: 'knife', answers: ['刀', '刀子', '餐刀'], box: [52, 68, 7, 14] },
      { id: 'spoon', answers: ['勺子', '汤匙'], box: [57, 68, 7, 14] },
      { id: 'cups', answers: ['杯子', '水杯', '茶杯'], box: [54, 63, 15, 13] },
      { id: 'plates', answers: ['盘子', '碟子'], box: [79, 32, 12, 14] },
      { id: 'fridge', answers: ['冰箱', '电冰箱'], box: [0, 1, 19, 67] },
      { id: 'oven', answers: ['烤箱'], box: [29, 43, 23, 20] },
      { id: 'apron', answers: ['围裙'], box: [92, 20, 8, 48] },
      { id: 'seasoning', answers: ['调味料', '调料'], box: [20, 34, 7, 11] },
      { id: 'table', answers: ['桌子', '餐桌'], box: [10, 65, 64, 34] },
      { id: 'bowl', answers: ['碗'], box: [24, 60, 16, 13] },
      { id: 'kettle', answers: ['水壶', '茶壶'], box: [38, 31, 11, 13] },
      { id: 'pan', answers: ['锅', '平底锅'], box: [37, 23, 8, 15] },
      { id: 'sink', answers: ['水槽', '洗碗池'], box: [63, 34, 16, 13] },
      { id: 'faucet', answers: ['水龙头'], box: [68, 30, 7, 14] },
      { id: 'window', answers: ['窗户', '窗'], box: [55, 1, 31, 32] },
      { id: 'flowers', answers: ['花', '鲜花', '花瓶'], box: [44, 47, 15, 24] },
      { id: 'cat', answers: ['猫', '小猫'], box: [78, 66, 20, 17] },
      { id: 'fruit', answers: ['水果', '香蕉', '橙子', '葡萄', '苹果'], box: [24, 56, 17, 15] },
      { id: 'cookies', answers: ['饼干'], box: [38, 65, 11, 8] }
    ]
  }
];

// Mantiene la escena actual, el objeto seleccionado y los objetos encontrados.
let sceneIndex = 0;
let selectedHotspot = null;
let foundObjects = new Map();

// Unifica el texto e ignora espacios y puntuación al comparar respuestas.
function normalize(value) {
  return value.normalize('NFKC').toLowerCase().replace(/[\s，。！？、,.!?;；:：'"“”‘’]/g, '');
}

// Acepta respuestas no vacías que coincidan con alguna variante del objeto.
function answerMatches(hotspot, value) {
  const normalized = normalize(value);
  return Boolean(normalized) && hotspot.answers.some((answer) => normalize(answer) === normalized);
}

// Crea un botón en el centro de la caja de cada objeto interactivo.
function renderHotspots() {
  const scene = scenes[sceneIndex];
  hotspotLayer.replaceChildren(...scene.hotspots.map((hotspot, index) => {
    const button = document.createElement('button');
    const [left, top, width, height] = hotspot.box;
    button.type = 'button';
    button.className = 'object-hotspot';
    button.dataset.objectId = hotspot.id;
    button.style.left = `${left + (width / 2)}%`;
    button.style.top = `${top + (height / 2)}%`;
    button.setAttribute('aria-label', `Objeto interactivo ${index + 1}`);
    return button;
  }));
}

// Muestra los objetos encontrados y actualiza su contador.
function renderFoundObjects() {
  const answers = [...foundObjects.values()];
  foundSlots.forEach((slot, index) => {
    const value = answers[index];
    slot.classList.toggle('is-found', Boolean(value));
    slot.querySelector('strong').textContent = value || 'Sin descubrir';
  });
  foundCount.textContent = answers.length;
}

// Abre el diálogo para responder sobre un objeto todavía pendiente.
function openObjectDialog(hotspot) {
  if (foundObjects.has(hotspot.id) || foundObjects.size >= 3) return;
  selectedHotspot = hotspot;
  objectAnswer.value = '';
  objectAnswer.classList.remove('is-wrong');
  dialogFeedback.textContent = '';
  if (typeof dialog.showModal === 'function') dialog.showModal();
  else dialog.setAttribute('open', '');
  requestAnimationFrame(() => objectAnswer.focus());
}

// Cierra el diálogo y elimina la selección del objeto.
function closeObjectDialog() {
  if (typeof dialog.close === 'function') dialog.close();
  else dialog.removeAttribute('open');
  selectedHotspot = null;
}

// Al encontrar tres objetos, guarda la finalización y muestra cómo continuar.
function completeSceneIfReady() {
  if (foundObjects.size !== 3) return;
  feedback.textContent = '¡Perfecto! Has identificado tres objetos distintos.';
  feedback.classList.add('is-success');
  successCard.hidden = false;
  hotspotLayer.querySelectorAll('.object-hotspot').forEach((hotspot) => { hotspot.disabled = true; });
  successCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Carga una escena y reinicia sus respuestas, pistas e indicadores.
function loadScene(index) {
  sceneIndex = index;
  selectedHotspot = null;
  foundObjects = new Map();
  const scene = scenes[index];
  sceneImage.src = scene.image;
  sceneImage.alt = scene.alt;
  sceneInstruction.textContent = scene.instruction;
  hintMessage.textContent = scene.hint;
  hintMessage.hidden = true;
  hintButton.setAttribute('aria-expanded', 'false');
  sceneCard.classList.remove('show-hotspots');
  progressText.textContent = `${index + 1} / ${scenes.length}`;
  progressBar.style.width = `${((index + 1) / scenes.length) * 100}%`;
  successCard.hidden = true;
  successAction.textContent = index === scenes.length - 1 ? 'Volver a ejercicios →' : 'Siguiente imagen →';
  feedback.textContent = 'Pulsa sobre cualquier objeto marcado para empezar.';
  feedback.classList.remove('is-success');
  renderHotspots();
  renderFoundObjects();
}

// Identifica el objeto pulsado y abre su diálogo.
hotspotLayer.addEventListener('click', (event) => {
  const button = event.target.closest('.object-hotspot');
  if (!button) return;
  const hotspot = scenes[sceneIndex].hotspots.find((item) => item.id === button.dataset.objectId);
  if (hotspot) openObjectDialog(hotspot);
});

// Comprueba la respuesta del formulario sin recargar la página.
objectForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!selectedHotspot) return;
  if (!answerMatches(selectedHotspot, objectAnswer.value)) {
    objectAnswer.classList.add('is-wrong');
    objectAnswer.setAttribute('aria-invalid', 'true');
    dialogFeedback.textContent = 'Todavía no es correcto. Inténtalo otra vez.';
    return;
  }

  // Registra el acierto, desactiva el objeto y comprueba si termina la escena.
  const acceptedAnswer = objectAnswer.value.trim();
  foundObjects.set(selectedHotspot.id, acceptedAnswer);
  const hotspotButton = hotspotLayer.querySelector(`[data-object-id="${selectedHotspot.id}"]`);
  hotspotButton?.classList.add('is-found');
  if (hotspotButton) hotspotButton.disabled = true;
  closeObjectDialog();
  renderFoundObjects();
  feedback.textContent = `¡Correcto! Te faltan ${3 - foundObjects.size} objetos.`;
  feedback.classList.add('is-success');
  completeSceneIfReady();
});

// Retira el aviso de error cuando el usuario vuelve a escribir.
objectAnswer.addEventListener('input', () => {
  objectAnswer.classList.remove('is-wrong');
  objectAnswer.removeAttribute('aria-invalid');
  dialogFeedback.textContent = '';
});

// Conecta los controles para cerrar o cancelar el diálogo.
[dialogClose, dialogCancel].forEach((button) => button.addEventListener('click', closeObjectDialog));
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) closeObjectDialog();
});
dialog.addEventListener('close', () => { selectedHotspot = null; });

// Pasa a la siguiente imagen o regresa a la lista de ejercicios.
successAction.addEventListener('click', () => {
  if (sceneIndex < scenes.length - 1) {
    loadScene(sceneIndex + 1);
    document.querySelector('.observation-header').scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    window.location.href = 'ejercicios.html?v=19';
  }
});

// Muestra u oculta la pista y resalta los objetos interactivos.
hintButton.addEventListener('click', () => {
  const show = hintMessage.hidden;
  hintMessage.hidden = !show;
  sceneCard.classList.toggle('show-hotspots', show);
  hintButton.setAttribute('aria-expanded', String(show));
});

// Carga la primera escena al abrir el ejercicio.
loadScene(0);
