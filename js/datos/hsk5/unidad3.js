// Exporta los datos de esta unidad para el catálogo HSK.
export const unidad3 = {
  // Indica el nivel, el número y el título de la unidad.
  hsk: 5,
  id: 3,
  titulo: 'Descripción',
  // Localiza la grabación y el mapa de fragmentos de esta unidad.
  audio: {
    mapa: new URL('../../../audios/hsk5/unidad3/tiempos.json', import.meta.url).href
  },
  // Lista las palabras: hanzi, pinyin y español, con un ejemplo en los tres formatos.
  vocabulario: [
    {
      hanzi: '合理', pinyin: 'hélǐ', spanish: 'razonable',
      example: '这个安排很合理。', examplePinyin: 'zhè ge ānpái hěn hélǐ.', exampleSpanish: 'Esta organización es razonable.'
    },
    {
      hanzi: '具体', pinyin: 'jùtǐ', spanish: 'concreto / específico',
      example: '请告诉我具体的时间和地点。', examplePinyin: 'qǐng gàosu wǒ jùtǐ de shíjiān hé dìdiǎn.', exampleSpanish: 'Dime la hora y el lugar concretos, por favor.'
    },
    {
      hanzi: '明显', pinyin: 'míngxiǎn', spanish: 'evidente / notable',
      example: '他的汉语有了明显的进步。', examplePinyin: 'tā de Hànyǔ yǒu le míngxiǎn de jìnbù.', exampleSpanish: 'Su chino ha mejorado notablemente.'
    },
    {
      hanzi: '复杂', pinyin: 'fùzá', spanish: 'complejo',
      example: '这个问题比想象中复杂。', examplePinyin: 'zhè ge wèntí bǐ xiǎngxiàng zhōng fùzá.', exampleSpanish: 'Este problema es más complejo de lo que imaginábamos.'
    },
    {
      hanzi: '简单', pinyin: 'jiǎndān', spanish: 'sencillo',
      example: '这个操作非常简单。', examplePinyin: 'zhè ge cāozuò fēicháng jiǎndān.', exampleSpanish: 'Esta operación es muy sencilla.'
    },
    {
      hanzi: '严重', pinyin: 'yánzhòng', spanish: 'grave',
      example: '空气污染越来越严重。', examplePinyin: 'kōngqì wūrǎn yuèláiyuè yánzhòng.', exampleSpanish: 'La contaminación del aire es cada vez más grave.'
    },
    {
      hanzi: '丰富', pinyin: 'fēngfù', spanish: 'rico / abundante',
      example: '这本书的内容很丰富。', examplePinyin: 'zhè běn shū de nèiróng hěn fēngfù.', exampleSpanish: 'El contenido de este libro es muy variado.'
    },
    {
      hanzi: '独立', pinyin: 'dúlì', spanish: 'independiente',
      example: '她十八岁以后开始独立生活。', examplePinyin: 'tā shíbā suì yǐhòu kāishǐ dúlì shēnghuó.', exampleSpanish: 'Empezó a vivir de forma independiente después de los dieciocho años.'
    },
    {
      hanzi: '积极', pinyin: 'jījí', spanish: 'positivo / activo',
      example: '他积极参加学校的活动。', examplePinyin: 'tā jījí cānjiā xuéxiào de huódòng.', exampleSpanish: 'Participa activamente en las actividades escolares.'
    },
    {
      hanzi: '消极', pinyin: 'xiāojí', spanish: 'negativo / pasivo',
      example: '失败以后不要太消极。', examplePinyin: 'shībài yǐhòu bú yào tài xiāojí.', exampleSpanish: 'No seas demasiado negativo después de un fracaso.'
    },
    {
      hanzi: '直接', pinyin: 'zhíjiē', spanish: 'directo',
      example: '有问题可以直接问老师。', examplePinyin: 'yǒu wèntí kěyǐ zhíjiē wèn lǎoshī.', exampleSpanish: 'Si tienes dudas, puedes preguntar directamente al profesor.'
    },
    {
      hanzi: '易懂', pinyin: 'yìdǒng', spanish: 'fácil de entender',
      example: '这篇说明写得简单易懂。', examplePinyin: 'zhè piān shuōmíng xiě de jiǎndān yìdǒng.', exampleSpanish: 'Estas instrucciones están escritas de forma sencilla y comprensible.'
    },
    {
      hanzi: '重要', pinyin: 'zhòngyào', spanish: 'importante',
      example: '健康比金钱更重要。', examplePinyin: 'jiànkāng bǐ jīnqián gèng zhòngyào.', exampleSpanish: 'La salud es más importante que el dinero.'
    },
    {
      hanzi: '实际', pinyin: 'shíjì', spanish: 'real / práctico',
      example: '实际情况和计划不太一样。', examplePinyin: 'shíjì qíngkuàng hé jìhuà bú tài yíyàng.', exampleSpanish: 'La situación real no coincide demasiado con el plan.'
    },
    {
      hanzi: '全面', pinyin: 'quánmiàn', spanish: 'completo / integral',
      example: '报告全面分析了这个问题。', examplePinyin: 'bàogào quánmiàn fēnxī le zhè ge wèntí.', exampleSpanish: 'El informe analizó el problema de manera exhaustiva.'
    },
    {
      hanzi: '准确', pinyin: 'zhǔnquè', spanish: 'exacto / preciso',
      example: '这些数据不够准确。', examplePinyin: 'zhèxiē shùjù bú gòu zhǔnquè.', exampleSpanish: 'Estos datos no son suficientemente precisos.'
    },
    {
      hanzi: '清楚', pinyin: 'qīngchu', spanish: 'claro',
      example: '老师讲得非常清楚。', examplePinyin: 'lǎoshī jiǎng de fēicháng qīngchu.', exampleSpanish: 'El profesor lo explicó con mucha claridad.'
    },
    {
      hanzi: '特殊', pinyin: 'tèshū', spanish: 'especial',
      example: '这种材料有特殊的用途。', examplePinyin: 'zhè zhǒng cáiliào yǒu tèshū de yòngtú.', exampleSpanish: 'Este material tiene un uso especial.'
    },
    {
      hanzi: '有效', pinyin: 'yǒuxiào', spanish: 'eficaz / válido',
      example: '这个方法十分有效。', examplePinyin: 'zhè ge fāngfǎ shífēn yǒuxiào.', exampleSpanish: 'Este método es muy eficaz.'
    },
    {
      hanzi: '无效', pinyin: 'wúxiào', spanish: 'ineficaz / inválido',
      example: '过期的合同已经无效。', examplePinyin: 'guòqī de hétong yǐjīng wúxiào.', exampleSpanish: 'El contrato caducado ya no es válido.'
    },
    {
      hanzi: '有限', pinyin: 'yǒuxiàn', spanish: 'limitado',
      example: '我们的时间非常有限。', examplePinyin: 'wǒmen de shíjiān fēicháng yǒuxiàn.', exampleSpanish: 'Nuestro tiempo es muy limitado.'
    },
    {
      hanzi: '充分', pinyin: 'chōngfèn', spanish: 'suficiente / pleno',
      example: '出发前要做好充分准备。', examplePinyin: 'chūfā qián yào zuò hǎo chōngfèn zhǔnbèi.', exampleSpanish: 'Hay que prepararse bien antes de salir.'
    },
    {
      hanzi: '危险', pinyin: 'wēixiǎn', spanish: 'peligroso / peligro',
      example: '在结冰的河上走很危险。', examplePinyin: 'zài jiébīng de hé shàng zǒu hěn wēixiǎn.', exampleSpanish: 'Caminar sobre un río helado es peligroso.'
    },
    {
      hanzi: '安全', pinyin: 'ānquán', spanish: 'seguro / seguridad',
      example: '晚上独自回家要注意安全。', examplePinyin: 'wǎnshang dúzì huí jiā yào zhùyì ānquán.', exampleSpanish: 'Al volver solo a casa por la noche debes cuidar tu seguridad.'
    }
  ]
};
