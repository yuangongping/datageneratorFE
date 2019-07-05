import SexGenFunc from '@/datatypes/Sex/Sex';
import NameGenFunc from '@/datatypes/Name/Name';
import CounterGenFunc from '@/datatypes/Counter/Counter';
import NumberGenFunc from '@/datatypes/Number/Number';
import ProvinceGenFunc from '@/datatypes/Province/Province';
import CityGenFunc from '@/datatypes/City/City';
import DistrictGenFunc from '@/datatypes/District/District';
import DistrictCodeGenFunc from '@/datatypes/DistrictCode/DistrictCode';
import { RELATION_ENUM, SELECT_MODE_ENUM, OPTIONS_ENUM  } from './CONST';
import IdentificationNumberGenFunc from '@/datatypes/IdentificationNumber/IdentificationNumber';
import Str2NumberGenFunc from '@/datatypes/Str2Number/Str2Number'
import StrConcatGenFunc from  '@/datatypes/StrConcat/StrConcat'
import StrSegmentGenFunc from '@/datatypes/StrSegment/StrSegment'
import TextGenFunc from '@/datatypes/Text/Text';
import RandomChoiceGenFunc from '@/datatypes/RandomChoice/RandomChoice';
import TimeGenFunc from '@/datatypes/Time/Time';
import RandomFieldGenFunc from '@/datatypes/RandomField/RandomField'

export const DATA_TYPES = {
  Sex: {
    alias: "性别",
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
    genFunc: NameGenFunc,
    options: {
      sex: "random",
    },
    __unique: false, // 生成结果是否是唯一值
    __display: true, // 生成结果是否包含该字段
    relation: {
      fieldNames: "",
      type: RELATION_ENUM.INDEPEND.EN,
      allowTypes: ["Sex"],
    },
  },
  Counter: {
    alias: "累加器",
    genFunc: CounterGenFunc,
    options: {
      startNum: 0,
      division: 1,
      template: '',
    },
    __unique: false, // 生成结果是否是唯一值
    __display: true, // 生成结果是否包含该字段
    relation: null
  },
  Number: {
    alias: "数字",
    genFunc: NumberGenFunc,
    options: {
      min: 0,
      max: 100000000000000,
      decimal: 0,
    },
    __unique: false, // 生成结果是否是唯一值
    __display: true, // 生成结果是否包含该字段
    relation: {
      fieldNames: "",
      type: RELATION_ENUM.INDEPEND.EN,
      expresion: '',
      allowTypes: ["Counter", "Number"],
    },
  },
  Province: {
    alias: "省份",
    genFunc: ProvinceGenFunc,
    options: {
      provinces: [], //多选框中选中的省份数组
    },
    __unique: false, // 生成结果是否是唯一值
    __display: true, // 生成结果是否包含该字段
    relation: null
  },
  City: {
    alias: "城市",
    genFunc: CityGenFunc,
    options: {
      Select_city_mode: SELECT_MODE_ENUM.City.CITY_RANDOM.CN,
      cities: [],
      provinceChoice: []
    },
    __unique: false, // 生成结果是否是唯一值
    __display: true, // 生成结果是否包含该字段
    relation: {
      fieldNames: "",
      type: RELATION_ENUM.INDEPEND.EN,
      allowTypes: ["Province"],
    },
  },
  District: {
    alias: "区县",
    genFunc: DistrictGenFunc,
    options: {
      Select_district_mode: SELECT_MODE_ENUM.District.DISTRICT_RANDOM.CN,
      cityChoice: '', //选中的城市， 关联字段时从该城市随机选取一个区县， 作为独立组件使用时，随机生成区县
      districts: [],
      districts_dict: {}
    },
    __unique: false, // 生成结果是否是唯一值
    __display: true, // 生成结果是否包含该字段
    relation: {
      fieldNames: "",
      type: RELATION_ENUM.INDEPEND.EN,
      allowTypes: ["City"],
    },
  },
  DistrictCode: {
    alias: "区县码",
    genFunc: DistrictCodeGenFunc,
    options: {
      district_no: '', //关联字段时输出该关联区县的区县码， 独立组件时随机选取区县码
    },
    __unique: false, // 生成结果是否是唯一值
    __display: true, // 生成结果是否包含该字段
    relation: {
      fieldNames: "",
      type: RELATION_ENUM.INDEPEND.EN,
      allowTypes: ["District"],
    }
  },
  IdentificationNumber: {
    alias: "身份证",
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
  StrConcat: {
    alias: "字段拼接",
    genFunc: StrConcatGenFunc,
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
  StrSegment: {
    alias: "字段截取",
    genFunc: StrSegmentGenFunc,
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
    genFunc: TimeGenFunc,
    options: {
      timeStamp: 0,
      __lastTimeValue: 0,
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
  },
  RandomField: {
    alias: "字段随机",
    genFunc: RandomFieldGenFunc,
    __unique: false,
    __display: true,
    options: {
      __fieldName: "",
      weightFirst: 1,
      weightSecond: 1
    },
    relation: {
      fieldNames: "",
      type: RELATION_ENUM.COR_RELATION.EN,
      allowTypes: ["Sex", "Number"],

    },
  },
};
