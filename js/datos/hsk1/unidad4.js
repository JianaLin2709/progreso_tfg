// Exporta los datos de esta unidad para el catálogo HSK.
export const unidad4 = {
  // Indica el nivel, el número y el título de la unidad.
  hsk: 1,
  id: 4,
  titulo: 'Partes del Cuerpo',
  // Localiza el mapa de tiempos de las grabaciones tomando este archivo como base.
  audio: {
    mapa: new URL('../../../audios/hsk1/unidad4/tiempos.json', import.meta.url).href
  },
  // Lista las palabras: hanzi, pinyin y español, con un ejemplo en los tres formatos.
  vocabulario: [
    {
      hanzi: '眼睛', pinyin: 'yǎnjing', spanish: 'ojos',
      example: '她的眼睛很漂亮。', examplePinyin: 'tā de yǎnjing hěn piàoliang.', exampleSpanish: 'Sus ojos son muy bonitos.'
    },
    {
      hanzi: '鼻子', pinyin: 'bízi', spanish: 'nariz',
      example: '他的鼻子有点红。', examplePinyin: 'tā de bízi yǒudiǎn hóng.', exampleSpanish: 'Tiene la nariz un poco roja.'
    },
    {
      hanzi: '耳朵', pinyin: 'ěrduo', spanish: 'orejas',
      example: '兔子的耳朵很长。', examplePinyin: 'tùzi de ěrduo hěn cháng.', exampleSpanish: 'Las orejas del conejo son largas.'
    },
    {
      hanzi: '嘴巴', pinyin: 'zuǐba', spanish: 'boca',
      example: '请张开嘴巴。', examplePinyin: 'qǐng zhāngkāi zuǐba.', exampleSpanish: 'Abre la boca, por favor.'
    },
    {
      hanzi: '脸', pinyin: 'liǎn', spanish: 'cara / rostro',
      example: '她的脸上有笑容。', examplePinyin: 'tā de liǎn shàng yǒu xiàoróng.', exampleSpanish: 'Tiene una sonrisa en la cara.'
    },
    {
      hanzi: '头', pinyin: 'tóu', spanish: 'cabeza',
      example: '我的头有点疼。', examplePinyin: 'wǒ de tóu yǒudiǎn téng.', exampleSpanish: 'Me duele un poco la cabeza.'
    },
    {
      hanzi: '手', pinyin: 'shǒu', spanish: 'mano',
      example: '吃饭前要洗手。', examplePinyin: 'chīfàn qián yào xǐ shǒu.', exampleSpanish: 'Hay que lavarse las manos antes de comer.'
    },
    {
      hanzi: '手臂', pinyin: 'shǒubì', spanish: 'brazo',
      example: '运动以后我的手臂很累。', examplePinyin: 'yùndòng yǐhòu wǒ de shǒubì hěn lèi.', exampleSpanish: 'Después de hacer ejercicio tengo los brazos cansados.'
    },
    {
      hanzi: '脚', pinyin: 'jiǎo', spanish: 'pie',
      example: '这双鞋让我的脚很疼。', examplePinyin: 'zhè shuāng xié ràng wǒ de jiǎo hěn téng.', exampleSpanish: 'Estos zapatos me hacen daño en los pies.'
    },
    {
      hanzi: '腿', pinyin: 'tuǐ', spanish: 'pierna',
      example: '他的腿受伤了。', examplePinyin: 'tā de tuǐ shòushāng le.', exampleSpanish: 'Se ha lesionado la pierna.'
    },
    {
      hanzi: '眉毛', pinyin: 'méimao', spanish: 'cejas',
      example: '她的眉毛很浓。', examplePinyin: 'tā de méimao hěn nóng.', exampleSpanish: 'Tiene las cejas muy pobladas.'
    },
    {
      hanzi: '睫毛', pinyin: 'jiémáo', spanish: 'pestañas',
      example: '她的睫毛很长。', examplePinyin: 'tā de jiémáo hěn cháng.', exampleSpanish: 'Tiene las pestañas largas.'
    },
    {
      hanzi: '头发', pinyin: 'tóufa', spanish: 'pelo / cabello',
      example: '她有一头长头发。', examplePinyin: 'tā yǒu yì tóu cháng tóufa.', exampleSpanish: 'Tiene el pelo largo.'
    }
  ]
};
