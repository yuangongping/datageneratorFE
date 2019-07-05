import { randomChoice } from '@/utils/functions';
import { FIELD_PRE, OPTIONS_ENUM, RELATION_ENUM } from '@/datatypes/CONST.js';
import OriginalData_dict from '@/datatypes/COMMON_DATA/OriginalData_dict';

export default (options, relation) => {
  const type = relation.type;
  const Select_district_mode = options.Select_district_mode;

  let provinceChoice;
  let cityChoice;
  let districtChioce;
  let district_key;
  let districts;
  let districts_dict;

  if (type === RELATION_ENUM.INDEPEND.EN){  // 独立字段时
    if(Select_district_mode === OPTIONS_ENUM.District.DISTRICT_SELECTABLE.CN){  // 自选特定区县范围
      districts_dict = options.districts_dict;
      districts = options.districts;
    }else{  // 随机选择区县
      provinceChoice = randomChoice(Object.keys(OriginalData_dict));
      cityChoice = randomChoice(Object.keys(OriginalData_dict[provinceChoice]));
      districts_dict = OriginalData_dict[provinceChoice][cityChoice];
      districts = Object.keys(OriginalData_dict[provinceChoice][cityChoice]);
    }
  }else {  // 关联字段时
    const city = options.cityChoice;
    if(city in {'北京市':"", '上海市':"", '重庆市':"", '天津市':""}){  // 直辖市特殊处理
      district_key = randomChoice(Object.keys(OriginalData_dict[city]));
      districts_dict = OriginalData_dict[city][district_key];  
      districts = Object.keys(districts_dict);
    }else{
      Object.keys(OriginalData_dict).forEach(el => {
        if(city in OriginalData_dict[el]){
          districts_dict = OriginalData_dict[el][city];
          districts = Object.keys(districts_dict);
        }else{
          return;
        }
      });
    }
  }
  districtChioce = randomChoice(districts)  
  // 将生成结果传递下去
  const deliver_options = {};
  deliver_options[FIELD_PRE + options.__fieldName] = districtChioce;
  // 传递区号
  deliver_options.district_no = districts_dict[districtChioce];
  return  {
    options: deliver_options,
    data: districtChioce
  };
};
