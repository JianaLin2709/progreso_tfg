// Exporta los datos de esta unidad para el catálogo HSK.
export const unidad1 = {
  // Indica el nivel, el número y el título de la unidad.
  hsk: 1,
  id: 1,
  titulo: 'Saludos y presentaciones',
  // Localiza el mapa de tiempos de las grabaciones tomando este archivo como base.
  audio: {
    mapa: new URL('../../../audios/hsk1/unidad1/tiempos.json', import.meta.url).href
  },
  // Lista las palabras: hanzi, pinyin y español, con un ejemplo en los tres formatos.
  vocabulario: [
    {
      hanzi: '你好', pinyin: 'nǐ hǎo', spanish: 'hola',
      example: '你好，我叫安娜。', examplePinyin: 'nǐ hǎo, wǒ jiào ānnà.', exampleSpanish: 'Hola, me llamo Ana.'
    },
    {
      hanzi: '再见', pinyin: 'zàijiàn', spanish: 'adiós',
      example: '老师，再见！', examplePinyin: 'lǎoshī, zàijiàn!', exampleSpanish: '¡Adiós, profesor!'
    },
    {
      hanzi: '我/我们', pinyin: 'wǒ', spanish: 'yo/nosotros',
      example: '我是学生。', examplePinyin: 'wǒ shì xuésheng.', exampleSpanish: 'Yo soy estudiante.'
    },
    {
      hanzi: '你/你们', pinyin: 'nǐ', spanish: 'tú/vosotros',
      example: '你叫什么名字？', examplePinyin: 'nǐ jiào shénme míngzi?', exampleSpanish: '¿Cómo te llamas?'
    },
    {
      hanzi: '她/她们', pinyin: 'tā', spanish: 'ella',
      example: '她叫李月。', examplePinyin: 'tā jiào lǐ yuè.', exampleSpanish: 'Ella se llama Li Yue.'
    },
    {
      hanzi: '他/他们', pinyin: 'tā', spanish: 'él',
      example: '他是我的朋友。', examplePinyin: 'tā shì wǒ de péngyou.', exampleSpanish: 'Él es mi amigo.'
    },
    {
      hanzi: '它', pinyin: 'jiào', spanish: 'llamarse',
      example: '它是我的宠物猫。', examplePinyin: 'wǒ jiào wáng míng.', exampleSpanish: 'Me llamo Wang Ming.'
    },
    {
      hanzi: '名字', pinyin: 'míngzi', spanish: 'nombre',
      example: '你叫什么名字？', examplePinyin: 'nǐ de míngzi shì shénme?', exampleSpanish: '¿Cuál es tu nombre?'
    },
    {
      hanzi: '姓氏', pinyin: 'hěn gāoxìng', spanish: 'apellido',
      example: '你的姓氏是？', examplePinyin: 'rènshi nǐ hěn gāoxìng.', exampleSpanish: 'Encantado de conocerte.'
    }
  ]
};
