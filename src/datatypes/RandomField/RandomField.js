import { FIELD_PRE, RELATION_ENUM } from '../CONST.js';

export default (options, relation) => {
  // 定义结果变量
  var __result = '';
  // 判断是否相关， 如果不是独立字段，即相关
  if (relation.type !== RELATION_ENUM.INDEPEND.EN) {
    // 字符串分割得到关联字段列表 
    let relateFields = relation.fieldNames.split(',');
    let weight = options.weightFirst + options.weightSecond;
    if (weight === 0) {
        throw new Error("随机比重不能为同时为0")
    }
    let threshold = options.weightFirst / weight;
    if (Math.random() <= threshold){
      __result = options[FIELD_PRE + relateFields[0]]
    } else {
        __result = options[FIELD_PRE + relateFields[1]]
    }
  }
 
  const deliver_options = {};
  deliver_options[FIELD_PRE + options.__fieldName] = __result;
  return {
    options: deliver_options,
    data: __result
  };
};