import { FIELD_PRE, RELATION_ENUM } from '../CONST.js';


export default (options, relation) => {
  // 切割字符串的起始值下标
  let start = options.start;
  // 终止值下标
  let end = options.end;
  console.log(end, start, typeof(end))
  // 定义临时变量
  var __result = ''
  // 必须选取关联类型选项
  if (relation.type != RELATION_ENUM.INDEPEND.EN) {
    // 校验起始值与终止值的正确性，终止值必须 > 起始值
    if (end > start) {
      __result = options[FIELD_PRE +  relation.fieldNames].substring(start, end);  
    } else {
      throw new Error('起始位与终止位设置不合理， 请重置！');
    }
  } else {
    throw new Error('必须选取关联类型选项！');
  }
  const deliver_options = {};
  deliver_options[FIELD_PRE + options.__fieldName] = __result;
  return {
    options: deliver_options,
    data: __result
  };
};