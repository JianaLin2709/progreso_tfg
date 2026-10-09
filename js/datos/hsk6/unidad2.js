// Exporta los datos de esta unidad para el catálogo HSK.
export const unidad2 = {
  // Indica el nivel, el número y el título de la unidad.
  hsk: 6,
  id: 2,
  titulo: 'Adjetivos',
  // Localiza la grabación y el mapa de fragmentos de esta unidad.
  audio: {
    mapa: new URL('../../../audios/hsk6/unidad2/tiempos.json', import.meta.url).href
  },
  // Lista las palabras: hanzi, pinyin y español, con un ejemplo en los tres formatos.
  vocabulario: [
    {
      hanzi: '显著', pinyin: 'xiǎnzhù', spanish: 'significativo / notable',
      example: '新方法取得了显著效果。', examplePinyin: 'xīn fāngfǎ qǔdé le xiǎnzhù xiàoguǒ.', exampleSpanish: 'El nuevo método logró resultados significativos.'
    },
    {
      hanzi: '潜在', pinyin: 'qiánzài', spanish: 'potencial / latente',
      example: '我们必须注意潜在风险。', examplePinyin: 'wǒmen bìxū zhùyì qiánzài fēngxiǎn.', exampleSpanish: 'Debemos prestar atención a los riesgos potenciales.'
    },
    {
      hanzi: '客观', pinyin: 'kèguān', spanish: 'objetivo / imparcial',
      example: '记者应该客观报道事实。', examplePinyin: 'jìzhě yīnggāi kèguān bàodào shìshí.', exampleSpanish: 'Los periodistas deben informar objetivamente sobre los hechos.'
    },
    {
      hanzi: '主观', pinyin: 'zhǔguān', spanish: 'subjetivo',
      example: '这个判断过于主观。', examplePinyin: 'zhè ge pànduàn guòyú zhǔguān.', exampleSpanish: 'Este juicio es demasiado subjetivo.'
    },
    {
      hanzi: '合理', pinyin: 'hélǐ', spanish: 'razonable',
      example: '资源应该得到合理利用。', examplePinyin: 'zīyuán yīnggāi dédào hélǐ lìyòng.', exampleSpanish: 'Los recursos deben utilizarse razonablemente.'
    },
    {
      hanzi: '全面', pinyin: 'quánmiàn', spanish: 'completo / integral',
      example: '专家对情况进行了全面分析。', examplePinyin: 'zhuānjiā duì qíngkuàng jìnxíng le quánmiàn fēnxī.', exampleSpanish: 'Los expertos realizaron un análisis completo de la situación.'
    }
  ]
};
