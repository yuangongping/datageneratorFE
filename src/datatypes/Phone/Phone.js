import { random, floor } from 'mathjs';
import { FIELD_PRE } from '@/datatypes/CONST.js';
import phoneData from '@/datatypes/Phone/phoneData';
import { randomChoice } from '@/utils/functions';

export default (options, relation) => {
  const prefix = phoneData.phone_prefix;
  let Phone = randomChoice(prefix);
  for (let j = 0; j < 8; j++) {
    Phone = Phone + floor(random() * 10);
  }

  // 将生成结果传递下去
  const deliver_options = {};
  deliver_options[FIELD_PRE + options.__fieldName] = Phone;
  return  {
    options: deliver_options,
    data: Phone
  };
};
