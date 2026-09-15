// Exporta los datos de esta unidad para el catálogo HSK.
export const unidad6 = {
  // Indica el nivel, el número y el título de la unidad.
  hsk: 1,
  id: 6,
  titulo: 'Verbos I',
  // Localiza el mapa de tiempos de las grabaciones tomando este archivo como base.
  audio: {
    mapa: new URL('../../../audios/hsk1/unidad6/tiempos.json', import.meta.url).href
  },
  // Lista las palabras: hanzi, pinyin y español, con un ejemplo en los tres formatos.
  vocabulario: [
    {
      hanzi: '是', pinyin: 'shì', spanish: 'ser',
      example: '她是我的老师。', examplePinyin: 'tā shì wǒ de lǎoshī.', exampleSpanish: 'Ella es mi profesora.'
    },
    {
      hanzi: '有', pinyin: 'yǒu', spanish: 'tener / haber',
      example: '我有一个哥哥。', examplePinyin: 'wǒ yǒu yí ge gēge.', exampleSpanish: 'Tengo un hermano mayor.'
    },
    {
      hanzi: '叫', pinyin: 'jiào', spanish: 'llamarse',
      example: '我叫安娜。', examplePinyin: 'wǒ jiào Ānnà.', exampleSpanish: 'Me llamo Ana.'
    },
    {
      hanzi: '来', pinyin: 'lái', spanish: 'venir',
      example: '明天来我家吧。', examplePinyin: 'míngtiān lái wǒ jiā ba.', exampleSpanish: 'Ven mañana a mi casa.'
    },
    {
      hanzi: '去', pinyin: 'qù', spanish: 'ir',
      example: '我们一起去学校。', examplePinyin: 'wǒmen yìqǐ qù xuéxiào.', exampleSpanish: 'Vamos juntos a la escuela.'
    },
    {
      hanzi: '回', pinyin: 'huí', spanish: 'volver / regresar',
      example: '我晚上八点回家。', examplePinyin: 'wǒ wǎnshang bā diǎn huí jiā.', exampleSpanish: 'Vuelvo a casa a las ocho de la tarde.'
    },
    {
      hanzi: '看', pinyin: 'kàn', spanish: 'mirar / ver / leer',
      example: '爸爸在看报纸。', examplePinyin: 'bàba zài kàn bàozhǐ.', exampleSpanish: 'Papá está leyendo el periódico.'
    },
    {
      hanzi: '听', pinyin: 'tīng', spanish: 'escuchar',
      example: '我喜欢听音乐。', examplePinyin: 'wǒ xǐhuan tīng yīnyuè.', exampleSpanish: 'Me gusta escuchar música.'
    },
    {
      hanzi: '说', pinyin: 'shuō', spanish: 'hablar / decir',
      example: '她会说汉语。', examplePinyin: 'tā huì shuō Hànyǔ.', exampleSpanish: 'Sabe hablar chino.'
    },
    {
      hanzi: '能', pinyin: 'néng', spanish: 'poder / ser capaz de',
      example: '我今天不能来。', examplePinyin: 'wǒ jīntiān bù néng lái.', exampleSpanish: 'Hoy no puedo venir.'
    },
    {
      hanzi: '要 ..', pinyin: 'yào...', spanish: 'querer / necesitar',
      example: '我要一杯茶。', examplePinyin: 'wǒ yào yì bēi chá.', exampleSpanish: 'Quiero una taza de té.'
    },
    {
      hanzi: '.. 过', pinyin: '...guo', spanish: 'haber hecho alguna vez',
      example: '我去过北京。', examplePinyin: 'wǒ qùguo Běijīng.', exampleSpanish: 'He estado en Pekín.'
    },
    {
      hanzi: '不/没', pinyin: 'bù / méi', spanish: 'no / negación',
      example: '我不喝咖啡，也没吃早饭。', examplePinyin: 'wǒ bù hē kāfēi, yě méi chī zǎofàn.', exampleSpanish: 'No bebo café y tampoco he desayunado.'
    }
  ]
};
