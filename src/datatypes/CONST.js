export const RELATION_ENUM = {
  INDEPEND: {
    EN: 'INDEPEND',
    CN: '独立字段'
  },
  COR_RELATION: {
    EN: 'COR_RELATION',
    CN: '值相关'
  },
  GREATER: {
    EN: 'GREATER',
    CN: '大于等于关联值'
  },
  LITTER: {
    EN: 'LITTER',
    CN: '小于等于关联值'
  },
  NUM_EXPRESS: {
    EN: 'NUM_EXPRESS',
    CN: '数字表达式'
  },
  STRING_EXPRESS: {
    EN: 'STRING_EXPRESS',
    CN: '字符串表达式'
  }
}

export const ALLOW_RELATIONS = {
  Name: ['INDEPEND', 'COR_RELATION'],
  Number: ['INDEPEND', 'GREATER', 'LITTER', 'NUM_EXPRESS'],
  City: ['INDEPEND', 'COR_RELATION'],
  District: ['INDEPEND', 'COR_RELATION'],
  DistrictCode: ['INDEPEND', 'COR_RELATION'],
  IdentificationNumber: ['INDEPEND', 'COR_RELATION'],
  Str2Number: ['COR_RELATION'],
  StrConcat: ['COR_RELATION'],
  StrSegment:  ['COR_RELATION'],
  Time: ['INDEPEND', 'GREATER'],
  RandomField: ['COR_RELATION'],
  GeographCoordinates: ['INDEPEND', 'COR_RELATION'],
  Occupation: ['INDEPEND', 'COR_RELATION'],
  Carprefix: ['COR_RELATION'],
  RegularExpression: ['COR_RELATION'],
  LogicOperation: ['COR_RELATION'],
}

export const OPTIONS_ENUM = {
  Text: {
    LEN_TYPE: {
      FIX: {
        EN: 'FIX',
        CN: '固定长度'
      },
      RANDOM: {
        EN: 'RANDOM',
        CN: '随机长度'
      },
    },
    TEXT_TYPE: {
      CHINESE:{
        EN: 'CHINESE',
        CN: '中文'
      },
      ENGLISH:{
        EN: 'ENGLISH',
        CN: '字母'
      },
      NUMBER:{
        EN: 'NUMBER',
        CN: '数字'
      },
    },
    LETTER_TYPE: {
      RANDOM: {
        EN: 'RANDOM',
        CN: '随机大小写'
      },
      UPPER: {
        EN: 'UPPER',
        CN: '仅大写'
      },
      LOWER: {
        EN: 'LOWER',
        CN: '仅小写'
      },
    },
  },
  City: {
    CITY_RANDOM: {
      EN: 'CITY_RANDOM',
      CN: '随机城市'
    },
    CITY_SELECTABLE: {
      EN: 'CITY_SELECTABLE',
      CN: '自选城市'
    }
  },
  District: {
    DISTRICT_RANDOM: {
      EN: 'DISTRICT_RANDOM',
      CN: '随机区县'
    },
    DISTRICT_SELECTABLE: {
      EN: 'DISTRICT_SELECTABLE',
      CN: '自选区县'
    }
  },
  DetailAddress: {
    RANDOM_ADDRESS: {
      EN: 'RANDOM_ADDRESS',
      CN: '城区/乡镇'
    },
    CITY_ADDRESS: {
      EN: 'CITY_ADDRESS',
      CN: '城区'
    },
    VILLAGE_ADDRESS: {
      EN: 'VILLAGE_ADDRESS',
      CN: '乡镇'
    }
  },  
  Time: {
    TIME_TYPE: {
      RANDOMSING: {
        EN: 'RANDOMSING',
        CN: '随机时刻'
      },
      FIX: {
        EN: 'FIX',
        CN: '固定步长递增'
      },
      RANDOMINCREMENT: {
        EN: 'RANDOMINCREMENT',
        CN: '随机递增'
      }
    },
    TIME_STYLE: {
      FORMAT_1: {
        EN: 'FORMAT_1',
        CN: 'yyyy-MM-dd HH:mm:ss'
      },
      FORMAT_2: {
        EN: 'FORMAT_2',
        CN: 'yyyy-MM-dd'
      },
      FORMAT_3: {
        EN: 'FORMAT_3',
        CN: '年/月/日'
      },
      FORMAT_4: {
        EN: 'FORMAT_4',
        CN: '年/月/日/时/分'
      },
      FORMAT_5: {
        EN: 'FORMAT_5',
        CN: 'yyyymmdd'
      },
      FORMAT_6: {
        EN: 'FORMAT_6',
        CN: 'yyyy-MM-dd HH:mm'
      }
    }
  },
  LogicOperation: {
    GREATER_THAN: {
      EN: 'GREATER_THAN',
      CN: '大于'
    },
    GREATER_THAN_EQUAL_TO: {
      EN: 'GREATER_THAN_EQUAL_TO',
      CN: '大于等于'
    },
    LESS_THAN: {
      EN: 'LESS_THAN',
      CN: '小于'
    },
    LESS_THAN_EQUAL_TO: {
      EN: 'LESS_THAN_EQUAL_TO',
      CN: '小于等于'
    },
    EQUAL_TO: {
      EN: 'EQUAL_TO',
      CN: '等于'
    },
    NOT_EQUAL_TO: {
      EN: 'NOT_EQUAL_TO',
      CN: '不等于'
    },
    NULL: {
      EN: 'NULL',
      CN: '为空'
    },
    NOT_NULL: {
      EN: 'NOT_NULL',
      CN: '不为空'
    },
  }
}

export const FIELD_PRE = '__$$'; // 用于为options添加 __$$fieldname: gendata 为其关联的字段传入生成值
