import SexGenFunc from '@/datatypes/Sex/Sex';
import NameGenFunc from '@/datatypes/Name/Name';
import CounterGenFunc from '@/datatypes/Counter/Counter';
import NumberGenFunc from '@/datatypes/Number/Number';
import PhoneGenFunc from '@/datatypes/Phone/Phone';
import RandomChoiceGenFunc from '@/datatypes/RandomChoice/RandomChoice';
import { RELATION_ENUM } from './CONST';

export const DATA_TYPES = {
  Sex: {
    alias: "性别",
    priority: 0,
    genFunc: SexGenFunc,
    options: {
      manAlias: "男",
      womanAlias: "女",
      sex: "random",
      __unique: false, // 生成结果是否是唯一值
      __display: true, // 生成结果是否包含该字段
      __fieldName: ""  // 用于为options添加 __$$fieldname: gendata 为其关联的字段传入生成值
    },
    relation: null
  },
  Name: {
    alias: "姓名",
    priority: 1,
    genFunc: NameGenFunc,
    options: {
      sex: "random",
      __unique: false,
      __display: true,
      __fieldName: ""
    },
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
      __unique: false,
      __display: true,
      __fieldName: ""
    },
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
      __unique: false,
      __display: true,
      __fieldName: ""
    },
    relation: {
      fieldNames: "",
      type: RELATION_ENUM.INDEPEND.EN,
      expresion: '',
      allowTypes: ["Counter", "Number"],
    },
  },
  Phone: {
    alias: "电话号码",
    priority: 0,
    genFunc: PhoneGenFunc,
    options: {
      __unique: false, // 生成结果是否是唯一值
      __display: true, // 生成结果是否包含该字段
      __fieldName: ""  // 用于为options添加 __$$fieldname: gendata 为其关联的字段传入生成值
    },
    relation: null
  },
  RandomChoice: {
    alias: "随机选择",
    priority: 0,
    genFunc: RandomChoiceGenFunc,
    options: {
      RandomString: "",
      __unique: false, // 生成结果是否是唯一值
      __display: true, // 生成结果是否包含该字段
      __fieldName: ""  // 用于为options添加 __$$fieldname: gendata 为其关联的字段传入生成值
    },
    relation: null
  },
};
