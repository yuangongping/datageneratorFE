import { randomChoice } from '@/utils/functions';
import { FIELD_PRE } from '@/datatypes/CONST.js';
import OriginalData from '@/datatypes/COMMON_DATA/OriginalData';

export default (options, relation) => {

  const province = options.provinceChoice;

  let provinceChoice = {};
  let cities;
  let city = '';
  let cityChoice;

  if (province === 'random'){
    provinceChoice = randomChoice(OriginalData);
    cities = provinceChoice['children'];
    cityChoice = randomChoice(cities)
    city = cityChoice.label;
  } else {
    OriginalData.forEach(e1 => {
      if(e1['label']!=province){
      }
      else{
        cities = e1['children'];
        return;
      }
      });
      // cities = Object.keys(ProvinceData[province]);
      cityChoice = randomChoice(cities);
      city = cityChoice['label'];
  }

  // 将生成结果传递下去
  let data = "";
  // if (province in {'北京市':"", '上海市':"", '重庆市':"", '天津市':""}){
  // }else{
    data = city;
  // }
  const deliver_options = {};
  deliver_options[FIELD_PRE + options.__fieldName] = data;
  deliver_options.cityChoice = cityChoice['children'];
  return  {
    options: deliver_options,
    data: data
  };
};
