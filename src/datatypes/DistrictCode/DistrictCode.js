import { randomChoice } from '@/utils/functions';
import { FIELD_PRE } from '@/datatypes/CONST.js';
import OriginalData from '@/datatypes/COMMON_DATA/OriginalData';

export default (options, relation) => {

  let district_no = options.district_no;

  let provinceChoice;
  let cityChoice;
  let districtChioce;

  if (district_no === 'random'){
    provinceChoice = randomChoice(OriginalData);
    cityChoice = randomChoice(provinceChoice.children);
    districtChioce = randomChoice(cityChoice.children);
    district_no = districtChioce.value
  }

  // if(options.__to_AddrNo){
  //   district = districtChioce.value;
  // }else{
  // }

  // district = district.replace(/\s+/g,"");       
  // // 将生成结果传递下去
  const deliver_options = {};
  deliver_options[FIELD_PRE + options.__fieldName] = district_no;
  // // 区号
  // deliver_options.district_no = districtChioce.value;
  return  {
    options: deliver_options,
    data: district_no
  };
};
