// Exporta los datos de esta unidad para el catálogo HSK.
export const unidad6 = {
  // Indica el nivel, el número y el título de la unidad.
  hsk: 2,
  id: 6,
  titulo: 'Lugares',
  // Localiza el mapa de tiempos de las grabaciones tomando este archivo como base.
  audio: {
    mapa: new URL('../../../audios/hsk2/unidad6/tiempos.json', import.meta.url).href
  },
  // Lista las palabras: hanzi, pinyin y español, con un ejemplo en los tres formatos.
  vocabulario: [
    {
      hanzi: '学校', pinyin: 'xuéxiào', spanish: 'escuela / colegio',
      example: '我每天去学校。', examplePinyin: 'wǒ měitiān qù xuéxiào.', exampleSpanish: 'Voy a la escuela todos los días.'
    },
    {
      hanzi: '医院', pinyin: 'yīyuàn', spanish: 'hospital',
      example: '他在医院工作。', examplePinyin: 'tā zài yīyuàn gōngzuò.', exampleSpanish: 'Él trabaja en el hospital.'
    },
    {
      hanzi: '商场', pinyin: 'shāngchǎng', spanish: 'centro comercial',
      example: '我们去商场买东西。', examplePinyin: 'wǒmen qù shāngchǎng mǎi dōngxi.', exampleSpanish: 'Vamos al centro comercial a comprar.'
    },
    {
      hanzi: '餐馆', pinyin: 'cānguǎn', spanish: 'restaurante',
      example: '这家餐馆很好。', examplePinyin: 'zhè jiā cānguǎn hěn hǎo.', exampleSpanish: 'Este restaurante está muy bien.'
    },
    {
      hanzi: '酒吧', pinyin: 'jiǔbā', spanish: 'bar',
      example: '晚上他们去酒吧。', examplePinyin: 'wǎnshang tāmen qù jiǔbā.', exampleSpanish: 'Por la noche van al bar.'
    },
    {
      hanzi: '游乐园', pinyin: 'yóulèyuán', spanish: 'parque de atracciones',
      example: '周末我们去游乐园。', examplePinyin: 'zhōumò wǒmen qù yóulèyuán.', exampleSpanish: 'El fin de semana vamos al parque de atracciones.'
    },
    {
      hanzi: '健身房', pinyin: 'jiànshēnfáng', spanish: 'gimnasio',
      example: '我爸爸在健身房运动。', examplePinyin: 'wǒ bàba zài jiànshēnfáng yùndòng.', exampleSpanish: 'Mi padre hace ejercicio en el gimnasio.'
    },
    {
      hanzi: '银行', pinyin: 'yínháng', spanish: 'banco',
      example: '银行在学校旁边。', examplePinyin: 'yínháng zài xuéxiào pángbiān.', exampleSpanish: 'El banco está al lado de la escuela.'
    },
    {
      hanzi: '家', pinyin: 'jiā', spanish: 'casa / hogar / familia',
      example: '我现在回家。', examplePinyin: 'wǒ xiànzài huí jiā.', exampleSpanish: 'Ahora vuelvo a casa.'
    },
    {
      hanzi: '车站', pinyin: 'chēzhàn', spanish: 'estación / parada',
      example: '我在车站等你。', examplePinyin: 'wǒ zài chēzhàn děng nǐ.', exampleSpanish: 'Te espero en la estación.'
    }
  ]
};
