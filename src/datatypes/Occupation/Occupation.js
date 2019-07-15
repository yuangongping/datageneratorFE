import { randomChoice } from '@/utils/functions';
import { FIELD_PRE, RELATION_ENUM } from '@/datatypes/CONST.js';
import OccupationData from '@/datatypes/COMMON_DATA/OccupationData.js';

export default (options, relation) => {
  const occupationTypes = options.occupationTypes;
  const occupationType = randomChoice(occupationTypes);
  let occupation = '';

  if (relation.type === RELATION_ENUM.INDEPEND.EN) { // 不关联字段时
    occupation = randomChoice(OccupationData[occupationType])
  } else {
    const age = options[FIELD_PRE + relation.fieldNames]
    if (typeof(age) == "number") { // 如果关联的是number
      if (age >= 0 && age < 200) {
        if (age < 7 ) {
          occupation = '无'
        } else if (7 <= age && age < 18) {
          occupation = '学生'
        } else if (age > 60) {
          occupation = randomChoice(['退休', '无'])
        } else {
          occupation = randomChoice(OccupationData[occupationType])
        }
      } else {
        throw new Error(`关联字段${relation.fieldNames}的值超出范围, 请检查字段值是否合理`)
      }
    } else {
      throw new Error('只能关联年龄字段, 请检查关联字段是否正确, 重新输入关联字段名！')
    }
  }

  // 将生成结果传递下去
  const deliver_options = {};
  deliver_options[FIELD_PRE + options.__fieldName] = occupation;
  return  {
    options: deliver_options,
    data: occupation
  };
};