import { FIELD_PRE } from '../CONST.js';


export default (options, relation) => {
  let __result = parseFloat(options[FIELD_PRE + relation.fieldNames]);
  // 将生成结果传递下去
  const deliver_options = {};
  deliver_options[FIELD_PRE + options.__fieldName] = __result;
  return {
    options: deliver_options,
    data: __result
  };
};
