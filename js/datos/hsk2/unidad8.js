// Exporta los datos de esta unidad para el catálogo HSK.
export const unidad8 = {
  // Indica el nivel, el número y el título de la unidad.
  hsk: 2,
  id: 8,
  titulo: 'Casa',
  // Localiza el mapa de tiempos de las grabaciones tomando este archivo como base.
  audio: {
    mapa: new URL('../../../audios/hsk2/unidad8/tiempos.json', import.meta.url).href
  },
  // Lista las palabras: hanzi, pinyin y español, con un ejemplo en los tres formatos.
  vocabulario: [
    {
      hanzi: '卧室', pinyin: 'wòshì', spanish: 'dormitorio',
      example: '我的卧室很安静。', examplePinyin: 'wǒ de wòshì hěn ānjìng.', exampleSpanish: 'Mi dormitorio es muy tranquilo.'
    },
    {
      hanzi: '厨房', pinyin: 'chúfáng', spanish: 'cocina',
      example: '妈妈在厨房做饭。', examplePinyin: 'māma zài chúfáng zuòfàn.', exampleSpanish: 'Mamá está cocinando en la cocina.'
    },
    {
      hanzi: '客厅', pinyin: 'kètīng', spanish: 'salón',
      example: '我们在客厅看电视。', examplePinyin: 'wǒmen zài kètīng kàn diànshì.', exampleSpanish: 'Vemos la televisión en el salón.'
    },
    {
      hanzi: '卫生间', pinyin: 'wèishēngjiān', spanish: 'baño',
      example: '卫生间在左边。', examplePinyin: 'wèishēngjiān zài zuǒbian.', exampleSpanish: 'El baño está a la izquierda.'
    },
    {
      hanzi: '阳台', pinyin: 'yángtái', spanish: 'balcón',
      example: '阳台上有很多花。', examplePinyin: 'yángtái shàng yǒu hěn duō huā.', exampleSpanish: 'Hay muchas flores en el balcón.'
    },
    {
      hanzi: '车库', pinyin: 'chēkù', spanish: 'garaje',
      example: '汽车停在车库里。', examplePinyin: 'qìchē tíng zài chēkù li.', exampleSpanish: 'El coche está aparcado en el garaje.'
    },
    {
      hanzi: '衣帽间', pinyin: 'yīmàojiān', spanish: 'vestidor',
      example: '衣服都在衣帽间里。', examplePinyin: 'yīfu dōu zài yīmàojiān li.', exampleSpanish: 'Toda la ropa está en el vestidor.'
    },
    {
      hanzi: '书房', pinyin: 'shūfáng', spanish: 'despacho / estudio',
      example: '爸爸在书房看书。', examplePinyin: 'bàba zài shūfáng kàn shū.', exampleSpanish: 'Papá está leyendo en el estudio.'
    },
    {
      hanzi: '花园', pinyin: 'huāyuán', spanish: 'jardín',
      example: '孩子们在花园里玩。', examplePinyin: 'háizimen zài huāyuán li wán.', exampleSpanish: 'Los niños juegan en el jardín.'
    }
  ]
};
