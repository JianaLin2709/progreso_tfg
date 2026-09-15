// Exporta los datos de esta unidad para el catálogo HSK.
export const unidad7 = {
  // Indica el nivel, el número y el título de la unidad.
  hsk: 2,
  id: 7,
  titulo: 'Ropa',
  // Localiza el mapa de tiempos de las grabaciones tomando este archivo como base.
  audio: {
    mapa: new URL('../../../audios/hsk2/unidad7/tiempos.json', import.meta.url).href
  },
  // Lista las palabras: hanzi, pinyin y español, con un ejemplo en los tres formatos.
  vocabulario: [
    {
      hanzi: '上衣', pinyin: 'shàngyī', spanish: 'prenda superior',
      example: '这件上衣很好看。', examplePinyin: 'zhè jiàn shàngyī hěn hǎokàn.', exampleSpanish: 'Esta prenda superior es muy bonita.'
    },
    {
      hanzi: '外套', pinyin: 'wàitào', spanish: 'abrigo / chaqueta',
      example: '外面很冷，穿上外套吧。', examplePinyin: 'wàimian hěn lěng, chuān shàng wàitào ba.', exampleSpanish: 'Hace frío fuera; ponte el abrigo.'
    },
    {
      hanzi: '裙子', pinyin: 'qúnzi', spanish: 'falda',
      example: '她穿了一条红裙子。', examplePinyin: 'tā chuān le yì tiáo hóng qúnzi.', exampleSpanish: 'Lleva una falda roja.'
    },
    {
      hanzi: '裤子', pinyin: 'kùzi', spanish: 'pantalones',
      example: '这条裤子太长了。', examplePinyin: 'zhè tiáo kùzi tài cháng le.', exampleSpanish: 'Estos pantalones son demasiado largos.'
    },
    {
      hanzi: '连衣裙', pinyin: 'liányīqún', spanish: 'vestido',
      example: '她买了一条连衣裙。', examplePinyin: 'tā mǎi le yì tiáo liányīqún.', exampleSpanish: 'Ha comprado un vestido.'
    },
    {
      hanzi: '鞋子', pinyin: 'xiézi', spanish: 'zapatos',
      example: '这双鞋子很舒服。', examplePinyin: 'zhè shuāng xiézi hěn shūfu.', exampleSpanish: 'Estos zapatos son muy cómodos.'
    },
    {
      hanzi: '帽子', pinyin: 'màozi', spanish: 'sombrero / gorro',
      example: '他戴着一顶帽子。', examplePinyin: 'tā dàizhe yì dǐng màozi.', exampleSpanish: 'Lleva puesto un sombrero.'
    },
    {
      hanzi: '围巾', pinyin: 'wéijīn', spanish: 'bufanda',
      example: '这条围巾是蓝色的。', examplePinyin: 'zhè tiáo wéijīn shì lánsè de.', exampleSpanish: 'Esta bufanda es azul.'
    },
    {
      hanzi: '手套', pinyin: 'shǒutào', spanish: 'guantes',
      example: '冬天要戴手套。', examplePinyin: 'dōngtiān yào dài shǒutào.', exampleSpanish: 'En invierno hay que llevar guantes.'
    },
    {
      hanzi: '耳环', pinyin: 'ěrhuán', spanish: 'pendientes',
      example: '她戴着一对耳环。', examplePinyin: 'tā dàizhe yí duì ěrhuán.', exampleSpanish: 'Lleva un par de pendientes.'
    },
     {
      hanzi: '项链', pinyin: 'xiàngliàn', spanish: 'collar',
      example: '这条项链很漂亮。', examplePinyin: 'zhè tiáo xiàngliàn hěn piàoliang.', exampleSpanish: 'Este collar es muy bonito.'
    },
    {
      hanzi: '手链', pinyin: 'shǒuliàn', spanish: 'pulsera',
      example: '这是我的新手链。', examplePinyin: 'zhè shì wǒ de xīn shǒuliàn.', exampleSpanish: 'Esta es mi pulsera nueva.'
    }
  ]
};
