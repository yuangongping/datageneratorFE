import { randomChoice } from '@/utils/functions';
import nameData from '@/datatypes/Name/nameData';
import { FIELD_PRE } from '@/datatypes/CONST.js';

export default (options, relation) => {
  const country = options.country || 'China';
  const sex = options.sex;

  // 根据国家筛选名字
  const nameRegioned = nameData[country];
  const fristName = randomChoice(nameRegioned.firstNames);
  const middleName = randomChoice(nameRegioned.middleNames);
  let lastNames = '';
  if (sex === 'random') {
    lastNames = nameRegioned.lastNames.man.concat(nameRegioned.lastNames.woman);
  } else {
    lastNames = nameRegioned.lastNames[sex];
  }
  const lastName = randomChoice(lastNames);

  const __result = fristName + middleName + lastName;
  // 将生成结果传递下去
  const deliver_options = {};
  deliver_options[FIELD_PRE + options.__fieldName] = __result;
  return {
    options: deliver_options,
    data: __result
  };
};