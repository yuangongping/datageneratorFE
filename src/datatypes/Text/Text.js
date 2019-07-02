import { FIELD_PRE, OPTIONS_ENUM } from '@/datatypes/CONST.js';
import textData from '@/datatypes/Text/textData';
import { randomChoice } from '@/utils/functions';

export default (options, relation) => {
  // 获取随机组合类型数组
  const textTypes = options.textTypes;  
  // 获取字符长度类型, 固定长度或随机长度
  const lenType = options.lenType;
  const max = options.max;
  const min = options.min;
  const fix = options.fix;
  let _result = '';
  // 确定字符串长度：如果是随机长度, 就从最小值到最大值间随机选择一个长度, 否则去固定长度
  let length = lenType == OPTIONS_ENUM.Text.LEN_TYPE.RANDOM.EN 
    ? Math.round(Math.random() * (max-min)) + min 
    : fix;
  // 随机选择字符串的每一个字符, 先确定随机组合类型, 再从对应类型随机选择字符
  for (let i = 0; i < length; i++){
    let textType = randomChoice(textTypes)
    _result = _result + randomChoice(textData[textType])
  }

  // 将生成结果传递下去
  const deliver_options = {};
  deliver_options[FIELD_PRE + options.__fieldName] = _result;
  return  {
    options: deliver_options,
    data: _result
  };
};
