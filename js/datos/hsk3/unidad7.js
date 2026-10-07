// Exporta los datos de esta unidad para el catálogo HSK.
export const unidad7 = {
  // Indica el nivel, el número y el título de la unidad.
  hsk: 3,
  id: 7,
  titulo: 'Clima',
  // Localiza el mapa de tiempos de las grabaciones tomando este archivo como base.
  audio: {
    mapa: new URL('../../../audios/hsk3/unidad7/tiempos.json', import.meta.url).href
  },
  // Lista las palabras: hanzi, pinyin y español, con un ejemplo en los tres formatos.
  vocabulario: [
    {
      hanzi: '晴天', pinyin: 'qíngtiān', spanish: 'día soleado',
      example: '晴天我们一起去公园吧。', examplePinyin: 'qíngtiān wǒmen yìqǐ qù gōngyuán ba.', exampleSpanish: 'En un día soleado vayamos juntos al parque.'
    },
    {
      hanzi: '阴天', pinyin: 'yīntiān', spanish: 'día nublado',
      example: '今天是阴天，看不见太阳。', examplePinyin: 'jīntiān shì yīntiān, kànbujiàn tàiyáng.', exampleSpanish: 'Hoy está nublado y no se ve el sol.'
    },
    {
      hanzi: '下雨天', pinyin: 'xiàyǔtiān', spanish: 'día lluvioso',
      example: '下雨天出门要带伞。', examplePinyin: 'xiàyǔtiān chūmén yào dài sǎn.', exampleSpanish: 'En los días lluviosos hay que llevar paraguas.'
    },
    {
      hanzi: '雾', pinyin: 'wù', spanish: 'niebla',
      example: '早上雾很大，开车要小心。', examplePinyin: 'zǎoshang wù hěn dà, kāichē yào xiǎoxīn.', exampleSpanish: 'Por la mañana hay mucha niebla; conduce con cuidado.'
    },
    {
      hanzi: '风', pinyin: 'fēng', spanish: 'viento',
      example: '今天风很大，别开窗户。', examplePinyin: 'jīntiān fēng hěn dà, bié kāi chuānghu.', exampleSpanish: 'Hoy hace mucho viento; no abras la ventana.'
    },
    {
      hanzi: '春天', pinyin: 'chūntiān', spanish: 'primavera',
      example: '春天公园里开满了花。', examplePinyin: 'chūntiān gōngyuán li kāi mǎn le huā.', exampleSpanish: 'En primavera el parque se llena de flores.'
    },
    {
      hanzi: '夏天', pinyin: 'xiàtiān', spanish: 'verano',
      example: '夏天我们常常去海边游泳。', examplePinyin: 'xiàtiān wǒmen chángcháng qù hǎibiān yóuyǒng.', exampleSpanish: 'En verano solemos ir a nadar a la playa.'
    },
    {
      hanzi: '秋天', pinyin: 'qiūtiān', spanish: 'otoño',
      example: '秋天的天气很凉快。', examplePinyin: 'qiūtiān de tiānqì hěn liángkuai.', exampleSpanish: 'En otoño el tiempo es fresco.'
    },
    {
      hanzi: '冬天', pinyin: 'dōngtiān', spanish: 'invierno',
      example: '北京的冬天非常冷。', examplePinyin: 'Běijīng de dōngtiān fēicháng lěng.', exampleSpanish: 'El invierno de Pekín es muy frío.'
    }
  ]
};
