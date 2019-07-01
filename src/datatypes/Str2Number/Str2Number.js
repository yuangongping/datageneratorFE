import { FIELD_PRE } from '../CONST.js';


export default (options, relation) => {
  // 获取关联字段的值，并将其转化为浮点型
  let __result = parseFloat(options[FIELD_PRE + relation.fieldNames]);
  // 将生成结果传递下去
  const deliver_options = {};
  deliver_options[FIELD_PRE + options.__fieldName] = __result;
  return {
    options: deliver_options,
    data: __result
  };
};
