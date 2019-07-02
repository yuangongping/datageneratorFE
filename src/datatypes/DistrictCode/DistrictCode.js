import { randomChoice } from '@/utils/functions';
import { FIELD_PRE, RELATION_ENUM } from '@/datatypes/CONST.js';
import OriginalData_dict from '@/datatypes/COMMON_DATA/OriginalData_dict';

export default (options, relation) => {

  const type = relation.type;
  let district_no;
  let provinceChoice;
  let cityChoice;
  let district_dict;
  let district_key;

  if (type === RELATION_ENUM.INDEPEND.EN){  // 独立字段时
    provinceChoice = randomChoice(Object.keys(OriginalData_dict));
    cityChoice = randomChoice(Object.keys(OriginalData_dict[provinceChoice]));
    district_dict = OriginalData_dict[provinceChoice][cityChoice];
    district_key = randomChoice(Object.keys(OriginalData_dict[provinceChoice][cityChoice]));
    district_no = district_dict[district_key];
  }else{  // 关联字段时
    district_no = options.district_no;
  }

  // 将生成结果传递下去
  const deliver_options = {};
  deliver_options[FIELD_PRE + options.__fieldName] = district_no;
  return  {
    options: deliver_options,
    data: district_no
  };
};
