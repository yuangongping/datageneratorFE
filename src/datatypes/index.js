import SexGenFunc from '@/datatypes/Sex/Sex';
import NameGenFunc from '@/datatypes/Name/Name';
import CounterGenFunc from '@/datatypes/Counter/Counter';
import NumberGenFunc from '@/datatypes/Number/Number';
import ProvinceGenFunc from '@/datatypes/Province/Province';
import CityGenFunc from '@/datatypes/City/City';
import DistrictGenFunc from '@/datatypes/District/District';
import DistrictCodeGenFunc from '@/datatypes/DistrictCode/DistrictCode';
import { RELATION_ENUM, SELECT_MODE_ENUM } from './CONST';

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
      max: 10,
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
      cities: [""],
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
      districts: [""],
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
    },
  }
};
