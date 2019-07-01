import { FIELD_PRE, RELATION_ENUM } from '../CONST.js';


export default (options, relation) => {
  // 定义结果的变量
  var __result = ''
  // 判断字段的是否关联，关联
  if (relation.type != RELATION_ENUM.INDEPEND.EN) {
    // 使用字符串分割获取关联字段列表
    let relationFieldNamesList = relation.fieldNames.split(',')
    // 遍历关联字段
    relationFieldNamesList.forEach(element => {
      // 取出关联字段里的值
      let temp = options[FIELD_PRE + element];
      __result += temp
    });
  }
  const deliver_options = {};
  deliver_options[FIELD_PRE + options.__fieldName] = __result;
  return {
    options: deliver_options,
    data: __result
  };
};