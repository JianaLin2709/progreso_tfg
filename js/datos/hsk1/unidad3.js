// Exporta los datos de esta unidad para el catálogo HSK.
export const unidad3 = {
  // Indica el nivel, el número y el título de la unidad.
  hsk: 1,
  id: 3,
  titulo: 'La familia',
  // Localiza el mapa de tiempos de las grabaciones tomando este archivo como base.
  audio: {
    mapa: new URL('../../../audios/hsk1/unidad3/tiempos.json', import.meta.url).href
  },
  // Lista las palabras: hanzi, pinyin y español, con un ejemplo en los tres formatos.
  vocabulario: [
    {
      hanzi: '妈妈', pinyin: 'māma', spanish: 'madre / mamá',
      example: '我是妈妈的女儿。', examplePinyin: 'wǒ shì māma de nǚ\'ér.', exampleSpanish: 'Soy la hija de mamá.'
    },
    {
      hanzi: '爸爸', pinyin: 'bàba', spanish: 'padre / papá',
      example: '我是爸爸的儿子。', examplePinyin: 'wǒ shì bàba de érzi.', exampleSpanish: 'Soy el hijo de papá.'
    },
    {
      hanzi: '姐姐', pinyin: 'jiějie', spanish: 'hermana mayor',
      example: '我有一个姐姐。', examplePinyin: 'wǒ yǒu yí ge jiějie.', exampleSpanish: 'Tengo una hermana mayor.'
    },
    {
      hanzi: '妹妹', pinyin: 'mèimei', spanish: 'hermana menor',
      example: '我有一个妹妹。', examplePinyin: 'wǒ yǒu yí ge mèimei.', exampleSpanish: 'Tengo una hermana menor.'
    },
    {
      hanzi: '弟弟', pinyin: 'dìdi', spanish: 'hermano menor',
      example: '我有一个弟弟。', examplePinyin: 'wǒ yǒu yí ge dìdi.', exampleSpanish: 'Tengo un hermano menor.'
    },
    {
      hanzi: '哥哥', pinyin: 'gēge', spanish: 'hermano mayor',
      example: '我有一个哥哥。', examplePinyin: 'wǒ yǒu yí ge gēge.', exampleSpanish: 'Tengo un hermano mayor.'
    },
    {
      hanzi: '奶奶', pinyin: 'nǎnai', spanish: 'abuela paterna',
      example: '她是我的奶奶。', examplePinyin: 'tā shì wǒ de nǎnai.', exampleSpanish: 'Ella es mi abuela paterna.'
    },
    {
      hanzi: '爷爷', pinyin: 'yéye', spanish: 'abuelo paterno',
      example: '他是我的爷爷。', examplePinyin: 'tā shì wǒ de yéye.', exampleSpanish: 'Él es mi abuelo paterno.'
    },
    {
      hanzi: '外婆', pinyin: 'wàipó', spanish: 'abuela materna',
      example: '她是我的外婆。', examplePinyin: 'tā shì wǒ de wàipó.', exampleSpanish: 'Ella es mi abuela materna.'
    },
    {
      hanzi: '外公', pinyin: 'wàigōng', spanish: 'abuelo materno',
      example: '他是我的外公。', examplePinyin: 'tā shì wǒ de wàigōng.', exampleSpanish: 'Él es mi abuelo materno.'
    },
    {
      hanzi: '阿姨', pinyin: 'āyí', spanish: 'tía materna',
      example: '我阿姨是医生。', examplePinyin: 'wǒ āyí shì yīshēng.', exampleSpanish: 'Mi tía materna es médica.'
    },
    {
      hanzi: '舅舅', pinyin: 'jiùjiu', spanish: 'tío materno',
      example: '我舅舅住在北京。', examplePinyin: 'wǒ jiùjiu zhù zài Běijīng.', exampleSpanish: 'Mi tío materno vive en Pekín.'
    },
    {
      hanzi: '姑姑', pinyin: 'gūgu', spanish: 'tía paterna',
      example: '我姑姑是老师。', examplePinyin: 'wǒ gūgu shì lǎoshī.', exampleSpanish: 'Mi tía paterna es profesora.'
    },
    {
      hanzi: '叔叔', pinyin: 'shūshu', spanish: 'tío paterno',
      example: '我叔叔有一个儿子。', examplePinyin: 'wǒ shūshu yǒu yí ge érzi.', exampleSpanish: 'Mi tío paterno tiene un hijo.'
    }
  ]
};
