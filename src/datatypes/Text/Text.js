import { random, floor } from 'mathjs';
import { FIELD_PRE, OPTIONS_ENUM } from '@/datatypes/CONST.js';
import textData from '@/datatypes/Text/textData';
import { randomChoice } from '@/utils/functions';

export default (options, relation) => {
  const textTypes = options.textTypes;
  const lenType = options.lenType;
  const max = options.max;
  const min = options.min;
  const fix = options.fix;
  let _result = '';

  let length = lenType == OPTIONS_ENUM.Text.LEN_TYPE.RANDOM.EN 
    ? Math.round(Math.random() * (max-min)) + min 
    : fix;

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
