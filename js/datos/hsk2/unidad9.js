// Exporta los datos de esta unidad para el catálogo HSK.
export const unidad9 = {
  // Indica el nivel, el número y el título de la unidad.
  hsk: 2,
  id: 9,
  titulo: 'Animales',
  // Localiza el mapa de tiempos de las grabaciones tomando este archivo como base.
  audio: {
    mapa: new URL('../../../audios/hsk2/unidad9/tiempos.json', import.meta.url).href
  },
  // Lista las palabras: hanzi, pinyin y español, con un ejemplo en los tres formatos.
  vocabulario: [
    {
      hanzi: '狗', pinyin: 'gǒu', spanish: 'perro',
      example: '我家有一只狗。', examplePinyin: 'wǒ jiā yǒu yì zhī gǒu.', exampleSpanish: 'En mi casa hay un perro.'
    },
    {
      hanzi: '猫', pinyin: 'māo', spanish: 'gato',
      example: '那只猫在睡觉。', examplePinyin: 'nà zhī māo zài shuìjiào.', exampleSpanish: 'Ese gato está durmiendo.'
    },
    {
      hanzi: '兔', pinyin: 'tù', spanish: 'conejo',
      example: '兔子喜欢吃胡萝卜。', examplePinyin: 'tùzi xǐhuan chī húluóbo.', exampleSpanish: 'A los conejos les gusta comer zanahoria.'
    },
    {
      hanzi: '羊', pinyin: 'yáng', spanish: 'oveja',
      example: '山上有很多羊。', examplePinyin: 'shān shàng yǒu hěn duō yáng.', exampleSpanish: 'Hay muchas ovejas en la montaña.'
    },
    {
      hanzi: '蛇', pinyin: 'shé', spanish: 'serpiente',
      example: '我很怕蛇。', examplePinyin: 'wǒ hěn pà shé.', exampleSpanish: 'Me dan mucho miedo las serpientes.'
    },
    {
      hanzi: '猪', pinyin: 'zhū', spanish: 'cerdo',
      example: '农场里有三只猪。', examplePinyin: 'nóngchǎng li yǒu sān zhī zhū.', exampleSpanish: 'Hay tres cerdos en la granja.'
    },
    {
      hanzi: '牛', pinyin: 'niú', spanish: 'vaca / buey',
      example: '这头牛正在吃草。', examplePinyin: 'zhè tóu niú zhèngzài chī cǎo.', exampleSpanish: 'Esta vaca está comiendo hierba.'
    },
    {
      hanzi: '鱼', pinyin: 'yú', spanish: 'pez / pescado',
      example: '水里有很多鱼。', examplePinyin: 'shuǐ li yǒu hěn duō yú.', exampleSpanish: 'Hay muchos peces en el agua.'
    }
  ]
};
