import { randomChoice } from '@/utils/functions';
import { FIELD_PRE,  RELATION_ENUM } from '@/datatypes/CONST.js';
import CarprefixData from '@/datatypes/COMMON_DATA/CarprefixData';
export default(options,relation)=>{
    const type = relation.type;
    var cityChoice
    var carprefix
    var cityname
    var result
    if (type === RELATION_ENUM.INDEPEND.EN){  // 独立字段时
        cityChoice = randomChoice(Object.keys(CarprefixData));
        carprefix = CarprefixData[cityChoice];
        if(typeof(carprefix) === 'string' ){
            result = carprefix;
        }else{
            result = carprefix[Math.floor(Math.random()*carprefix.length)];
        }
    }else{  // 关联字段时
    cityname = options.cityChoice;
    carprefix = CarprefixData[cityname];
    if(typeof(carprefix) === 'string' ){
        result = carprefix;
        }else{
        result = carprefix[Math.floor(Math.random()*carprefix.length)];
        }
    }
    // 将生成结果传递下去
    const deliver_options = {};
    deliver_options[FIELD_PRE + options.__fieldName] = result;
    return  {
        options: deliver_options,
        data: result
    };
}