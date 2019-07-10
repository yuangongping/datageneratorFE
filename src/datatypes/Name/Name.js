import { randomChoice } from '@/utils/functions';
import nameData from '@/datatypes/Name/nameData';
import { FIELD_PRE } from '@/datatypes/CONST.js';

export default (options, relation) => {
 
  const country = options.country || 'China';
  const sex = options.sex;

  // 根据国家筛选名字
  const nameRegioned = nameData[country];
  // 随机选择名字的第一个字
  const fristName = randomChoice(nameRegioned.firstNames);
  // 随机选择名字的第二个字
  const middleName = randomChoice(nameRegioned.middleNames);
  // 名字的最后一个字为空
  let lastNames = '';
  // 如果是随机选择
  if (sex === 'random') {
    // 名字的最后一个字的候选列表为男性列与女性列表的并集
    lastNames = nameRegioned.lastNames.man.concat(nameRegioned.lastNames.woman);
  } else {
    // 否则为指定性别的候选列表
    lastNames = nameRegioned.lastNames[sex];
  }
  // 从候选列表中选出名字的最后一个字
  const lastName = randomChoice(lastNames);
  // 将名字的第一, 第二, 第三个字进行拼接
  const __result = fristName + middleName + lastName;
  // 将生成结果传递下去
  const deliver_options = {};
  deliver_options[FIELD_PRE + options.__fieldName] = __result;
  return {
    options: deliver_options,
    data: __result
  };
};