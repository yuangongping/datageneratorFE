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
  Number: ['INDEPEND', 'GREATER', 'LITTER', 'NUM_EXPRESS'],
  Time: ['INDEPEND', 'GREATER']
}


export const FIELD_PRE = '__$$'; // 用于为options添加 __$$fieldname: gendata 为其关联的字段传入生成值
