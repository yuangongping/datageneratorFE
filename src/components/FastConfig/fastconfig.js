export const FAST_TYPES = {
  PIR: {
    alias: "人口信息",
    config: [
      { "component": "NameConfig", "id": "1562115085804", "fieldName": "name", "dataType": "Name", 
        "options": { "sex": "random", "__unique": false, "__display": true, "__fieldName": "name" }, 
        "relation": { "fieldNames": "sex", "type": "COR_RELATION", "allowTypes": [ "Sex" ] }, "__unique": false, "__display": true }
      ,
      { "component": "SexConfig", "id": "1562115088956", "fieldName": "sex", "dataType": "Sex",
       "options": { "manAlias": "男", "womanAlias": "女", "sex": "random", "__unique": false, "__display": true, "__fieldName": "sex" },
        "relation": null, "__unique": false, "__display": true }
    ]
  },
  FLIGHT: {
    alias: "航班信息",
    optionsComponents: [
      'City', 'Time', 'RandomChoice'  // 包括起飞、到达、取消
    ]
  }
};
