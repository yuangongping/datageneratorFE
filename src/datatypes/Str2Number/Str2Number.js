import { FIELD_PRE } from '../CONST.js';


export default (options, relation) => {
  let __result;
  // 获取关联字段的值，并将其转化为浮点型
  try{
    __result = parseFloat(options[FIELD_PRE + relation.fieldNames]);
  }catch(e){
    throw new Error('请输入正确的数字类型！');
  }
  // 将生成结果传递下去
  const deliver_options = {};
  deliver_options[FIELD_PRE + options.__fieldName] = __result;
  return {
    options: deliver_options,
    data: __result
  };
};
