import { FIELD_PRE, RELATION_ENUM } from '../CONST.js';


export default (options, relation) => {
  // 定义结果的变量
  var __result = '';
  // 获取表达式
  const expression = options.expression;
  // 判断字段的是否关联，关联
  if (relation.type != RELATION_ENUM.INDEPEND.EN) {
    try { 
      // 获取关联字段的值
      var relationValue = options[FIELD_PRE + relation.fieldNames];
      expression = '//d+'
      var pattarn = new RegExp(expression,'g');
      var st = "The best 23 things in 22 life are free";
      relationValue = st;
      __result = relationValue.match(pattarn);
      console.log('_xszsa', __result);
    }catch(e){
      throw new Error('正则表达式格式错误，请检查！');
    }
  }
  const deliver_options = {};
  deliver_options[FIELD_PRE + options.__fieldName] = __result;
  return {
    options: deliver_options,
    data: __result
  };
};