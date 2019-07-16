const date = new Date()
var timelist = [String(date.getFullYear()), String(date.getMonth() + 1), String(date.getDate())]
  for(var i=0; i < timelist.length; i++){
    if (timelist[i].length < 2){
      timelist[i] = '0' + timelist[i];
    }
  }
const localtime = timelist[0] + '-' + timelist[1] + '-' + timelist[2] + 'T16:00:00.000Z';
const starttime = String(parseInt(timelist[0])- 100) + '-' + timelist[1] + '-' + timelist[2] + 'T16:00:00.000Z';

export const FAST_TYPES = {
  PIR: {
    alias: "人口信息表",
    config: [
      {
        "component": "NameConfig",
        "id": "15623135567590",
        "fieldName": "name",
        "dataType": "Name",
        "options": {"sex":"random"},
        "relation": {"fieldNames":"sex","type":"COR_RELATION","allowTypes":["Sex"]},
        "__unique": false,
        "__display": true
      },
      {
        "component": "SexConfig",
        "id": "15623135567591",
        "fieldName": "sex",
        "dataType": "Sex",
        "options": {"manAlias":"男","womanAlias":"女","sex":"random"},
        "relation": null,
        "__unique": false,
        "__display": true
      },
      {
        "component": "StrSegmentConfig",
        "id": "1562752459106",
        "fieldName": "year",
        "dataType": "StrSegment",
        "options": {"start":0,"end":4,"__fieldName":""},
        "relation": {"fieldNames":"birthday","type":"COR_RELATION","allowTypes":["Counter","Number"]},
        "__unique": false,
        "__display": false
      },
      {
        "component": "Str2NumberConfig",
        "id": "1562752478569",
        "fieldName": "year_num",
        "dataType": "Str2Number",
        "options": {"__fieldName":""},
        "relation": {"fieldNames":"year","type":"COR_RELATION","expresion":"","allowTypes":["Counter","Number"]},
        "__unique": false,
        "__display": false
      },
      {
        "component": "NumberConfig",
        "id": "1562752502439",
        "fieldName": "age",
        "dataType": "Number",
        "options": {"min":0,"max":100000000000000,"decimal":0},
        "relation": {"fieldNames":"year_num","type":"NUM_EXPRESS","expresion":"","allowTypes":["Counter","Number"],"expression":"2019-${RELATE}"},
        "__unique": false,
        "__display": true
      },
      {
        "component": "ProvinceConfig",
        "id": "15623135567592",
        "fieldName": "province",
        "dataType": "Province",
        "options": {"provinces":["云南省","四川省","贵州省"]},
        "relation": null,
        "__unique": false,
        "__display": false
      },
      {
        "component": "CityConfig",
        "id": "15623135567593",
        "fieldName": "city",
        "dataType": "City",
        "options": {"Select_city_mode":"随机城市","cities":[""],"provinceChoice":[]},
        "relation": {"fieldNames":"province","type":"COR_RELATION","allowTypes":["Province"]},
        "__unique": false,
        "__display": false
      },
      {
        "component": "DistrictConfig",
        "id": "15623135567594",
        "fieldName": "district",
        "dataType": "District",
        "options": {"Select_district_mode":"随机区县","cityChoice":"","districts":[""],"districts_dict":{}},
        "relation": {"fieldNames":"city","type":"COR_RELATION","allowTypes":["City"]},
        "__unique": false,
        "__display": false
      },
      {
        "component": "DistrictCodeConfig",
        "id": "15623135567595",
        "fieldName": "districtcode",
        "dataType": "DistrictCode",
        "options": {"district_no":""},
        "relation": {"fieldNames":"district","type":"COR_RELATION","allowTypes":["District"]},
        "__unique": false,
        "__display": false
      },
      {
        "component": "TimeConfig",
        "id": "15623135567596",
        "fieldName": "birthday",
        "dataType": "Time",
        "options": {"timeStamp":0,"__lastTimeValue":0,"minStep":0,"maxStep":1,"initialTime":[starttime,localtime],"timeCategory":"RANDOMSING","timeFormat":"FORMAT_5"},
        "relation": {"fieldNames":"","minInterval":0,"maxInterval":1,"type":"INDEPEND","allowTypes":["Time"]},
        "__unique": false,
        "__display": false
      },
      {
        "component": "DetailAddressConfig",
        "id": "1562313627800",
        "fieldName": "address",
        "dataType": "DetailAddress",
        "options": {"addressType":"RANDOM_ADDRESS"},
        "relation": null,
        "__unique": false,
        "__display": false
      },
      {
        "component": "StrConcatConfig",
        "id": "1562313563166",
        "fieldName": "detail_address",
        "dataType": "StrConcat",
        "options": {"__fieldName":""},
        "relation": {"fieldNames":"province,city,district,address","type":"COR_RELATION","expresion":"","allowTypes":["Counter","Number"]},
        "__unique": false,
        "__display": true
      },
      {
        "component": "RandomChoiceConfig",
        "id": "15623136855140",
        "fieldName": "phonePrefix",
        "dataType": "RandomChoice",
        "options": {"RandomString":"130,131,132,155,156,185,186,135,136,137,138,139,147,150,151,152,157,158,133,153,180,189","__fieldName":"phonePrefix"},
        "relation": null,
        "__unique": false,
        "__display": false
      },
      {
        "component": "IdentificationNumberConfig",
        "id": "15623135567597",
        "fieldName": "id_card",
        "dataType": "IdentificationNumber",
        "options": {"__fieldName":""},
        "relation": {"fieldNames":"districtcode,birthday,sex","type":"COR_RELATION","allowTypes":["Sex","Number"]},
        "__unique": true,
        "__display": true
      },
      {
        "component": "TextConfig",
        "id": "15623136855141",
        "fieldName": "phoneSuffix",
        "dataType": "Text",
        "options": {"fix":8,"lenType":"FIX","max":10,"min":0,"textTypes":["NUMBER"],"__fieldName":"phoneSuffix"},
        "relation": null,
        "__unique": false,
        "__display": false
      },
      {
        "component": "StrConcatConfig",
        "id": "15623136855142",
        "fieldName": "phone",
        "dataType": "StrConcat",
        "options": {"__fieldName":"phone"},
        "relation": {"fieldNames":"phonePrefix,phoneSuffix","type":"COR_RELATION"},
        "__unique": false,
        "__display": true
      },
      {
        "component": "OccupationConfig",
        "id": "1562659830842",
        "fieldName": "occupation",
        "dataType": "Occupation",
        "options": {"occupationTypes":["高级管理","技术","运维/技术支持","大数据","项目管理","硬件开发","通信","电子/半导体","高端技术职位","软件销售支持","产品","设计","编辑","客服","市场","公关媒介","广告","人事/财务/行政","财务","法务","销售","金融","银行","教育","医疗健康","仓储","房地产/建筑","其他"]},
        "relation": {"fieldNames":"age","type":"COR_RELATION","allowTypes":["Time"]},
        "__unique": false,
        "__display": true
      }
    ]
  },

  FLIGHT: {
    alias: "航班信息表",
    config: [
      {
        "component": "RandomChoiceConfig",
        "id": "1562123220530",
        "fieldName": "airlines",
        "dataType": "RandomChoice",
        "options": {"RandomString":"CA,MU,CZ,PN,MF,SC,EU,ZH,FM"},
        "relation": null,
        "__unique": false,
        "__display": false
      },
      {
        "component": "TextConfig",
        "id": "1562123467908",
        "fieldName": "areacode",
        "dataType": "Text",
        "options": {"textTypes":["NUMBER"],"min":0,"max":10,"fix":4,"lenType":"FIX"},
        "relation": null,
        "__unique": false,
        "__display": false
      },
      {
        "component": "strConcatConfig",
        "id": "1562123485891",
        "fieldName": "FlightNo",
        "dataType": "StrConcat",
        "options": {"__fieldName":""},
        "relation": {"fieldNames":"airlines,areacode","type":"COR_RELATION","expresion":"","allowTypes":["Counter","Number"]},
        "__unique": false,
        "__display": true
      },
      {
        "component": "CityConfig",
        "id": "1562123635867",
        "fieldName": "from",
        "dataType": "City",
        "options": {"Select_city_mode":"随机城市","cities":[],"provinceChoice":[]},
        "relation": {"fieldNames":"","type":"INDEPEND","allowTypes":["Province"]},
        "__unique": false,
        "__display": true
      },
      {
        "component": "CityConfig",
        "id": "1562123695387",
        "fieldName": "to",
        "dataType": "City",
        "options": {"Select_city_mode":"随机城市","cities":[""],"provinceChoice":[]},
        "relation": {"fieldNames":"","type":"INDEPEND","allowTypes":["Province"]},
        "__unique": false,
        "__display": true
      },
      {
        "component": "TimeConfig",
        "id": "15623158009915",
        "fieldName": "departure_time",
        "dataType": "Time",
        "options": {"timeStamp":0,"__lastTimeValue":0,"minStep":0,"maxStep":1,"initialTime":["2019-07-02T08:00:00.000Z","2019-07-26T08:00:00.000Z"],"timeCategory":"randomSingleTime","timeFormat":"FORMAT_6"},
        "relation": {"fieldNames":"","minInterval":0,"maxInterval":1,"type":"INDEPEND","allowTypes":["Time"]},
        "__unique": false,
        "__display": true
      },
      {
        "component": "RandomChoiceConfig",
        "id": "1562124104694",
        "fieldName": "status",
        "dataType": "RandomChoice",
        "options": {"RandomString":"起飞,到达,取消"},
        "relation": null,
        "__unique": false,
        "__display": true
      }
    ]
  },

  EMAIL:{
    alias: "电子邮箱",
    config: [
      //生成qq号
      {
        "component": "NumberConfig",
        "id": "1562123467908",
        "fieldName": "QQPrefix",
        "dataType": "Number",
        "options": {
          "decimal": 0,
          "max": 100000000000000,
          "min": 1000000,
          "__display": true,
          "__unique": false
        },
        "relation": {
          "type": "INDEPEND"
        },
        "__unique": true,
        "__display": false
      },
      // qq邮箱后缀
      {
        "component": "RandomChoiceConfig",
        "id": "1562123220530",
        "fieldName": "QQSuffix",
        "dataType": "RandomChoice",
        "options": {"RandomString":"@qq.com"},
        "relation": null,
        "__unique": false,
        "__display": false
      },
      // 拼接qq号与邮箱后缀
      {
        "component": "StrConcatConfig",
        "dataType": "StrConcat",
        "fieldName": "QQEmail",
        "id": "1562297401908",
        "options": {
          "__fieldName": "QQEmail",
          "__unique": false,
          "__display": false
        },
        "relation":{
          "expresion": "",
          "fieldNames": "QQPrefix,QQSuffix",
          "type": "COR_RELATION"
        },
        "__display": false,
        "__unique": false
      },
      // 随机生成账号
      {
        "component": "TextConfig",
        "id": "1562123467908",
        "fieldName": "prefix",
        "dataType": "Text",
        "options": {"textTypes":["NUMBER", "ENGLISH"],"min":6,"max":14,"fix":'',"lenType":"RANDOM"},
        "relation": null,
        "__unique": true,
        "__display": false
      },
      // 随机后缀
      {
        "component": "RandomChoiceConfig",
        "id": "1562123220530",
        "fieldName": "suffix",
        "dataType": "RandomChoice",
        "options": {"RandomString":"@126.com, @163.com, @sina.com, @sohu.com, @yahoo.com.cn"},
        "relation": null,
        "__unique": false,
        "__display": false
      },
       // 拼接其他邮箱账号与后缀
      {
        "component": "StrConcatConfig",
        "dataType": "StrConcat",
        "fieldName": "OtherEmail",
        "id": "1562297401908",
        "options": {
          "__fieldName": "QQEmail",
          "__unique": false,
          "__display": true
        },
        "relation":{
          "fieldNames": "prefix,suffix",
          "type": "COR_RELATION"
        },
        "__display": false,
        "__unique": false
      },

      // 最忌选择组件，获得最后的额邮箱
      {
        "component": "RandomFieldConfig",
        "id": "1562123220530",
        "fieldName": "email",
        "dataType": "RandomField",
        "options": {
          "weightFirst": 1,
          "weightSecond": 2,
          "__display": true,
          "__fieldName": "email",
          "__unique": false
        },
        "relation": {
          "fieldNames": "QQEmail,OtherEmail",
          "type": "COR_RELATION",
          "__display": true,
          "__unique": false
        },
          "__unique": false,
          "__display": true
      },

    ]
  },

  PHONE:{
    alias: "联系电话",
    config: [
      // 号码前缀，即前三位
      {
        "component": "RandomChoiceConfig",
        "dataType": "RandomChoice",
        "fieldName": "phonePrefix",
        "id": "1562299050493",
        "options": {
          "RandomString": "130,131,132,155,156,185,186,135,136,137,138,139,147,150,151,152,157,158,133,153,180,189", 
          " __unique": false, 
          "__display": true, 
          "__fieldName": "phonePrefix",
        },
        "relation": null,
        "__display": false,
        "__unique": false
      },
      // 号码的后缀，后8位
      {
        "component": "TextConfig",
        "dataType": "Text",
        "fieldName": "phoneSuffix",
        "id": "1562299508691",
        "options": {
          "fix": 8,
          "lenType": "FIX",
          "max": 10,
          "min": 0,
          "textTypes": ["NUMBER"],
          "__display": true,
          "__fieldName": "phoneSuffix",
          "__unique": false,
        },
        "relation": null,
        "__display": false,
        "__unique": false,

      },
      // 前三位与后三位拼接
      {
        "component": "StrConcatConfig",
        "dataType": "StrConcat",
        "fieldName": "phone",
        "id": "1562306610410",
        "options": {
          "__fieldName": "phone", 
          "__unique": false,
          "__display": true
        },
        "relation": {
          "fieldNames": "phonePrefix,phoneSuffix", 
          "type": "COR_RELATION", 
         },
        "__display": true,
        "__unique": false,
      }
    ]
  },
  CALLRECORD: {
    alias: "通话记录",
    config: [
      {
        "component": "RandomChoiceConfig",
        "id": "15626601979910",
        "fieldName": "originatingPrefix",
        "dataType": "RandomChoice",
        "options": {"RandomString":"130,131,132,155,156,185,186,135,136,137,138,139,147,150,151,152,157,158,133,153,180,189"," __unique":false,"__display":true,"__fieldName":"phonePrefix"},
        "relation": null,
        "__unique": false,
        "__display": false
      },
      {
        "component": "TextConfig",
        "id": "15626601979911",
        "fieldName": "originatingSuffix",
        "dataType": "Text",
        "options": {"fix":8,"lenType":"FIX","max":10,"min":0,"textTypes":["NUMBER"],"__display":true,"__fieldName":"phoneSuffix","__unique":false},
        "relation": null,
        "__unique": false,
        "__display": false
      },
      {
        "component": "StrConcatConfig",
        "id": "15626601979912",
        "fieldName": "originating_call",
        "dataType": "StrConcat",
        "options": {"__fieldName":"phone","__unique":false,"__display":true},
        "relation": {"fieldNames":"originatingPrefix,originatingSuffix","type":"COR_RELATION"},
        "__unique": false,
        "__display": true
      },
      {
        "component": "RandomChoiceConfig",
        "id": "15626610637340",
        "fieldName": "terminatingPrefix",
        "dataType": "RandomChoice",
        "options": {"RandomString":"130,131,132,155,156,185,186,135,136,137,138,139,147,150,151,157,158,133,153,180,189"," __unique":false,"__display":true,"__fieldName":"phonePrefix"},
        "relation": null,
        "__unique": false,
        "__display": false
      },
      {
        "component": "TextConfig",
        "id": "15626610637341",
        "fieldName": "terminatingSuffix",
        "dataType": "Text",
        "options": {"fix":8,"lenType":"FIX","max":10,"min":0,"textTypes":["NUMBER"],"__display":true,"__fieldName":"phoneSuffix","__unique":false},
        "relation": null,
        "__unique": false,
        "__display": false
      },
      {
        "component": "StrConcatConfig",
        "id": "1562660318155",
        "fieldName": "terminating_call",
        "dataType": "StrConcat",
        "options": {"__fieldName":""},
        "relation": {"fieldNames":"terminatingPrefix,terminatingSuffix","type":"COR_RELATION","expresion":"","allowTypes":["Counter","Number"]},
        "__unique": false,
        "__display": true
      },
      {
        "component": "TimeConfig",
        "id": "1562660369232",
        "fieldName": "start_time",
        "dataType": "Time",
        "options": {"timeStamp":0,"__lastTimeValue":0,"minStep":0,"maxStep":1,"initialTime":["2019-06-30T16:00:00.000Z","2019-07-11T16:00:00.000Z"],"timeCategory":"RANDOMSING","timeFormat":"FORMAT_1"},
        "relation": {"fieldNames":"","minInterval":0,"maxInterval":1,"type":"INDEPEND","allowTypes":["Time"]},
        "__unique": false,
        "__display": true
      },
      {
        "component": "NumberConfig",
        "id": "1562660812552",
        "fieldName": "talk_time",
        "dataType": "Number",
        "options": {"min":0,"max":5,"decimal":2},
        "relation": {"fieldNames":"","type":"INDEPEND","expresion":"","allowTypes":["Counter","Number"]},
        "__unique": false,
        "__display": true
      }
    ]
  }

};

