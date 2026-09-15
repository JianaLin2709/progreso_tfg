// Exporta los datos de esta unidad para el catálogo HSK.
export const unidad5 = {
  // Indica el nivel, el número y el título de la unidad.
  hsk: 1,
  id: 5,
  titulo: 'Naturaleza',
  // Localiza el mapa de tiempos de las grabaciones tomando este archivo como base.
  audio: {
    mapa: new URL('../../../audios/hsk1/unidad5/tiempos.json', import.meta.url).href
  },
  // Lista las palabras: hanzi, pinyin y español, con un ejemplo en los tres formatos.
  vocabulario: [
    {
      hanzi: '花', pinyin: 'huā', spanish: 'flor',
      example: '花园里有很多花。', examplePinyin: 'huāyuán li yǒu hěn duō huā.', exampleSpanish: 'Hay muchas flores en el jardín.'
    },
    {
      hanzi: '草', pinyin: 'cǎo', spanish: 'hierba',
      example: '小羊正在吃草。', examplePinyin: 'xiǎoyáng zhèngzài chī cǎo.', exampleSpanish: 'El cordero está comiendo hierba.'
    },
    {
      hanzi: '木', pinyin: 'mù', spanish: 'madera / árbol',
      example: '这张桌子是木头做的。', examplePinyin: 'zhè zhāng zhuōzi shì mùtou zuò de.', exampleSpanish: 'Esta mesa está hecha de madera.'
    },
    {
      hanzi: '土', pinyin: 'tǔ', spanish: 'tierra / suelo',
      example: '孩子们在土里种花。', examplePinyin: 'háizimen zài tǔ li zhòng huā.', exampleSpanish: 'Los niños plantan flores en la tierra.'
    },
    {
      hanzi: '叶', pinyin: 'yè', spanish: 'hoja',
      example: '秋天树叶变黄了。', examplePinyin: 'qiūtiān shùyè biàn huáng le.', exampleSpanish: 'En otoño las hojas se vuelven amarillas.'
    },
    {
      hanzi: '火', pinyin: 'huǒ', spanish: 'fuego',
      example: '请不要玩火。', examplePinyin: 'qǐng bú yào wán huǒ.', exampleSpanish: 'No juegues con fuego, por favor.'
    },
    {
      hanzi: '树', pinyin: 'shù', spanish: 'árbol',
      example: '学校门口有一棵大树。', examplePinyin: 'xuéxiào ménkǒu yǒu yì kē dà shù.', exampleSpanish: 'Hay un árbol grande delante de la escuela.'
    }
  ]
};
