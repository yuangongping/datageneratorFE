import SexGenFunc from '@/datatypes/Sex/Sex';
import NameGenFunc from '@/datatypes/Name/Name';
import CounterGenFunc from '@/datatypes/Counter/Counter';
import NumberGenFunc from '@/datatypes/Number/Number';
import IdentificationNumberGenFunc from '@/datatypes/IdentificationNumber/IdentificationNumber';
import Str2NumberGenFunc from '@/datatypes/Str2Number/Str2Number'
import StrSpliceGenFunc from  '@/datatypes/StrSplice/StrSplice'
import StrSegmenteGenFunc from '@/datatypes/StringSegmente/StringSegmente'
import TextGenFunc from '@/datatypes/Text/Text';
import RandomChoiceGenFunc from '@/datatypes/RandomChoice/RandomChoice';
import { RELATION_ENUM, OPTIONS_ENUM } from './CONST';
import TimeGenFunc from '@/datatypes/Time/Time';

export const DATA_TYPES = {
  Sex: {
    alias: "性别",
    priority: 0,
    genFunc: SexGenFunc,
    options: {
      manAlias: "男",
      womanAlias: "女",
      sex: "random",
    },
    __unique: false, // 生成结果是否是唯一值
    __display: true, // 生成结果是否包含该字段
    relation: null
  },
  Name: {
    alias: "姓名",
    priority: 1,
    genFunc: NameGenFunc,
    options: {
      sex: "random",
    },
    __unique: false,
    __display: true,
    relation: {
      fieldNames: "",
      type: RELATION_ENUM.INDEPEND.EN,
      allowTypes: ["Sex"],
    },
  },
  Counter: {
    alias: "累加器",
    priority: 0,
    genFunc: CounterGenFunc,
    options: {
      startNum: 0,
      division: 1,
      template: '',
    },
    __unique: false,
    __display: true,
    relation: null
  },
  Number: {
    alias: "数字",
    priority: 100,
    genFunc: NumberGenFunc,
    options: {
      min: 0,
      max: 10,
      decimal: 0,
    },
    __unique: false,
    __display: true,
    relation: {
      fieldNames: "",
      type: RELATION_ENUM.INDEPEND.EN,
      expresion: '',
      allowTypes: ["Counter", "Number"],
    },
  },
  IdentificationNumber: {
    alias: "身份证",
    priority: 100,
    genFunc: IdentificationNumberGenFunc,
    __unique: false,
    __display: true,
    options: {
      __fieldName: ""
    },
    relation: {
      fieldNames: "",
      type: RELATION_ENUM.INDEPEND.EN,
      allowTypes: ["Sex", "Number"],
    },
  },
  Str2Number: {
    alias: "字符串转数字",
    priority: 200,
    genFunc: Str2NumberGenFunc,
    __unique: false,
    __display: true,
    options: {
      __fieldName: ""
    },
    relation: {
      fieldNames: "",
      type: RELATION_ENUM.INDEPEND.EN,
      expresion: '',
      allowTypes: ["Counter", "Number"],
    },
  },
  StrSplice: {
    alias: "字符串拼接",
    priority: 200,
    genFunc: StrSpliceGenFunc,
    __unique: false,
    __display: true,
    options: {
      __fieldName: ""
    },
    relation: {
      fieldNames: "",
      type: RELATION_ENUM.INDEPEND.EN,
      expresion: '',
      allowTypes: ["Counter", "Number"],
    },
  },
  StringSegmente: {
    alias: "字符串分割",
    priority: 200,
    genFunc: StrSegmenteGenFunc,
    __unique: false,
    __display: true,
    options: {
      start: 0,
      end: 0,
      __fieldName: ""
    },
    relation: {
      fieldNames: "",
      type: RELATION_ENUM.INDEPEND.EN,
      allowTypes: ["Counter", "Number"],
    }
  },
  Text: {
    alias: "文本",
    priority: 0,
    genFunc: TextGenFunc,
    options: {
      textTypes: Object.keys(OPTIONS_ENUM.Text.TEXT_TYPE),
      min: 0,
      max: 10,
      fix: 10,
      lenType: OPTIONS_ENUM.Text.LEN_TYPE.FIX.EN,
     },
    __unique: false, // 生成结果是否是唯一值
    __display: true, // 生成结果是否包含该字段
    relation: null
  },
  RandomChoice: {
    alias: "随机选择",
    priority: 0,
    genFunc: RandomChoiceGenFunc,
    options: {
      RandomString: "",
    },
    __unique: false, // 生成结果是否是唯一值
    __display: true, // 生成结果是否包含该字段
    relation: null
  },
  Time: {
    alias: "时间",
    priority: 105,
    genFunc: TimeGenFunc,
    options: {
      __lastTimeValue:0,
      minStep:0,
      maxStep:1
    },
    __unique: false,
    __display: true,
    relation: {
      fieldNames: "",
      minInterval:0,
      maxInterval:1,
      type: RELATION_ENUM.INDEPEND.EN,
      allowTypes: ["Time"],
    }
  }
};
