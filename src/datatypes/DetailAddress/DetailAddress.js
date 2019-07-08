import { randomChoice } from '@/utils/functions';
import detailaddressData from '@/datatypes/DetailAddress/detailaddressData';
import { FIELD_PRE, OPTIONS_ENUM } from '@/datatypes/CONST.js';

export default (options, relation) => {
  console.log(relation);
  // 确定详细地址类型, 如果是随机地址每次就从城市地址和乡村地址中随机选择一种
  const addressType = options.addressType == OPTIONS_ENUM.DetailAddress.RANDOM_ADDRESS.EN 
      ? randomChoice(Object.keys(OPTIONS_ENUM.DetailAddress)) : options.addressType;

  let result = '';
  // 如果是乡村地址
  if (addressType === OPTIONS_ENUM.DetailAddress.VILLAGE_ADDRESS.EN) {
    const town = randomChoice(detailaddressData.VILLAGE_ADDRESS.towns);
    const street = randomChoice(detailaddressData.VILLAGE_ADDRESS.street);
    if (street.length > 0) {
      const number = Math.ceil(Math.random()*500); // 生成1-500的随机整数
      result = town + street + number + '号';
    } else {
      const village = randomChoice(detailaddressData.VILLAGE_ADDRESS.village);
      if (village.length > 0) {
        result = town  + village;
      } else {
        const group = randomChoice(detailaddressData.VILLAGE_ADDRESS.group);
        result = town  + village + group;
      }
    }
  } else {
    const residential_firstname = randomChoice(detailaddressData.CITY_ADDRESS.residential.firstname);
    const residential_secondname = randomChoice(detailaddressData.CITY_ADDRESS.residential.secondname);
    const residential_thirdname = randomChoice(detailaddressData.CITY_ADDRESS.residential.thirdname);
    const residential = residential_firstname + residential_secondname + residential_thirdname ;
    const building = Math.ceil(Math.random()*30);
    const unit = Math.ceil(Math.random()*5);
    const floor = Math.ceil(Math.random()*42);
    const number = Math.ceil(Math.random()*6);
    result = residential + '小区'  + building + '栋' + unit + '单元' + floor + '层' + number + '号';
  }
  
  // 将生成结果传递下去
  const deliver_options = {};
  deliver_options[FIELD_PRE + options.__fieldName] = result;
  return  {
    options: deliver_options,
    data: result
  };
};
