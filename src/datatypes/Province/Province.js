import { randomChoice } from '@/utils/functions';
import { FIELD_PRE } from '@/datatypes/CONST.js';
// import OriginalData from '@/datatypes/COMMON_DATA/OriginalData';

export default (options, relation) => {

  // const province = randomChoice(Object.keys(ProvinceData['China']));
  let province = [];
  let provinceChoice;

  province = options.province;

  if(province.length === 0){
    throw new Error("请选择省份!");
  }
  else{
     provinceChoice = randomChoice(province);
  }
  // 将生成结果传递下去
  const deliver_options = {};
  deliver_options[FIELD_PRE + options.__fieldName] = provinceChoice;
  deliver_options.provinceChoice = provinceChoice;
  return  {
    options: deliver_options,
    data: provinceChoice
  };
};
