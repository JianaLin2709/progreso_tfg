// Define las preguntas: original, idioma, traducción, validez y corrección del error.
const sets = {
  easy: [
    ['我喜欢喝茶。','zh',['Me','gusta','beber','té.'],true],
    ['他是老师。','zh',['Él','es','médico.'],false,2,'profesor.'],
    ['Vivo en Madrid.','es',['我','住在','马德里','。'],true],
    ['Ella come arroz.','es',['她','喝','米饭','。'],false,1,'吃'],
    ['今天很冷。','zh',['Hoy','hace','mucho','frío.'],true],
    ['Mañana vamos a la escuela.','es',['昨天','我们','去','学校','。'],false,0,'明天'],
    ['我的妈妈是医生。','zh',['Mi','madre','es','médica.'],true],
    ['Quiero comprar una manzana.','es',['我','想','买','一个','香蕉','。'],false,4,'苹果'],
    ['猫在桌子下面。','zh',['El','gato','está','debajo','de','la','mesa.'],true],
    ['Él bebe agua.','es',['他','喝','茶','。'],false,2,'水']
  ],
  medium: [
    ['我正在学习中文。','zh',['Estoy','estudiando','chino.'],true],
    ['他已经吃过午饭了。','zh',['Él','todavía','ha','comido.'],false,1,'ya'],
    ['Puede que mañana llueva.','es',['明天','可能','会','下雨','。'],true],
    ['妹妹比我起得早。','zh',['Mi','hermana','se','levanta','más','tarde','que','yo.'],false,5,'temprano'],
    ['请把门关上。','zh',['Por','favor,','cierra','la','puerta.'],true],
    ['Este libro me lo regaló un amigo.','es',['这本书','是','老师','送给','我的','。'],false,2,'朋友'],
    ['虽然很累，但是她没有休息。','zh',['Aunque','estaba','cansada,','no','descansó.'],true],
    ['Vamos al museo en metro.','es',['我们','坐地铁','去','医院','。'],false,3,'博物馆'],
    ['他一边听音乐一边写作业。','zh',['Hace','los','deberes','mientras','escucha','música.'],true],
    ['¿Cuántas veces has estado en Pekín?','es',['你','去过','上海','几次','？'],false,2,'北京']
  ],
  hard: [
    ['如果明天不下雨，我们就去爬山。','zh',['Si','mañana','no','llueve,','iremos','a','la','montaña.'],true],
    ['我把书放在桌子上了。','zh',['Puse','el','libro','debajo','de','la','mesa.'],false,3,'encima'],
    ['Su hermano menor le rompió el móvil.','es',['他的手机','被','弟弟','弄坏了','。'],true],
    ['除了中文以外，她还会说法语。','zh',['Además','de','chino,','también','habla','inglés.'],false,5,'francés.'],
    ['因为路上堵车，所以他迟到了。','zh',['Llegó','tarde','porque','había','atasco.'],true],
    ['Este asunto no es tan sencillo como imaginas.','es',['这件事情','没有','你想象得','那么','复杂','。'],false,4,'简单'],
    ['无论遇到什么困难，都不要放弃。','zh',['No','abandones','sin','importar','qué','dificultad','encuentres.'],true],
    ['El profesor nos pidió entregar la tarea antes de clase.','es',['老师','让我们','下课以后','交','作业','。'],false,2,'下课以前'],
    ['只有认真练习，才能提高口语水平。','zh',['Solo','practicando','seriamente','se','mejora','la','expresión','oral.'],true],
    ['Después de cenar salimos a pasear.','es',['吃完','早饭','以后','我们','出去','散步','。'],false,1,'晚饭']
  ],
  expert: [
    ['随着科技的发展，人们的生活发生了巨大变化。','zh',['Con','el','desarrollo','tecnológico,','la','vida','ha','cambiado','enormemente.'],true],
    ['尽管方案存在问题，我们仍然决定继续实施。','zh',['Aunque','el','plan','tiene','ventajas,','decidimos','seguir','aplicándolo.'],false,4,'problemas,'],
    ['En vez de quejarse, es mejor buscar una solución.','es',['与其','抱怨','不如','想办法','解决问题','。'],true],
    ['他之所以成功，是因为从未放弃努力。','zh',['Tuvo','éxito','porque','siempre','dejó','de','esforzarse.'],false,4,'nunca'],
    ['这篇文章不仅观点明确，而且论据充分。','zh',['El','artículo','tiene','ideas','claras','y','argumentos','suficientes.'],true],
    ['Debemos evitar nuestra responsabilidad.','es',['我们','应该','承担','自己的责任','。'],false,2,'逃避'],
    ['经过反复讨论，委员会通过了提议。','zh',['Tras','debatirlo','repetidamente,','el','comité','aprobó','la','propuesta.'],true],
    ['Este fenómeno no refleja ningún cambio social.','es',['这种现象','反映了','社会的变化','。'],false,1,'没有反映'],
    ['如果忽视实际情况，再好的计划也无法实现。','zh',['Si','se','ignora','la','realidad,','ni','el','mejor','plan','podrá','realizarse.'],true],
    ['Solo después de entender el problema se puede juzgar.','es',['只有','充分了解问题以后','才能','作出','错误判断','。'],false,4,'合理判断']
  ]
};

// Relaciona cada dificultad con su nombre visible.
const labels={easy:'Fácil',medium:'Medio',hard:'Difícil',expert:'Experto'};
// Elige la dificultad de la URL o de la preferencia guardada.
const param=new URLSearchParams(location.search).get('dificultad');
const difficulty=Object.hasOwn(sets,param)?param:Object.hasOwn(sets,localStorage.getItem('exercise-difficulty'))?localStorage.getItem('exercise-difficulty'):'easy';
// Convierte los datos de cada pregunta en propiedades con nombre.
const questions=sets[difficulty].map(([original,from,words,valid,wrongIndex,replacement])=>({original,from,words,valid,wrongIndex,replacement}));
// Localiza los textos, las opciones y los indicadores del ejercicio.
const el={card:document.querySelector('#question-card'),original:document.querySelector('#original-text'),originalLabel:document.querySelector('#original-label'),translationLabel:document.querySelector('#translation-label'),words:document.querySelector('#translation-words'),decisions:document.querySelector('#decision-buttons'),correction:document.querySelector('#correction-prompt'),feedback:document.querySelector('#feedback'),next:document.querySelector('#next-button'),dots:document.querySelector('#question-dots'),score:document.querySelector('#score'),difficulty:document.querySelector('#difficulty-label'),completion:document.querySelector('#completion'),finalScore:document.querySelector('#final-score'),restart:document.querySelector('#restart-button')};
// Mantiene la pregunta, los puntos y la fase de decisión o corrección.
const state={index:0,score:0,statuses:Array(questions.length).fill(null),phase:'decision',resolved:false};

// Dibuja los indicadores de pregunta actual y de resultados.
function renderDots(){el.dots.innerHTML=questions.map((_,i)=>`<span class="question-dot${i===state.index&&!state.resolved?' is-active':''}${state.statuses[i]==='success'?' is-success':''}${state.statuses[i]==='error'?' is-error':''}">${state.statuses[i]==='success'?'✓':i+1}</span>`).join('');}
// Presenta una pregunta nueva y prepara los botones para decidir si es correcta.
function renderQuestion(){const q=questions[state.index];state.phase='decision';state.resolved=false;el.original.textContent=q.original;el.original.lang=q.from==='zh'?'zh-Hans':'es';el.originalLabel.textContent=`Frase original · ${q.from==='zh'?'Chino':'Español'}`;el.translationLabel.textContent=`Traducción · ${q.from==='zh'?'Español':'Chino'}`;el.words.lang=q.from==='zh'?'es':'zh-Hans';el.words.innerHTML=q.words.map((w,i)=>`<button class="translation-word" type="button" data-index="${i}" disabled>${w}</button>`).join('');el.decisions.hidden=false;el.correction.hidden=true;el.feedback.textContent='';el.next.hidden=true;renderDots();}
// Cierra la pregunta, suma puntos si hay acierto y permite continuar.
function resolve(success,message){state.resolved=true;state.statuses[state.index]=success?'success':'error';if(success){state.score+=10;el.score.textContent=state.score;}el.feedback.textContent=message;el.decisions.hidden=true;el.correction.hidden=true;el.words.querySelectorAll('button').forEach(b=>b.disabled=true);el.next.hidden=false;renderDots();}
// Evalúa la decisión inicial o pide localizar la palabra equivocada.
el.decisions.addEventListener('click',e=>{const b=e.target.closest('[data-answer]');if(!b)return;const q=questions[state.index];if(b.dataset.answer==='correct'){q.valid?resolve(true,'¡Correcto! La traducción expresa el mismo significado.'):resolve(false,`No es correcta: “${q.words[q.wrongIndex]}” debería ser “${q.replacement}”.`);return;}if(q.valid){resolve(false,'En realidad, la traducción es completamente correcta.');return;}state.phase='correction';el.decisions.hidden=true;el.correction.hidden=false;el.feedback.textContent='Ahora selecciona la palabra equivocada.';el.words.querySelectorAll('button').forEach(x=>{x.disabled=false;x.classList.add('selectable')});});
// Comprueba la palabra elegida y muestra su sustitución cuando se acierta.
el.words.addEventListener('click',e=>{if(state.phase!=='correction'||state.resolved)return;const b=e.target.closest('.translation-word');if(!b)return;const q=questions[state.index],index=Number(b.dataset.index);if(index===q.wrongIndex){b.classList.add('correct-choice');resolve(true,`¡Correcto! “${q.words[index]}” debería ser “${q.replacement}”.`);}else{b.classList.remove('wrong-choice');void b.offsetWidth;b.classList.add('wrong-choice');el.feedback.textContent='Esa palabra es correcta. Busca otra.';}});
// Avanza a la siguiente pregunta o muestra la puntuación final.
el.next.addEventListener('click',()=>{if(state.index===questions.length-1){el.card.hidden=true;el.dots.hidden=true;el.completion.hidden=false;el.finalScore.textContent=state.score;return;}state.index++;renderQuestion();});
// Reinicia las preguntas, los puntos y los resultados.
el.restart.addEventListener('click',()=>{state.index=0;state.score=0;state.statuses.fill(null);el.score.textContent='0';el.completion.hidden=true;el.card.hidden=false;el.dots.hidden=false;renderQuestion();});
// Muestra la dificultad e inicia la primera pregunta.
el.difficulty.textContent=labels[difficulty];el.difficulty.dataset.difficulty=difficulty;renderQuestion();
