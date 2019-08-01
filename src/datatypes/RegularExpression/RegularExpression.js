import { FIELD_PRE, RELATION_ENUM } from '../CONST.js';

export default (options, relation) => {
  // 定义结果的变量
  var __result = '';
  // 获取表达式
  const expre = options.expression;
  // 获取表达式操作类型
  const expressionOutputType =  options.outputTypes;
  // 判断字段的是否关联，关联
  if (relation.type != RELATION_ENUM.INDEPEND.EN) {
    try {
      // 获取关联字段的值
      var relationValue = options[FIELD_PRE + relation.fieldNames];
      // 构建表达式
      var pattarn = new RegExp(expre, 'g');
      if (expressionOutputType === '提取') {
        // 执行提取操作
        __result = relationValue.match(pattarn);
        // 判断是否提取到值， 如果提取到指定内容
        if (__result) {
          // 将列表所有元素拼接为字符串，
          __result = __result.join('');
        } else {
          // 没有找到指定内容，则返回空
          __result = '';
        }
      } else { 
        // 否则为替换操作运算
        __result = relationValue.replace(pattarn,  options.replaceValue);
      }
     
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