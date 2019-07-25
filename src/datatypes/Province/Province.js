import { randomChoice } from '@/utils/functions';
import { FIELD_PRE } from '@/datatypes/CONST.js';

export default (options, relation) => {
  let provinces = [];
  let provinceChoice;
  provinces = options.provinces; // 获取多选框选中的省份数组
  if(provinces.length === 0){
    throw new Error("请选择省份!"); // 数组为空抛出异常
  }
  else{
     provinceChoice = randomChoice(provinces); // 从备选省份数组中随机选取省份
  }

  // 将生成结果传递下去
  const deliver_options = {};
  deliver_options.provinceChoice = provinceChoice;
  // 直辖市不在生成结果中显示
  if(provinceChoice === "直辖市(该名称不会被显示只做关联)") {
    provinceChoice = "";
  }
  deliver_options[FIELD_PRE + options.__fieldName] = provinceChoice;
  
  return  {
    options: deliver_options,
    data: provinceChoice
  };
};
