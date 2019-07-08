import { FIELD_PRE } from '@/datatypes/CONST.js';
import { randomChoice } from '@/utils/functions';

export default (options, relation) => {
  console.log(relation);
  // 获取候选带分隔的字符串
  const RandomString = options.RandomString;
  let resultstring = ''
  if (RandomString) { 
    if (RandomString.indexOf(",") != -1) {
      const RandomList = RandomString.split(',');
      resultstring = randomChoice(RandomList);
    } else{
      resultstring = RandomString;
    } 
  } else{
    throw new Error('字符或字段候选值不能为空, 请重新输入！');
  }

  // 将生成结果传递下去
  const deliver_options = {};
  deliver_options[FIELD_PRE + options.__fieldName] = resultstring;
  return  {
    options: deliver_options,
    data: resultstring
  };
};