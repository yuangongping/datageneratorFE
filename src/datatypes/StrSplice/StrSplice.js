import { FIELD_PRE, RELATION_ENUM } from '../CONST.js';


export default (options, relation) => {
  var __result = ''
  if (relation.type != RELATION_ENUM.INDEPEND.EN) {

    let relationFieldNamesList = relation.fieldNames.split(',')
    relationFieldNamesList.forEach(element => {
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