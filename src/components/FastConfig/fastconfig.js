export const FAST_TYPES = {
  PIR: {
    alias: "人口信息",
    config: [
      {
        "component": "NameConfig",
        "id": "1562119605868",
        "fieldName": "name",
        "dataType": "Name",
        "options": { "sex": "random" },
        "relation": {"fieldNames":"sex","type":"COR_RELATION","allowTypes":["Sex"]},
        "__unique": false,
        "__display": true
      },
      {
        "component": "SexConfig",
        "id": "1562119618179",
        "fieldName": "sex",
        "dataType": "Sex",
        "options": {"manAlias":"男","womanAlias":"女","sex":"random"},
        "relation": null,
        "__unique": false,
        "__display": true
      },
      {
        "component": "ProvinceConfig",
        "id": "1562119624356",
        "fieldName": "province",
        "dataType": "Province",
        "options": {"provinces":["云南省","四川省","贵州省"]},
        "relation": null,
        "__unique": false,
        "__display": true
      },
      {
        "component": "CityConfig",
        "id": "1562119635962",
        "fieldName": "city",
        "dataType": "City",
        "options": {"Select_city_mode":"随机城市","cities":[""],"provinceChoice":[]},
        "relation": {"fieldNames":"province","type":"COR_RELATION","allowTypes":["Province"]},
        "__unique": false,
        "__display": true
      },
      {
        "component": "DistrictConfig",
        "id": "1562119649641",
        "fieldName": "district",
        "dataType": "District",
        "options": {"Select_district_mode":"随机区县","cityChoice":"","districts":[""],"districts_dict":{}},
        "relation": {"fieldNames":"city","type":"COR_RELATION","allowTypes":["City"]},
        "__unique": false,
        "__display": true
      },
      {
        "component": "DistrictCodeConfig",
        "id": "1562119674077",
        "fieldName": "districtcode",
        "dataType": "DistrictCode",
        "options": {"district_no":""},
        "relation": {"fieldNames":"district","type":"COR_RELATION","allowTypes":["District"]},
        "__unique": false,
        "__display": false
      },
      {
        "component": "TimeConfig",
        "id": "1562119696002",
        "fieldName": "time",
        "dataType": "Time",
        "options": {"timeStamp":0,"__lastTimeValue":0,"minStep":0,"maxStep":1,"initialTime":["2019-07-02T16:00:00.000Z","2019-07-26T16:00:00.000Z"],"timeCategory":"randomSingleTime","timeFormat":"FORMAT_5"},
        "relation": {"fieldNames":"","minInterval":0,"maxInterval":1,"type":"INDEPEND","allowTypes":["Time"]},
        "__unique": false,
        "__display": false
      },
      {
        "component": "IdentificationNumberConfig",
        "id": "1562119717173",
        "fieldName": "id_card",
        "dataType": "IdentificationNumber",
        "options": {"__fieldName":""},
        "relation": {"fieldNames":"districtcode,time,sex","type":"COR_RELATION","allowTypes":["Sex","Number"]},
        "__unique": false,
        "__display": true
      }
    ]
  },
  FLIGHT: {
    alias: "航班信息",
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
        "component": "StrSpliceConfig",
        "id": "1562123485891",
        "fieldName": "FlightNo",
        "dataType": "StrSplice",
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
        "id": "1562124059933",
        "fieldName": "time",
        "dataType": "Time",
        "options": {"timeStamp":0,"__lastTimeValue":0,"minStep":0,"maxStep":1,"initialTime":["2019-07-02T16:00:00.000Z","2019-07-26T16:00:00.000Z"],"timeCategory":"randomSingleTime","timeFormat":"FORMAT_4"},
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
  }
};

