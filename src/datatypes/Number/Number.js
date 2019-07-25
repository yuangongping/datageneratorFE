import { FIELD_PRE, RELATION_ENUM } from '../CONST.js';
import * as math from "mathjs"
// import { random, evaluate, round } from 'mathjs';

export default (options, relation) => {
  let min = options.min;
  let max = options.max;

  let __result;
  // 有关联关系
  if (relation.type != RELATION_ENUM.INDEPEND.EN) {
    if (relation.fieldNames.indexOf(',') > -1) {
      throw new Error(`数字类型的字段 ${options.__fieldName} 只能有一个关联字段`);
    }

    const relVal = parseFloat(options[FIELD_PRE + relation.fieldNames]);  // 获取关联字段的值

    if (relation.type == RELATION_ENUM.LITTER.EN) {
      if (relVal < min) {
        throw new Error(`关联字段 ${relation.fieldNames} 的值小于字段 ${options.__fieldName} 的最小值，请调整相关字段的值域范围！`);
      }
      max = Math.min(max, relVal);
    }

    if (relation.type == RELATION_ENUM.GREATER.EN) {
      if (relVal > max) {
        throw new Error(`关联字段 ${relation.fieldNames} 的值大于字段 ${options.__fieldName} 的最大值，请调整相关字段的值域范围！`);
      }
      min = Math.max(min, relVal);
    }

    __result = math.random(min, max);

    if (relation.type == RELATION_ENUM.NUM_EXPRESS.EN) {
      let expression = relation.expression;
      expression = expression.replace(/\${RELATE}/g, relVal);
      expression = expression.replace(/\${DATA}/g, __result);
      try {
        __result = math.eval(expression);
      } catch (e) {
        throw new Error(`字段 ${options.__fieldName} 的表达式格式有误，请重新输入！`)
      }
    }
  } else {
    __result = math.random(min, max);
  }

  __result = math.round(__result, options.decimal);
  // 将生成结果传递下去
  const deliver_options = {};
  deliver_options[FIELD_PRE + options.__fieldName] = __result;
  return {
    options: deliver_options,
    data: __result
  };
};
