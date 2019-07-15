import { randomChoice } from '@/utils/functions';
import { FIELD_PRE } from '@/datatypes/CONST.js';

export default (options, relation) => {

    const sex = {
        man: options.manAlias,
        woman: options.womanAlias
    };

    const sexChoice = options.sex == 'random' ? randomChoice(Object.keys(sex)) : options.sex;

    // 将生成结果传递下去
    const deliver_options = {};
    deliver_options[FIELD_PRE + options.__fieldName] = sex[sexChoice];
    deliver_options.sex = sexChoice;
    return {
        options: deliver_options,
        data: sex[sexChoice]
    };
};