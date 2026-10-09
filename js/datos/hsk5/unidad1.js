// Exporta los datos de esta unidad para el catálogo HSK.
export const unidad1 = {
  // Indica el nivel, el número y el título de la unidad.
  hsk: 5,
  id: 1,
  titulo: 'Economía',
  // Localiza la grabación y el mapa de fragmentos de esta unidad.
  audio: {
    mapa: new URL('../../../audios/hsk5/unidad1/tiempos.json', import.meta.url).href
  },
  // Lista las palabras: hanzi, pinyin y español, con un ejemplo en los tres formatos.
  vocabulario: [
    {
      hanzi: '企业', pinyin: 'qǐyè', spanish: 'empresa',
      example: '这家企业有五百多名员工。', examplePinyin: 'zhè jiā qǐyè yǒu wǔbǎi duō míng yuángōng.', exampleSpanish: 'Esta empresa tiene más de quinientos empleados.'
    },
    {
      hanzi: '管理', pinyin: 'guǎnlǐ', spanish: 'gestionar / administración',
      example: '她负责管理这个部门。', examplePinyin: 'tā fùzé guǎnlǐ zhè ge bùmén.', exampleSpanish: 'Ella se encarga de gestionar este departamento.'
    },
    {
      hanzi: '市场', pinyin: 'shìchǎng', spanish: 'mercado',
      example: '这种产品很受市场欢迎。', examplePinyin: 'zhè zhǒng chǎnpǐn hěn shòu shìchǎng huānyíng.', exampleSpanish: 'Este producto tiene muy buena acogida en el mercado.'
    },
    {
      hanzi: '经济', pinyin: 'jīngjì', spanish: 'economía',
      example: '旅游业促进了当地经济发展。', examplePinyin: 'lǚyóuyè cùjìn le dāngdì jīngjì fāzhǎn.', exampleSpanish: 'El turismo ha impulsado el desarrollo económico local.'
    },
    {
      hanzi: '顾客', pinyin: 'gùkè', spanish: 'cliente',
      example: '顾客对服务非常满意。', examplePinyin: 'gùkè duì fúwù fēicháng mǎnyì.', exampleSpanish: 'El cliente está muy satisfecho con el servicio.'
    },
    {
      hanzi: '投资', pinyin: 'tóuzī', spanish: 'invertir / inversión',
      example: '公司决定投资新能源项目。', examplePinyin: 'gōngsī juédìng tóuzī xīn néngyuán xiàngmù.', exampleSpanish: 'La empresa decidió invertir en un proyecto de energía renovable.'
    },
    {
      hanzi: '利润', pinyin: 'lìrùn', spanish: 'beneficio / ganancia',
      example: '今年公司的利润增加了。', examplePinyin: 'jīnnián gōngsī de lìrùn zēngjiā le.', exampleSpanish: 'Este año han aumentado los beneficios de la empresa.'
    },
    {
      hanzi: '亏损', pinyin: 'kuīsǔn', spanish: 'tener pérdidas / pérdida',
      example: '这家商店连续两年亏损。', examplePinyin: 'zhè jiā shāngdiàn liánxù liǎng nián kuīsǔn.', exampleSpanish: 'Esta tienda ha tenido pérdidas durante dos años consecutivos.'
    },
    {
      hanzi: '股票', pinyin: 'gǔpiào', spanish: 'acción bursátil',
      example: '他买了一些科技公司的股票。', examplePinyin: 'tā mǎi le yìxiē kējì gōngsī de gǔpiào.', exampleSpanish: 'Compró acciones de varias empresas tecnológicas.'
    },
    {
      hanzi: '合同', pinyin: 'hétong', spanish: 'contrato',
      example: '双方已经签署了合同。', examplePinyin: 'shuāngfāng yǐjīng qiānshǔ le hétong.', exampleSpanish: 'Ambas partes ya han firmado el contrato.'
    },
    {
      hanzi: '产品', pinyin: 'chǎnpǐn', spanish: 'producto',
      example: '这款产品的质量很好。', examplePinyin: 'zhè kuǎn chǎnpǐn de zhìliàng hěn hǎo.', exampleSpanish: 'Este producto es de muy buena calidad.'
    },
    {
      hanzi: '竞争', pinyin: 'jìngzhēng', spanish: 'competencia / competir',
      example: '两家公司之间的竞争很激烈。', examplePinyin: 'liǎng jiā gōngsī zhījiān de jìngzhēng hěn jīliè.', exampleSpanish: 'La competencia entre las dos empresas es intensa.'
    },
    {
      hanzi: '经济', pinyin: 'jīngjì', spanish: 'economía',
      example: '全球经济正在逐渐恢复。', examplePinyin: 'quánqiú jīngjì zhèngzài zhújiàn huīfù.', exampleSpanish: 'La economía mundial se está recuperando gradualmente.'
    }
  ]
};
