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
  City: ['INDEPEND', 'COR_RELATION'],
  District: ['INDEPEND', 'COR_RELATION'],
  DistrictCode: ['INDEPEND', 'COR_RELATION']
}

export const SELECT_MODE_ENUM ={
  City: {
    CITY_RANDOM: {
      EN: "CITY_RANDOM",
      CN: "随机城市"
    },
    CITY_SELECTABLE: {
      EN: "CITY_SELECTABLE",
      CN: "自选城市"
    }
  },
  District: {
    DISTRICT_RANDOM: {
      EN: "DISTRICT_RANDOM",
      CN: "随机区县"
    },
    DISTRICT_SELECTABLE: {
      EN: "DISTRICT_SELECTABLE",
      CN: "自选区县"
    }
  }
}

export const FIELD_PRE = '__$$'; // 用于为options添加 __$$fieldname: gendata 为其关联的字段传入生成值
