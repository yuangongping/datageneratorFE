export const RELATION_ENUM = {
  INDEPEND: {
    EN: "INDEPEND",
    CN: "独立字段"
  },
  COR_RELATION: {
    EN: "COR_RELATION",
    CN: "值相关"
  },
  GREATER: {
    EN: "GREATER",
    CN: "大于等于关联值"
  },
  LITTER: {
    EN: "LITTER",
    CN: "小于等于关联值"
  },
  NUM_EXPRESS: {
    EN: "NUM_EXPRESS",
    CN: "数字表达式"
  },
  STRING_EXPRESS: {
    EN: "STRING_EXPRESS",
    CN: "字符串表达式"
  }
}

export const ALLOW_RELATIONS = {
  Name: ['INDEPEND', 'COR_RELATION'],
  Number: ['INDEPEND', 'GREATER', 'LITTER', 'NUM_EXPRESS']
}

export const Text_ENUM = {
  FIXED_LENGTH: {
    EN: "FIXED_LENGTH",
    CN: "固定长度"
  },
  RANDOM_LENGTH: {
    EN: "RANDOM_LENGTH",
    CN: "随机长度"
  },
  NUMBER_TYPE:{
    EN: "NUMBER_TYPE",
    CN: "数字"
  },
  ENGLISH_YTPE:{
    EN: "ENGLISH_YTPE",
    CN: "字母"
  },
  CHINESE_TYPE:{
    EN: "CHINESE_TYPE",
    CN: "中文"
  }
}

export const Text_Type_EN = {
  text_lenth_arr:['FIXED_LENGTH', 'RANDOM_LENGTH'],
  text_type_arr: ['NUMBER_TYPE', 'ENGLISH_YTPE', 'CHINESE_TYPE']
}

export const FIELD_PRE = '__$$'; // 用于为options添加 __$$fieldname: gendata 为其关联的字段传入生成值
