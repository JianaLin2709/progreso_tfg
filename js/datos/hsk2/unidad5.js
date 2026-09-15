// Exporta los datos de esta unidad para el catálogo HSK.
export const unidad5 = {
  // Indica el nivel, el número y el título de la unidad.
  hsk: 2,
  id: 5,
  titulo: 'Comida y bebida',
  // Localiza el mapa de tiempos de las grabaciones tomando este archivo como base.
  audio: {
    mapa: new URL('../../../audios/hsk2/unidad5/tiempos.json', import.meta.url).href
  },
  // Lista las palabras: hanzi, pinyin y español, con un ejemplo en los tres formatos.
  vocabulario: [
    {
      hanzi: '米饭', pinyin: 'mǐfàn', spanish: 'arroz',
      example: '我每天都吃米饭。', examplePinyin: 'wǒ měitiān dōu chī mǐfàn.', exampleSpanish: 'Como arroz todos los días.'
    },
    {
      hanzi: '面条', pinyin: 'miàntiáo', spanish: 'fideos',
      example: '我很喜欢吃面条。', examplePinyin: 'wǒ hěn xǐhuan chī miàntiáo.', exampleSpanish: 'Me gusta mucho comer fideos.'
    },
    {
      hanzi: '面包', pinyin: 'miànbāo', spanish: 'pan',
      example: '我早上吃面包。', examplePinyin: 'wǒ zǎoshang chī miànbāo.', exampleSpanish: 'Por la mañana como pan.'
    },
    {
      hanzi: '蔬菜', pinyin: 'shūcài', spanish: 'verduras',
      example: '蔬菜很健康。', examplePinyin: 'shūcài hěn jiànkāng.', exampleSpanish: 'Las verduras son saludables.'
    },
    {
      hanzi: '番茄', pinyin: 'fānqié', spanish: 'tomate',
      example: '我喜欢吃番茄。', examplePinyin: 'wǒ xǐhuan chī fānqié.', exampleSpanish: 'Me gusta comer tomate.'
    },
    {
      hanzi: '茄子', pinyin: 'qiézi', spanish: 'berenjena',
      example: '茄子很好吃。', examplePinyin: 'qiézi hěn hǎochī.', exampleSpanish: 'La berenjena está muy rica.'
    },
    {
      hanzi: '黄瓜', pinyin: 'huángguā', spanish: 'pepino',
      example: '我买了两根黄瓜。', examplePinyin: 'wǒ mǎi le liǎng gēn huángguā.', exampleSpanish: 'He comprado dos pepinos.'
    },
    {
      hanzi: '蘑菇', pinyin: 'mógu', spanish: 'seta / champiñón',
      example: '汤里有蘑菇。', examplePinyin: 'tāng li yǒu mógu.', exampleSpanish: 'Hay setas en la sopa.'
    },
    {
      hanzi: '青椒', pinyin: 'qīngjiāo', spanish: 'pimiento verde',
      example: '我不吃青椒。', examplePinyin: 'wǒ bù chī qīngjiāo.', exampleSpanish: 'No como pimiento verde.'
    },
    {
      hanzi: '辣椒', pinyin: 'làjiāo', spanish: 'chile / guindilla',
      example: '这个辣椒很辣。', examplePinyin: 'zhè ge làjiāo hěn là.', exampleSpanish: 'Este chile pica mucho.'
    },
    {
      hanzi: '沙拉菜', pinyin: 'shālācài', spanish: 'verduras para ensalada',
      example: '沙拉菜很新鲜。', examplePinyin: 'shālācài hěn xīnxiān.', exampleSpanish: 'Las verduras para ensalada están frescas.'
    },
    {
      hanzi: '水果', pinyin: 'shuǐguǒ', spanish: 'fruta',
      example: '我每天都吃水果。', examplePinyin: 'wǒ měitiān dōu chī shuǐguǒ.', exampleSpanish: 'Como fruta todos los días.'
    },
    {
      hanzi: '橘子', pinyin: 'júzi', spanish: 'mandarina',
      example: '我吃了一个橘子。', examplePinyin: 'wǒ chī le yí ge júzi.', exampleSpanish: 'He comido una mandarina.'
    },
    {
      hanzi: '橙子', pinyin: 'chéngzi', spanish: 'naranja',
      example: '橙子很甜。', examplePinyin: 'chéngzi hěn tián.', exampleSpanish: 'La naranja está dulce.'
    },
    {
      hanzi: '西瓜', pinyin: 'xīguā', spanish: 'sandía',
      example: '夏天我喜欢吃西瓜。', examplePinyin: 'xiàtiān wǒ xǐhuan chī xīguā.', exampleSpanish: 'En verano me gusta comer sandía.'
    },
    {
      hanzi: '哈密瓜', pinyin: 'hāmìguā', spanish: 'melón de Hami',
      example: '这个哈密瓜很甜。', examplePinyin: 'zhè ge hāmìguā hěn tián.', exampleSpanish: 'Este melón de Hami está muy dulce.'
    },
    {
      hanzi: '芒果', pinyin: 'mángguǒ', spanish: 'mango',
      example: '她喜欢喝芒果汁。', examplePinyin: 'tā xǐhuan hē mángguǒzhī.', exampleSpanish: 'Le gusta beber zumo de mango.'
    },
    {
      hanzi: '草莓', pinyin: 'cǎoméi', spanish: 'fresa',
      example: '这些草莓很新鲜。', examplePinyin: 'zhèxiē cǎoméi hěn xīnxiān.', exampleSpanish: 'Estas fresas están muy frescas.'
    },
    {
      hanzi: '香蕉', pinyin: 'xiāngjiāo', spanish: 'plátano',
      example: '我每天吃一根香蕉。', examplePinyin: 'wǒ měitiān chī yì gēn xiāngjiāo.', exampleSpanish: 'Como un plátano todos los días.'
    },
    {
      hanzi: '苹果', pinyin: 'píngguǒ', spanish: 'manzana',
      example: '桌子上有一个苹果。', examplePinyin: 'zhuōzi shàng yǒu yí ge píngguǒ.', exampleSpanish: 'Hay una manzana sobre la mesa.'
    },
    {
      hanzi: '桃子', pinyin: 'táozi', spanish: 'melocotón',
      example: '这个桃子很甜。', examplePinyin: 'zhè ge táozi hěn tián.', exampleSpanish: 'Este melocotón está muy dulce.'
    },
    {
      hanzi: '泥猴桃', pinyin: 'níhóutáo', spanish: 'kiwi',
      example: '我买了三个泥猴桃。', examplePinyin: 'wǒ mǎi le sān ge níhóutáo.', exampleSpanish: 'He comprado tres kiwis.'
    },
    {
      hanzi: '肉', pinyin: 'ròu', spanish: 'carne',
      example: '我不吃肉。', examplePinyin: 'wǒ bù chī ròu.', exampleSpanish: 'No como carne.'
    },
    {
      hanzi: '鱼', pinyin: 'yú', spanish: 'pescado / pez',
      example: '今天晚上我们吃鱼。', examplePinyin: 'jīntiān wǎnshang wǒmen chī yú.', exampleSpanish: 'Esta noche comemos pescado.'
    },
    {
      hanzi: '水', pinyin: 'shuǐ', spanish: 'agua',
      example: '请给我一杯水。', examplePinyin: 'qǐng gěi wǒ yì bēi shuǐ.', exampleSpanish: 'Dame un vaso de agua, por favor.'
    },
    {
      hanzi: '茶', pinyin: 'chá', spanish: 'té',
      example: '我妈妈喜欢喝茶。', examplePinyin: 'wǒ māma xǐhuan hē chá.', exampleSpanish: 'A mi madre le gusta beber té.'
    },
    {
      hanzi: '酒', pinyin: 'jiǔ', spanish: 'alcohol / bebida alcohólica',
      example: '他不喝酒。', examplePinyin: 'tā bù hē jiǔ.', exampleSpanish: 'Él no bebe alcohol.'
    },
    {
      hanzi: '咖啡', pinyin: 'kāfēi', spanish: 'café',
      example: '我早上喝一杯咖啡。', examplePinyin: 'wǒ zǎoshang hē yì bēi kāfēi.', exampleSpanish: 'Por la mañana bebo una taza de café.'
    },
    {
      hanzi: '饮料', pinyin: 'yǐnliào', spanish: 'bebida / refresco',
      example: '你想喝什么饮料？', examplePinyin: 'nǐ xiǎng hē shénme yǐnliào?', exampleSpanish: '¿Qué bebida quieres tomar?'
    }
  ]
};
