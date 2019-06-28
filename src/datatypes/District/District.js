import { randomChoice } from '@/utils/functions';
import { FIELD_PRE } from '@/datatypes/CONST.js';
import OriginalData from '@/datatypes/COMMON_DATA/OriginalData';

export default (options, relation) => {

  const cities = options.cityChoice;

  let provinceChoice;
  let cityChoice;
  let districtChioce;
  let district;

  if (cities === 'random'){
    provinceChoice = randomChoice(OriginalData);
    cityChoice = randomChoice(provinceChoice.children);
    districtChioce = randomChoice(cityChoice.children);
  } else {
    districtChioce = randomChoice(cities)
  }

  // if(options.__to_AddrNo){
  //   district = districtChioce.value;
  // }else{
    district = districtChioce.label
  // }

  district = district.replace(/\s+/g,"");       
  // // 将生成结果传递下去
  const deliver_options = {};
  deliver_options[FIELD_PRE + options.__fieldName] = district;
  // 区号
  deliver_options.district_no = districtChioce.value;
  return  {
    options: deliver_options,
    data: district
  };
};
