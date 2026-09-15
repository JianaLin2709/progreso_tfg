// Exporta los datos de esta unidad para el catálogo HSK.
export const unidad4 = {
  // Indica el nivel, el número y el título de la unidad.
  hsk: 2,
  id: 4,
  titulo: 'Direcciones y ubicación',
  // Localiza el mapa de tiempos de las grabaciones tomando este archivo como base.
  audio: {
    mapa: new URL('../../../audios/hsk2/unidad4/tiempos.json', import.meta.url).href
  },
  // Lista las palabras: hanzi, pinyin y español, con un ejemplo en los tres formatos.
  vocabulario: [
    {
      hanzi: '上', pinyin: 'shàng', spanish: 'arriba / encima de',
      example: '书在桌子上。', examplePinyin: 'shū zài zhuōzi shàng.', exampleSpanish: 'El libro está encima de la mesa.'
    },
    {
      hanzi: '下', pinyin: 'xià', spanish: 'abajo / debajo de',
      example: '猫在桌子下。', examplePinyin: 'māo zài zhuōzi xià.', exampleSpanish: 'El gato está debajo de la mesa.'
    },
    {
      hanzi: '左', pinyin: 'zuǒ', spanish: 'izquierda',
      example: '银行在左边。', examplePinyin: 'yínháng zài zuǒbian.', exampleSpanish: 'El banco está a la izquierda.'
    },
    {
      hanzi: '右', pinyin: 'yòu', spanish: 'derecha',
      example: '学校在右边。', examplePinyin: 'xuéxiào zài yòubian.', exampleSpanish: 'La escuela está a la derecha.'
    },
    {
      hanzi: '前', pinyin: 'qián', spanish: 'delante / antes',
      example: '车站在学校前面。', examplePinyin: 'chēzhàn zài xuéxiào qiánmiàn.', exampleSpanish: 'La estación está delante de la escuela.'
    },
    {
      hanzi: '后', pinyin: 'hòu', spanish: 'detrás / después',
      example: '餐馆在银行后面。', examplePinyin: 'cānguǎn zài yínháng hòumiàn.', exampleSpanish: 'El restaurante está detrás del banco.'
    },
    {
      hanzi: '旁边', pinyin: 'pángbiān', spanish: 'al lado',
      example: '医院在学校旁边。', examplePinyin: 'yīyuàn zài xuéxiào pángbiān.', exampleSpanish: 'El hospital está al lado de la escuela.'
    },
    {
      hanzi: '这个', pinyin: 'zhè ge', spanish: 'este / esto',
      example: '这个很好吃。', examplePinyin: 'zhè ge hěn hǎochī.', exampleSpanish: 'Esto está muy rico.'
    },
    {
      hanzi: '那个', pinyin: 'nà ge', spanish: 'ese / aquel',
      example: '那个是我的。', examplePinyin: 'nà ge shì wǒ de.', exampleSpanish: 'Ese es mío.'
    },
    {
      hanzi: '这里', pinyin: 'zhèli', spanish: 'aquí',
      example: '我住在这里。', examplePinyin: 'wǒ zhù zài zhèli.', exampleSpanish: 'Vivo aquí.'
    },
    {
      hanzi: '那里', pinyin: 'nàli', spanish: 'allí / allá',
      example: '银行在那里。', examplePinyin: 'yínháng zài nàli.', exampleSpanish: 'El banco está allí.'
    },
    {
      hanzi: '近', pinyin: 'jìn', spanish: 'cerca',
      example: '我家离学校很近。', examplePinyin: 'wǒ jiā lí xuéxiào hěn jìn.', exampleSpanish: 'Mi casa está cerca de la escuela.'
    },
    {
      hanzi: '远', pinyin: 'yuǎn', spanish: 'lejos',
      example: '医院离这里很远。', examplePinyin: 'yīyuàn lí zhèli hěn yuǎn.', exampleSpanish: 'El hospital está lejos de aquí.'
    }
  ]
};
