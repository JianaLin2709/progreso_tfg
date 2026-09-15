// Exporta los datos de esta unidad para el catálogo HSK.
export const unidad1 = {
  // Indica el nivel, el número y el título de la unidad.
  hsk: 2,
  id: 1,
  titulo: 'Rutina diaria',
  // Localiza el mapa de tiempos de las grabaciones tomando este archivo como base.
  audio: {
    mapa: new URL('../../../audios/hsk2/unidad1/tiempos.json', import.meta.url).href
  },
  // Lista las palabras: hanzi, pinyin y español, con un ejemplo en los tres formatos.
  vocabulario: [
    {
      hanzi: '早上', pinyin: 'zǎoshang', spanish: 'mañana / por la mañana',
      example: '我每天早上喝咖啡。', examplePinyin: 'wǒ měitiān zǎoshang hē kāfēi.', exampleSpanish: 'Todos los días tomo café por la mañana.'
    },
    {
      hanzi: '晚上', pinyin: 'wǎnshang', spanish: 'noche / por la noche',
      example: '我晚上十一点睡觉。', examplePinyin: 'wǒ wǎnshang shíyī diǎn shuìjiào.', exampleSpanish: 'Me voy a dormir a las once de la noche.'
    },
    {
      hanzi: '中午', pinyin: 'zhōngwǔ', spanish: 'mediodía',
      example: '我中午十二点吃饭。', examplePinyin: 'wǒ zhōngwǔ shí\'èr diǎn chīfàn.', exampleSpanish: 'Almuerzo a las doce del mediodía.'
    },
    {
      hanzi: '今天', pinyin: 'jīntiān', spanish: 'hoy',
      example: '今天我很忙。', examplePinyin: 'jīntiān wǒ hěn máng.', exampleSpanish: 'Hoy estoy muy ocupado/a.'
    },
    {
      hanzi: '明天', pinyin: 'míngtiān', spanish: 'mañana',
      example: '明天我们去学校。', examplePinyin: 'míngtiān wǒmen qù xuéxiào.', exampleSpanish: 'Mañana vamos a la escuela.'
    },
    {
      hanzi: '昨天', pinyin: 'zuótiān', spanish: 'ayer',
      example: '昨天我在家。', examplePinyin: 'zuótiān wǒ zài jiā.', exampleSpanish: 'Ayer estuve en casa.'
    },
    {
      hanzi: '后天', pinyin: 'hòutiān', spanish: 'pasado mañana',
      example: '后天我们去北京。', examplePinyin: 'hòutiān wǒmen qù Běijīng.', exampleSpanish: 'Pasado mañana vamos a Pekín.'
    },
    {
      hanzi: '前天', pinyin: 'qiántiān', spanish: 'anteayer',
      example: '前天我去了医院。', examplePinyin: 'qiántiān wǒ qù le yīyuàn.', exampleSpanish: 'Anteayer fui al hospital.'
    },
    {
      hanzi: '现在', pinyin: 'xiànzài', spanish: 'ahora / actualmente',
      example: '我现在在家。', examplePinyin: 'wǒ xiànzài zài jiā.', exampleSpanish: 'Ahora estoy en casa.'
    },
    {
      hanzi: '一会', pinyin: 'yíhuì', spanish: 'dentro de un momento / un rato',
      example: '我一会回来。', examplePinyin: 'wǒ yíhuì huílai.', exampleSpanish: 'Volveré dentro de un momento.'
    },
    {
      hanzi: '刚刚', pinyin: 'gānggāng', spanish: 'justo ahora / hace un momento',
      example: '我刚刚到家。', examplePinyin: 'wǒ gānggāng dào jiā.', exampleSpanish: 'Acabo de llegar a casa.'
    }

  ]
};
