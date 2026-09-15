// Importa las lecturas que se añadirán al catálogo.
import { lecturaCompras } from './lectura-compras.js?v=3';
import { lecturaMedico } from './lectura-medico.js?v=2';
import { lecturaViaje } from './lectura-viaje.js?v=2';
import { lecturaMedioambiente } from './lectura-medioambiente.js?v=2';

// Reúne las lecturas disponibles, empezando por el texto de la clase.
export const lecturas = [
  {
    // Identifica la lectura y define sus títulos, dificultad y resumen.
    id: 'clase',
    serie: '作文一',
    seriePinyin: 'zuòwén yī',
    titulo: '上课',
    tituloPinyin: 'shàng kè',
    tituloEspanol: 'En clase',
    dificultad: 'Fácil',
    categoria: 'Vida escolar',
    resumen: '小明没有写作业。他向老师解释原因，但是老师决定给他的父母打电话。',
    // Relaciona las palabras y expresiones chinas con el pinyin mostrado sobre el texto.
    pinyinTexto: {
      '不知不觉': 'bùzhībùjué',
      '同学们': 'tóngxuémen',
      '数学课': 'shùxué kè',
      '第一题': 'dì yī tí',
      '一会儿': 'yíhuìr',
      '打电话': 'dǎ diànhuà',
      '这件事': 'zhè jiàn shì',
      '老师': 'lǎoshī',
      '早上': 'zǎoshang',
      '今天': 'jīntiān',
      '我们': 'wǒmen',
      '检查': 'jiǎnchá',
      '昨天': 'zuótiān',
      '布置': 'bùzhì',
      '作业': 'zuòyè',
      '小明': 'Xiǎomíng',
      '起来': 'qǐlái',
      '回答': 'huídá',
      '准备': 'zhǔnbèi',
      '时候': 'shíhou',
      '妈妈': 'māma',
      '跑腿': 'pǎotuǐ',
      '回来': 'huílái',
      '以后': 'yǐhòu',
      '休息': 'xiūxi',
      '睡着': 'shuìzháo',
      '不是': 'bú shì',
      '借口': 'jièkǒu',
      '家长': 'jiāzhǎng',
      '过来': 'guòlái',
      '不要': 'bú yào',
      '下次': 'xià cì',
      '不会': 'bú huì',
      '这样': 'zhèyàng',
      '一定': 'yídìng',
      '这么': 'zhème',
      '见见': 'jiànjian',
      '父母': 'fùmǔ',
      '上': 'shàng',
      '好': 'hǎo',
      '来': 'lái',
      '的': 'de',
      '你': 'nǐ',
      '我': 'wǒ',
      '没': 'méi',
      '写': 'xiě',
      '叫': 'jiào',
      '去': 'qù',
      '了': 'le',
      '太': 'tài',
      '累': 'lèi',
      '就': 'jiù',
      '这': 'zhè',
      '会': 'huì',
      '啊': 'a',
      '定': 'dìng',
      '要': 'yào'
    },
    // Almacena los párrafos en chino con su pronunciación y traducción.
    parrafos: [
      {
        chino: '老师：同学们，早上好！今天我们上数学课。',
        pinyin: 'Lǎoshī: Tóngxuémen, zǎoshang hǎo! Jīntiān wǒmen shàng shùxué kè.',
        espanol: 'Profesor: ¡Buenos días, alumnos! Hoy tenemos clase de matemáticas.'
      },
      {
        chino: '同学们：老师，早上好！',
        pinyin: 'Tóngxuémen: Lǎoshī, zǎoshang hǎo!',
        espanol: 'Alumnos: ¡Buenos días, profesor!'
      },
      {
        chino: '老师：我们今天来检查昨天布置的作业。小明，你起来回答第一题。',
        pinyin: 'Lǎoshī: Wǒmen jīntiān lái jiǎnchá zuótiān bùzhì de zuòyè. Xiǎomíng, nǐ qǐlái huídá dì yī tí.',
        espanol: 'Profesor: Hoy vamos a revisar los deberes que mandé ayer. Xiaoming, levántate y responde a la primera pregunta.'
      },
      {
        chino: '小明：老师，我没写作业。昨天准备写作业的时候，我妈妈叫我去跑腿了。回来以后我太累了，休息了一会儿，不知不觉就睡着了。',
        pinyin: 'Xiǎomíng: Lǎoshī, wǒ méi xiě zuòyè. Zuótiān zhǔnbèi xiě zuòyè de shíhou, wǒ māma jiào wǒ qù pǎotuǐ le. Huílái yǐhòu wǒ tài lèi le, xiūxi le yíhuìr, bùzhībùjué jiù shuìzháo le.',
        espanol: 'Xiaoming: Profesor, no hice los deberes. Ayer, cuando iba a hacerlos, mi madre me mandó a hacer un recado. Cuando volví estaba demasiado cansado; descansé un rato y, sin darme cuenta, me quedé dormido.'
      },
      {
        chino: '老师：这不是借口！一会儿我会打电话叫你家长过来。',
        pinyin: 'Lǎoshī: Zhè bú shì jièkǒu! Yíhuìr wǒ huì dǎ diànhuà jiào nǐ jiāzhǎng guòlái.',
        espanol: 'Profesor: ¡Eso no es una excusa! Dentro de un rato llamaré para que venga uno de tus padres.'
      },
      {
        chino: '小明：不要啊，老师！我下次不会这样了，我一定会写作业的！',
        pinyin: 'Xiǎomíng: Bú yào a, lǎoshī! Wǒ xià cì bú huì zhèyàng le, wǒ yídìng huì xiě zuòyè de!',
        espanol: 'Xiaoming: ¡No, profesor! La próxima vez no volverá a pasar. ¡Seguro que haré los deberes!'
      },
      {
        chino: '老师：这件事就这么定了。一会儿我要见见你的父母。',
        pinyin: 'Lǎoshī: Zhè jiàn shì jiù zhème dìng le. Yíhuìr wǒ yào jiànjian nǐ de fùmǔ.',
        espanol: 'Profesor: El asunto queda decidido. Dentro de un rato quiero hablar con tus padres.'
      }
    ],
    // Definir las palabras que permiten consultar una traducción interactiva.
    vocabulario: [
      { chino: '数学课', pinyin: 'shùxué kè', espanol: 'clase de matemáticas' },
      { chino: '检查', pinyin: 'jiǎnchá', espanol: 'revisar / comprobar' },
      { chino: '布置', pinyin: 'bùzhì', espanol: 'asignar / encargar' },
      { chino: '作业', pinyin: 'zuòyè', espanol: 'deberes / tarea' },
      { chino: '跑腿', pinyin: 'pǎotuǐ', espanol: 'hacer un recado' },
      { chino: '不知不觉', pinyin: 'bùzhībùjué', espanol: 'sin darse cuenta' },
      { chino: '睡着', pinyin: 'shuìzháo', espanol: 'quedarse dormido' },
      { chino: '借口', pinyin: 'jièkǒu', espanol: 'excusa' },
      { chino: '家长', pinyin: 'jiāzhǎng', espanol: 'padre, madre o tutor' }
    ]
  },
  // Añade al catálogo los artículos importados de otros archivos.
  lecturaCompras,
  lecturaMedico,
  lecturaViaje,
  lecturaMedioambiente
];

// Busca una lectura por su identificador para abrirla desde la URL.
export function obtenerLectura(id) {
  return lecturas.find((lectura) => lectura.id === id);
}
