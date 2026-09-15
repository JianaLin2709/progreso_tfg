// Exporta los datos de esta unidad para el catálogo HSK.
export const unidad3 = {
  // Indica el nivel, el número y el título de la unidad.
  hsk: 2,
  id: 3,
  titulo: 'Preguntas Básicas',
  // Localiza el mapa de tiempos de las grabaciones tomando este archivo como base.
  audio: {
    mapa: new URL('../../../audios/hsk2/unidad3/tiempos.json', import.meta.url).href
  },
  // Lista las palabras: hanzi, pinyin y español, con un ejemplo en los tres formatos.
  vocabulario: [
    {
      hanzi: '什么', pinyin: 'shénme', spanish: 'qué / cuál',
      example: '你想吃什么？', examplePinyin: 'nǐ xiǎng chī shénme?', exampleSpanish: '¿Qué quieres comer?'
    },
    {
      hanzi: '什么时候', pinyin: 'shénme shíhou', spanish: 'cuándo',
      example: '你什么时候回家？', examplePinyin: 'nǐ shénme shíhou huí jiā?', exampleSpanish: '¿Cuándo vuelves a casa?'
    },
    {
      hanzi: '多少', pinyin: 'duōshao', spanish: 'cuánto / cuántos',
      example: '这个多少钱？', examplePinyin: 'zhè ge duōshao qián?', exampleSpanish: '¿Cuánto cuesta esto?'
    },
    {
      hanzi: '哪里', pinyin: 'nǎli', spanish: 'dónde',
      example: '你住在哪里？', examplePinyin: 'nǐ zhù zài nǎli?', exampleSpanish: '¿Dónde vives?'
    },
    {
      hanzi: '怎么', pinyin: 'zěnme', spanish: 'cómo / de qué manera',
      example: '这个字怎么读？', examplePinyin: 'zhè ge zì zěnme dú?', exampleSpanish: '¿Cómo se lee este carácter?'
    },
    {
      hanzi: '哪个', pinyin: 'nǎ ge', spanish: 'cuál / cuál de ellos',
      example: '你想买哪个？', examplePinyin: 'nǐ xiǎng mǎi nǎ ge?', exampleSpanish: '¿Cuál quieres comprar?'
    },
    {
      hanzi: '谁', pinyin: 'shéi', spanish: 'quién',
      example: '他是谁？', examplePinyin: 'tā shì shéi?', exampleSpanish: '¿Quién es él?'
    }
  ]
};
