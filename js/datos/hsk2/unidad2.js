// Exporta los datos de esta unidad para el catálogo HSK.
export const unidad2 = {
  // Indica el nivel, el número y el título de la unidad.
  hsk: 2,
  id: 2,
  titulo: 'Fechas y calendario',
  // Localiza el mapa de tiempos de las grabaciones tomando este archivo como base.
  audio: {
    mapa: new URL('../../../audios/hsk2/unidad2/tiempos.json', import.meta.url).href
  },
  // Lista las palabras: hanzi, pinyin y español, con un ejemplo en los tres formatos.
  vocabulario: [
    {
      hanzi: '月', pinyin: 'yuè', spanish: 'mes',
      example: '这个月我很忙。', examplePinyin: 'zhè ge yuè wǒ hěn máng.', exampleSpanish: 'Este mes estoy muy ocupado/a.'
    },
    {
      hanzi: '星期', pinyin: 'xīngqī', spanish: 'semana',
      example: '今天星期几？', examplePinyin: 'jīntiān xīngqī jǐ?', exampleSpanish: '¿Qué día de la semana es hoy?'
    },
    {
      hanzi: '年', pinyin: 'nián', spanish: 'año',
      example: '明年我去中国。', examplePinyin: 'míngnián wǒ qù Zhōngguó.', exampleSpanish: 'El año que viene voy a China.'
    },
    {
      hanzi: '周末', pinyin: 'zhōumò', spanish: 'fin de semana',
      example: '周末我不工作。', examplePinyin: 'zhōumò wǒ bù gōngzuò.', exampleSpanish: 'No trabajo el fin de semana.'
    },
    {
      hanzi: '号 / 日', pinyin: 'hào / rì', spanish: 'día del mes / fecha',
      example: '今天是五月十号。', examplePinyin: 'jīntiān shì wǔ yuè shí hào.', exampleSpanish: 'Hoy es diez de mayo.'
    }
  ]
};
