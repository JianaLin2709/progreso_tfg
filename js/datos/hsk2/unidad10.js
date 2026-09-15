// Exporta los datos de esta unidad para el catálogo HSK.
export const unidad10 = {
  // Indica el nivel, el número y el título de la unidad.
  hsk: 2,
  id: 10,
  titulo: 'Verbos II',
  // Localiza el mapa de tiempos de las grabaciones tomando este archivo como base.
  audio: {
    mapa: new URL('../../../audios/hsk2/unidad10/tiempos.json', import.meta.url).href
  },
  // Lista las palabras: hanzi, pinyin y español, con un ejemplo en los tres formatos.
  vocabulario: [
    {
      hanzi: '吃', pinyin: 'chī', spanish: 'comer',
      example: '我们一起吃饭吧。', examplePinyin: 'wǒmen yìqǐ chīfàn ba.', exampleSpanish: 'Comamos juntos.'
    },
    {
      hanzi: '喝', pinyin: 'hē', spanish: 'beber',
      example: '我想喝水。', examplePinyin: 'wǒ xiǎng hē shuǐ.', exampleSpanish: 'Quiero beber agua.'
    },
    {
      hanzi: '玩', pinyin: 'wán', spanish: 'jugar / divertirse',
      example: '孩子们在外面玩。', examplePinyin: 'háizimen zài wàimian wán.', exampleSpanish: 'Los niños están jugando fuera.'
    },
    {
      hanzi: '穿', pinyin: 'chuān', spanish: 'vestir / ponerse',
      example: '今天我穿白衬衫。', examplePinyin: 'jīntiān wǒ chuān bái chènshān.', exampleSpanish: 'Hoy llevo una camisa blanca.'
    },
    {
      hanzi: '问', pinyin: 'wèn', spanish: 'preguntar',
      example: '我想问你一个问题。', examplePinyin: 'wǒ xiǎng wèn nǐ yí ge wèntí.', exampleSpanish: 'Quiero hacerte una pregunta.'
    },
    {
      hanzi: '养', pinyin: 'yǎng', spanish: 'criar / tener una mascota',
      example: '她养了一只猫。', examplePinyin: 'tā yǎng le yì zhī māo.', exampleSpanish: 'Tiene un gato como mascota.'
    },
    {
      hanzi: '放', pinyin: 'fàng', spanish: 'poner / dejar',
      example: '请把书放在桌子上。', examplePinyin: 'qǐng bǎ shū fàng zài zhuōzi shàng.', exampleSpanish: 'Pon el libro sobre la mesa, por favor.'
    },
    {
      hanzi: '想', pinyin: 'xiǎng', spanish: 'querer / pensar',
      example: '我想去中国。', examplePinyin: 'wǒ xiǎng qù Zhōngguó.', exampleSpanish: 'Quiero ir a China.'
    },
    {
      hanzi: '指', pinyin: 'zhǐ', spanish: 'señalar',
      example: '他指着那座楼。', examplePinyin: 'tā zhǐzhe nà zuò lóu.', exampleSpanish: 'Está señalando aquel edificio.'
    },
    {
      hanzi: '坐', pinyin: 'zuò', spanish: 'sentarse',
      example: '请坐在这里。', examplePinyin: 'qǐng zuò zài zhèli.', exampleSpanish: 'Siéntate aquí, por favor.'
    },
    {
      hanzi: '躺', pinyin: 'tǎng', spanish: 'tumbarse',
      example: '他躺在床上休息。', examplePinyin: 'tā tǎng zài chuáng shàng xiūxi.', exampleSpanish: 'Está tumbado en la cama descansando.'
    },
    {
      hanzi: '站', pinyin: 'zhàn', spanish: 'estar de pie',
      example: '老师站在黑板前。', examplePinyin: 'lǎoshī zhàn zài hēibǎn qián.', exampleSpanish: 'El profesor está de pie frente a la pizarra.'
    }
  ]
};
