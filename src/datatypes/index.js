import SexGenFunc from '@/datatypes/Sex/Sex';
import NameGenFunc from '@/datatypes/Name/Name';
import CounterGenFunc from '@/datatypes/Counter/Counter';
import NumberGenFunc from '@/datatypes/Number/Number';
import ProvinceGenFunc from '@/datatypes/Province/Province';
import CityGenFunc from '@/datatypes/City/City';
import DistrictGenFunc from '@/datatypes/District/District';
import DistrictCodeGenFunc from '@/datatypes/DistrictCode/DistrictCode';
import { RELATION_ENUM, OPTIONS_ENUM } from './CONST';
import OccupationData from '@/datatypes/COMMON_DATA/OccupationData.js';
import IdentificationNumberGenFunc from '@/datatypes/IdentificationNumber/IdentificationNumber';
import Str2NumberGenFunc from '@/datatypes/Str2Number/Str2Number'
import StrConcatGenFunc from '@/datatypes/StrConcat/StrConcat'
import StrSegmentGenFunc from '@/datatypes/StrSegment/StrSegment'
import TextGenFunc from '@/datatypes/Text/Text';
import RandomChoiceGenFunc from '@/datatypes/RandomChoice/RandomChoice';
import TimeGenFunc from '@/datatypes/Time/Time';
import DetailAddressGenFunc from '@/datatypes/DetailAddress/DetailAddress';
import RandomFieldGenFunc from '@/datatypes/RandomField/RandomField';
import GeographCoordinatesGenFunc from '@/datatypes/GeographCoordinates/GeographCoordinates';
import OccupationGenFunc from '@/datatypes/Occupation/Occupation';
import CarprefixGenFunc from '@/datatypes/Carprefix/Carprefix';
import RegularExpressionGenFunc from '@/datatypes/RegularExpression/RegularExpression';

export const DATA_TYPES = {
    Name: {
        alias: "姓名",
        shortAlias: "姓名",
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
    Sex: {
        alias: "性别",
        shortAlias: "性别",
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
    Province: {
        alias: "省份",
        shortAlias: "省份",
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
        shortAlias: "城市",
        genFunc: CityGenFunc,
        options: {
            Select_city_mode: OPTIONS_ENUM.City.CITY_RANDOM.CN,
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
        shortAlias: "区县",
        genFunc: DistrictGenFunc,
        options: {
            Select_district_mode: OPTIONS_ENUM.District.DISTRICT_RANDOM.CN,
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
        shortAlias: "区县码",
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
        shortAlias: "身份证",
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
    Number: {
        alias: "数字",
        shortAlias: "数字",
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
    Time: {
        alias: "时间",
        shortAlias: "时间",
        genFunc: TimeGenFunc,
        options: {
            timeCategory: 'RANDOMSING',
            timeFormat: 'FORMAT_4',
            initialTime: ["1980-01-31T16:00:00.000Z", "2018-12-31T16:00:00.000Z"],
            timeStamp: 0,
            __lastTimeValue: 0,
            minStep: 0,
            maxStep: 1
        },
        __unique: false,
        __display: true,
        relation: {
            fieldNames: "",
            minInterval: 0,
            maxInterval: 1,
            type: RELATION_ENUM.INDEPEND.EN,
            allowTypes: ["Time"],
        }
    },
    Text: {
        alias: "文本",
        shortAlias: "文本",
        genFunc: TextGenFunc,
        options: {
            textTypes: Object.keys(OPTIONS_ENUM.Text.TEXT_TYPE),
            min: 0,
            max: 10,
            fix: 10,
            lenType: OPTIONS_ENUM.Text.LEN_TYPE.FIX.EN,
            letterType: 'RANDOM'
        },
        __unique: false, // 生成结果是否是唯一值
        __display: true, // 生成结果是否包含该字段
        relation: null
    },
    Counter: {
        alias: "累加器",
        shortAlias: "累加器",
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
    Str2Number: {
        alias: "字符串转数字",
        shortAlias: "字转数",
        genFunc: Str2NumberGenFunc,
        __unique: false,
        __display: true,
        options: {
            __fieldName: ""
        },
        relation: {
            fieldNames: "",
            type: RELATION_ENUM.COR_RELATION.EN,
            expresion: '',
            allowTypes: 'ALL',
        },
    },
    StrConcat: {
        alias: "字段拼接",
        shortAlias: "字段拼",
        genFunc: StrConcatGenFunc,
        __unique: false,
        __display: true,
        options: {
            __fieldName: ""
        },
        relation: {
            fieldNames: "",
            type: RELATION_ENUM.COR_RELATION.EN,
            expresion: '',
            allowTypes: "ALL",
        },
    },
    StrSegment: {
        alias: "字段截取",
        shortAlias: "字段截",
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
            type: RELATION_ENUM.COR_RELATION.EN,
            allowTypes: "ALL",
        }
    },

    RandomChoice: {
        alias: "随机选择",
        shortAlias: "随机选",
        genFunc: RandomChoiceGenFunc,
        options: {
            RandomString: "",
        },
        __unique: false, // 生成结果是否是唯一值
        __display: true, // 生成结果是否包含该字段
        relation: null
    },
    RandomField: {
        alias: "字段随机",
        shortAlias: "字段随",
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
            minInterval: 0,
            maxInterval: 1,
            type: RELATION_ENUM.COR_RELATION.EN,
            allowTypes: "ALL",
        }
    },
    DetailAddress: {
        alias: "详细地址",
        shortAlias: "详址",
        genFunc: DetailAddressGenFunc,
        options: {
            addressType: OPTIONS_ENUM.DetailAddress.RANDOM_ADDRESS.EN,
        },
        __unique: false, // 生成结果是否是唯一值
        __display: true, // 生成结果是否包含该字段
        relation: null
    },
    GeographCoordinates: {
        alias: "经纬度",
        shortAlias: "经纬度",
        genFunc: GeographCoordinatesGenFunc,
        options: {},
        __unique: false, // 生成结果是否是唯一值
        __display: true, // 生成结果是否包含该字段
        relation: {
            fieldNames: "",
            type: RELATION_ENUM.INDEPEND.EN,
            allowTypes: ["District"],
        }
    },
    Occupation: {
        alias: "职业",
        shortAlias: "职业",
        genFunc: OccupationGenFunc,
        options: {
            occupationTypes: Object.keys(OccupationData)
        },
        __unique: false, // 生成结果是否是唯一值
        __display: true, // 生成结果是否包含该字段
        relation: {
            fieldNames: "",
            type: RELATION_ENUM.INDEPEND.EN,
            allowTypes: ["Number"],
        }
    },
    Carprefix: {
        alias: "车牌前缀",
        shortAlias: "车牌",
        genFunc: CarprefixGenFunc,
        options: {
        },
        __unique: false, // 生成结果是否是唯一值
        __display: true, // 生成结果是否包含该字段
        relation: {
            fieldNames: "",
            type: RELATION_ENUM.COR_RELATION.EN,
            allowTypes: ["City"],
        }
    },

    RegularExpression: {
        alias: "正则表达式",
        shortAlias: "正则",
        genFunc: RegularExpressionGenFunc,
        __unique: false,
        __display: true,
        options: {
            expression: '',
            outputTypes: '提取',
            __fieldName: ""
        },
        relation: {
            fieldNames: "",
            type: RELATION_ENUM.COR_RELATION.EN,
            allowTypes: "ALL",
        },
    },
};