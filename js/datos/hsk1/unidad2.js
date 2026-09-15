// Exporta los datos de esta unidad para el catálogo HSK.
export const unidad2 = {
  // Indica el nivel, el número y el título de la unidad.
  hsk: 1,
  id: 2,
  titulo: 'Números',
  // Localiza el mapa de tiempos de las grabaciones tomando este archivo como base.
  audio: {
    mapa: new URL('../../../audios/hsk1/unidad2/tiempos.json', import.meta.url).href
  },
  // Lista las palabras: hanzi, pinyin y español, con un ejemplo en los tres formatos.
  vocabulario: [
    {
      hanzi: '零', pinyin: 'líng', spanish: 'cero',
      example: '今天是零度。', examplePinyin: 'jīntiān shì líng dù.', exampleSpanish: 'Hoy hace cero grados.'
    },
    {
      hanzi: '一', pinyin: 'yī', spanish: 'uno',
      example: '我有一个苹果。', examplePinyin: 'wǒ yǒu yí ge píngguǒ.', exampleSpanish: 'Tengo una manzana.'
    },
    {
      hanzi: '二', pinyin: 'èr', spanish: 'dos',
      example: '今天是二号。', examplePinyin: 'jīntiān shì èr hào.', exampleSpanish: 'Hoy es día dos.'
    },
    {
      hanzi: '三', pinyin: 'sān', spanish: 'tres',
      example: '我有三本书。', examplePinyin: 'wǒ yǒu sān běn shū.', exampleSpanish: 'Tengo tres libros.'
    },
    {
      hanzi: '四', pinyin: 'sì', spanish: 'cuatro',
      example: '现在四点。', examplePinyin: 'xiànzài sì diǎn.', exampleSpanish: 'Ahora son las cuatro.'
    },
    {
      hanzi: '五', pinyin: 'wǔ', spanish: 'cinco',
      example: '今天是五度。', examplePinyin: 'jīntiān shì wǔ dù.', exampleSpanish: 'Hoy hace cinco grados.'
    },
    {
      hanzi: '六', pinyin: 'liù', spanish: 'seis',
      example: '我有六个苹果。', examplePinyin: 'wǒ yǒu liù ge píngguǒ.', exampleSpanish: 'Tengo seis manzanas.'
    },
    {
      hanzi: '七', pinyin: 'qī', spanish: 'siete',
      example: '今天是七号。', examplePinyin: 'jīntiān shì qī hào.', exampleSpanish: 'Hoy es día siete.'
    },
    {
      hanzi: '八', pinyin: 'bā', spanish: 'ocho',
      example: '我有八本书。', examplePinyin: 'wǒ yǒu bā běn shū.', exampleSpanish: 'Tengo ocho libros.'
    },
    {
      hanzi: '九', pinyin: 'jiǔ', spanish: 'nueve',
      example: '现在九点。', examplePinyin: 'xiànzài jiǔ diǎn.', exampleSpanish: 'Ahora son las nueve.'
    },
    {
      hanzi: '十', pinyin: 'shí', spanish: 'diez',
      example: '他十岁。', examplePinyin: 'tā shí suì.', exampleSpanish: 'Él tiene diez años.'
    }
  ]
};
