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
    const localtime = (new Date()).getFullYear();  //获取当前年份
    if (options.hasOwnProperty('timeStamp')) { // 如果关联的是时间字段, 目前Time组件有一个唯一标识timeStamp
      const birthYear = parseInt(options[FIELD_PRE + relation.fieldNames].substr(0,4))
      const timeDiff = parseInt(localtime - birthYear);
      if (timeDiff < 7 ) {
        occupation = '无'
      } else if (7 <= timeDiff && timeDiff < 18) {
        occupation = '学生'
      } else if (timeDiff > 60) {
        occupation = randomChoice(['退休', '无'])
      } else {
        occupation = randomChoice(OccupationData[occupationType])
      }
    } else {
      throw new Error('只能关联时间字段, 请检查关联字段是否正确, 重新输入关联字段名！')
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