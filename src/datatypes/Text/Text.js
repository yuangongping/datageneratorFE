import { random, floor } from 'mathjs';
import { FIELD_PRE } from '@/datatypes/CONST.js';
import textData from '@/datatypes/Text/textData';
import { randomChoice } from '@/utils/functions';

export default (options, relation) => {
  let compose_type = options.compose_type;
  let lenth_type = options.lenth_type;
  let max = options.max;
  let min = options.min;
  let fixed = options.fixed;
  let _result = '';

  let range = lenth_type == 'RANDOM_LENGTH' ? Math.round(Math.random() * (max-min)) + min : fixed;
  for (let i=0; i<range; i++){
    let choice_compose_type = randomChoice(compose_type)
    let datatypeChoice = textData[choice_compose_type]
    _result = _result + randomChoice(datatypeChoice)
  }

  // 将生成结果传递下去
  const deliver_options = {};
  deliver_options[FIELD_PRE + options.__fieldName] = _result;
  return  {
    options: deliver_options,
    data: _result
  };
};
