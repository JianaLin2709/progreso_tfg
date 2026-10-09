// Exporta los datos de esta unidad para el catálogo HSK.
export const unidad1 = {
  // Indica el nivel, el número y el título de la unidad.
  hsk: 6,
  id: 1,
  titulo: 'Política',
  // Localiza la grabación y el mapa de fragmentos de esta unidad.
  audio: {
    mapa: new URL('../../../audios/hsk6/unidad1/tiempos.json', import.meta.url).href
  },
  // Lista las palabras: hanzi, pinyin y español, con un ejemplo en los tres formatos.
  vocabulario: [
    {
      hanzi: '国家', pinyin: 'guójiā', spanish: 'país / nación',
      example: '每个国家都有自己的法律。', examplePinyin: 'měi ge guójiā dōu yǒu zìjǐ de fǎlǜ.', exampleSpanish: 'Cada país tiene sus propias leyes.'
    },
    {
      hanzi: '政治', pinyin: 'zhèngzhì', spanish: 'política',
      example: '他在大学学习政治。', examplePinyin: 'tā zài dàxué xuéxí zhèngzhì.', exampleSpanish: 'Estudia política en la universidad.'
    },
    {
      hanzi: '政府', pinyin: 'zhèngfǔ', spanish: 'Gobierno',
      example: '政府公布了新的经济计划。', examplePinyin: 'zhèngfǔ gōngbù le xīn de jīngjì jìhuà.', exampleSpanish: 'El Gobierno publicó un nuevo plan económico.'
    },
    {
      hanzi: '政策', pinyin: 'zhèngcè', spanish: 'política / medida gubernamental',
      example: '这项政策将于明年实施。', examplePinyin: 'zhè xiàng zhèngcè jiāng yú míngnián shíshī.', exampleSpanish: 'Esta política se aplicará el próximo año.'
    },
    {
      hanzi: '社会', pinyin: 'shèhuì', spanish: 'sociedad',
      example: '教育对社会发展非常重要。', examplePinyin: 'jiàoyù duì shèhuì fāzhǎn fēicháng zhòngyào.', exampleSpanish: 'La educación es muy importante para el desarrollo social.'
    },
    {
      hanzi: '法律', pinyin: 'fǎlǜ', spanish: 'ley / derecho',
      example: '所有公民都必须遵守法律。', examplePinyin: 'suǒyǒu gōngmín dōu bìxū zūnshǒu fǎlǜ.', exampleSpanish: 'Todos los ciudadanos deben cumplir la ley.'
    },
    {
      hanzi: '制度', pinyin: 'zhìdù', spanish: 'sistema / institución',
      example: '公司建立了严格的管理制度。', examplePinyin: 'gōngsī jiànlì le yángé de guǎnlǐ zhìdù.', exampleSpanish: 'La empresa estableció un sistema de gestión estricto.'
    },
    {
      hanzi: '总统', pinyin: 'zǒngtǒng', spanish: 'presidente',
      example: '总统发表了电视讲话。', examplePinyin: 'zǒngtǒng fābiǎo le diànshì jiǎnghuà.', exampleSpanish: 'El presidente pronunció un discurso televisado.'
    },
    {
      hanzi: '公民', pinyin: 'gōngmín', spanish: 'ciudadano/a',
      example: '公民有权参与公共事务。', examplePinyin: 'gōngmín yǒu quán cānyù gōnggòng shìwù.', exampleSpanish: 'Los ciudadanos tienen derecho a participar en los asuntos públicos.'
    },
    {
      hanzi: '官员', pinyin: 'guānyuán', spanish: 'funcionario/a',
      example: '政府官员回答了记者的问题。', examplePinyin: 'zhèngfǔ guānyuán huídá le jìzhě de wèntí.', exampleSpanish: 'El funcionario respondió a las preguntas de los periodistas.'
    },
    {
      hanzi: '公民', pinyin: 'gōngmín', spanish: 'ciudadano/a',
      example: '保护环境是每个公民的责任。', examplePinyin: 'bǎohù huánjìng shì měi ge gōngmín de zérèn.', exampleSpanish: 'Proteger el medioambiente es responsabilidad de cada ciudadano.'
    },
    {
      hanzi: '部门', pinyin: 'bùmén', spanish: 'departamento',
      example: '这个问题由相关部门负责。', examplePinyin: 'zhè ge wèntí yóu xiāngguān bùmén fùzé.', exampleSpanish: 'El departamento correspondiente se ocupa de este problema.'
    },
    {
      hanzi: '权利', pinyin: 'quánlì', spanish: 'derecho',
      example: '每个人都有表达意见的权利。', examplePinyin: 'měi ge rén dōu yǒu biǎodá yìjiàn de quánlì.', exampleSpanish: 'Todos tienen derecho a expresar su opinión.'
    },
    {
      hanzi: '义务', pinyin: 'yìwù', spanish: 'obligación / deber',
      example: '父母有照顾孩子的义务。', examplePinyin: 'fùmǔ yǒu zhàogù háizi de yìwù.', exampleSpanish: 'Los padres tienen la obligación de cuidar a sus hijos.'
    },
    {
      hanzi: '自由', pinyin: 'zìyóu', spanish: 'libertad',
      example: '人人都应该享有言论自由。', examplePinyin: 'rénrén dōu yīnggāi xiǎngyǒu yánlùn zìyóu.', exampleSpanish: 'Todos deberían disfrutar de libertad de expresión.'
    },
    {
      hanzi: '平等', pinyin: 'píngděng', spanish: 'igualdad',
      example: '法律面前人人平等。', examplePinyin: 'fǎlǜ miànqián rénrén píngděng.', exampleSpanish: 'Todos son iguales ante la ley.'
    },
    {
      hanzi: '公平', pinyin: 'gōngpíng', spanish: 'justo / equidad',
      example: '裁判必须保证比赛公平。', examplePinyin: 'cáipàn bìxū bǎozhèng bǐsài gōngpíng.', exampleSpanish: 'El árbitro debe garantizar que la competición sea justa.'
    },
    {
      hanzi: '利益', pinyin: 'lìyì', spanish: 'interés / beneficio',
      example: '我们要保护消费者的利益。', examplePinyin: 'wǒmen yào bǎohù xiāofèizhě de lìyì.', exampleSpanish: 'Debemos proteger los intereses de los consumidores.'
    },
    {
      hanzi: '和平', pinyin: 'hépíng', spanish: 'paz',
      example: '各国人民都渴望和平。', examplePinyin: 'gè guó rénmín dōu kěwàng hépíng.', exampleSpanish: 'Los pueblos de todos los países desean la paz.'
    },
    {
      hanzi: '战争', pinyin: 'zhànzhēng', spanish: 'guerra',
      example: '战争给人民带来了巨大痛苦。', examplePinyin: 'zhànzhēng gěi rénmín dài lái le jùdà tòngkǔ.', exampleSpanish: 'La guerra causó un enorme sufrimiento a la población.'
    },
    {
      hanzi: '冲突', pinyin: 'chōngtū', spanish: 'conflicto',
      example: '双方希望通过谈判解决冲突。', examplePinyin: 'shuāngfāng xīwàng tōngguò tánpàn jiějué chōngtū.', exampleSpanish: 'Ambas partes esperan resolver el conflicto mediante negociaciones.'
    },
    {
      hanzi: '外交', pinyin: 'wàijiāo', spanish: 'diplomacia',
      example: '两国建立了正式外交关系。', examplePinyin: 'liǎng guó jiànlì le zhèngshì wàijiāo guānxì.', exampleSpanish: 'Los dos países establecieron relaciones diplomáticas formales.'
    },
    {
      hanzi: '协议', pinyin: 'xiéyì', spanish: 'acuerdo',
      example: '双方终于达成了协议。', examplePinyin: 'shuāngfāng zhōngyú dáchéng le xiéyì.', exampleSpanish: 'Las dos partes finalmente alcanzaron un acuerdo.'
    },
    {
      hanzi: '关系', pinyin: 'guānxì', spanish: 'relación',
      example: '两国之间的关系正在改善。', examplePinyin: 'liǎng guó zhījiān de guānxì zhèngzài gǎishàn.', exampleSpanish: 'Las relaciones entre los dos países están mejorando.'
    },
    {
      hanzi: '措施', pinyin: 'cuòshī', spanish: 'medida',
      example: '政府采取了紧急措施。', examplePinyin: 'zhèngfǔ cǎiqǔ le jǐnjí cuòshī.', exampleSpanish: 'El Gobierno adoptó medidas de emergencia.'
    }
  ]
};
