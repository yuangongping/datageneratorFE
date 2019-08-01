import { FIELD_PRE, RELATION_ENUM } from '../CONST.js';

const logicalOperate = (condition1, condition2, result1, result2, operate) => {
    var _result = '';
    switch (operate) {
        case 'GREATER_THAN':
            if (condition1 > condition2) {
                _result = result1;
            } else {
                _result = result2;
            }
            break;

        case 'GREATER_THAN_EQUAL_TO':
            if (condition1 >= condition2) {
                _result = result1;
            } else {
                _result = result2;
            }
            break;

        case 'LESS_THAN':
            if (condition1 < condition2) {
                _result = result1;
            } else {
                _result = result2;
            }
            break;

        case 'LESS_THAN_EQUAL_TO':
            if (condition1 <= condition2) {
                _result = result1;
            } else {
                _result = result2;
            }
            break;

        case 'EQUAL_TO':
            if (condition1 == condition2) {
                _result = result1;
            } else {
                _result = result2;
            }
            break;

        case 'NOT_EQUAL_TO':
            if (condition1 != condition2) {
                _result = result1;
            } else {
                _result = result2;
            }
            break;

        case 'NULL':
            if (condition1 == '') {
                _result = result1;
            } else {
                _result = result2;
            }
            break;

        case 'NOT_NULL':
            if (condition1 != '') {
                _result = result1;
            } else {
                _result = result2;
            }
            break;
    }
    return _result;
};

export default (options, relation) => {
    // 字符串分割得到关联字段列表 
    let relationFieldNamesList = relation.fieldNames.split(',');
    // 定义结果的变量
    var __result = '';
    // 判断字段的是否关联，关联
    try {
        // 获取条件关联字段A的值
        var condition1 = relation.expression.condition1.type == 'FIELD'
            ? options[FIELD_PRE + relation.expression.condition1.value]
            : relation.expression.condition1.value;
        // 获取条件关联字段B的值
        var condition2 = relation.expression.condition2.type == 'FIELD'
            ? options[FIELD_PRE + relation.expression.condition2.value]
            : relation.expression.condition2.value;

        var result1 = relation.expression.result1.type == 'FIELD'
            ? options[FIELD_PRE + relation.expression.result1.value]
            : relation.expression.result1.value;

        // 获取条件不成立的结果关联字段值
        var result2 = relation.expression.result2.type == 'FIELD'
            ? options[FIELD_PRE + relation.expression.result2.value]
            : relation.expression.result2.value;

        // 获取所选择的逻辑操作运算符
        var operate = options.logicOperation;
        __result = logicalOperate(condition1, condition2, result1, result2, operate);
    } catch (e) {
        throw new Error('操作错误，请检查！');
    }
    const deliver_options = {};
    deliver_options[FIELD_PRE + options.__fieldName] = __result;
    return {
        options: deliver_options,
        data: __result
    };
};