import { randomChoice } from '@/utils/functions';
import { FIELD_PRE, RELATION_ENUM, OPTIONS_ENUM } from '@/datatypes/CONST.js';
import OriginalData from '@/datatypes/COMMON_DATA/OriginalData_dict';

export default (options, relation) => {
  const type = relation.type;
  let cities = options.cities;
  let province = '';
  let city = '';

  if(type === RELATION_ENUM.INDEPEND.EN){ // 不关联字段时
    if(options.Select_city_mode == SELECT_MODE_ENUM.City.CITY_SELECTABLE.CN){ 
      if(cities.length === 0){
        throw new Error("请选择城市!"); // 数组为空抛出异常
      }else{
        city = randomChoice(cities);  // 从选定城市中随机选择城市
      }
    }else{  // 全国范围内随机选择城市
      province = randomChoice(Object.keys(OriginalData));
      if(province in {'北京市':"", '上海市':"", '重庆市':"", '天津市':""}){ // 直辖市的处理
        city = province;
      }else{
        city  =  randomChoice(Object.keys(OriginalData[province]));
        while(city === '省直辖县级行政单位'){ // 选择到的城市为特殊情况的处理(重新选择)
        city  =  randomChoice(Object.keys(OriginalData[province]));
        }
      }
    }
  }else{  // 关联字段时从关联的省下属的城市随机选择
    city  =  randomChoice(Object.keys(OriginalData[options.provinceChoice]));
  }

  const deliver_options = {};
  deliver_options[FIELD_PRE + options.__fieldName] = city;
  deliver_options.cityChoice =  city;
  return  {
    options: deliver_options,
    data: city
  };
};
