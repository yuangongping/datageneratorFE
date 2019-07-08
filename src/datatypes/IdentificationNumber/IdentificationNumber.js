import { FIELD_PRE, RELATION_ENUM } from '../CONST.js';
import ALLREGIONS  from '../COMMON_DATA/OriginalData_dict.js'

// 判断闰年
const isRuinian = (year) => {
    if(year%4 === 0 && year%100 !== 0){
            return true ;
    } else if (year%400 === 0){
            return true ;
    } else{
            return false ;
    }
};

// 确定指定年月具有多少天
const getDayNumByYearMonth = (year, month) => {
    var day;
    switch (month) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            day =  31;
            break;
        case 4:
        case 6:
        case 9:
        case 11:
            day = 30;
            break;
        case 2:
            day = isRuinian(year) ? 29 : 28;
    }
    return day;
};


// 获取身份证前6位，身份码
const getTop6 = () =>{
    // 地区一级域列表, 全国各省
    const primaryDomain = Object.keys(ALLREGIONS);
    // 随机从一级域中选取一个key
    const primaryDomainKey = primaryDomain[Math.floor(Math.random()*primaryDomain.length)];
    // 地区二级域列表, 对应省的各市
    const secondaryDomain = Object.keys(ALLREGIONS[primaryDomainKey]);
    // 随机从二级域中选取一个key
    const secondaryDomainKey = secondaryDomain[Math.floor(Math.random()*secondaryDomain.length)];
    // 地区三级域列表, 对应省的县
    const thirdDomain = Object.keys(ALLREGIONS[primaryDomainKey][secondaryDomainKey]);
    // 随机从二级域中选取一个key
    const thirdDomainKey = thirdDomain[Math.floor(Math.random()*thirdDomain.length)];
    return ALLREGIONS[primaryDomainKey][secondaryDomainKey][thirdDomainKey];
};

// 获取身份证的前7-14位，即日期码， 如果是独立字段，时间从1949年1月1号至当前时间，即70年中随机选择
const getTopSeven2Fourteen = () => {
    const baseYear = 1949;
    // 创建日期对象
    var myDate = new Date();
    // 获取含有4位数的当前年
    const currYear = myDate.getFullYear();
    // 随机获取年
    const year = baseYear + Math.floor(Math.random() * (currYear - baseYear) );
    // 随机获取月份, 由于月份为1-12 ，故+1
    var month = Math.floor(Math.random() * 12 ) + 1;
    // 获取指定年月含有多少天
    var days = getDayNumByYearMonth(year, month);
    // 随机选中一天
    var day = Math.floor(Math.random() * days ) + 1;
    // 格式化月份输出，5 => 05
    if (month < 10) {
        month = '0' + month.toString();
    }
    // 格式化天输出
    if (day < 10 ){
        day = '0' +  day.toString();
    }
    // 返回结果
    return year.toString() + month + day;
};

// 获取身份证的16-17位，随机码
const getTopFifteen2Seventeen = (sex) => {
    // 生成0-999之间的随机数
    var num = 0;
    // 生成0-999之间的随机数
    num = Math.ceil(Math.random() * 1000);
    // 如果性别是男，且生成的随机数是偶数，则改为奇数，保证男为三位随机奇数
    if(sex === '男' && num % 2 === 0){
        num += 1
    }
    // 如果性别是女，且生成的随机数是奇数，则改为偶数，保证女为三位随机偶数
    if(sex === '女' && num % 2 !== 0){
        if(num === 1){
            num += 1
        } else {
            num -= 1
        }  
    }
    // 格式化输出
    if ( num < 10 ){
        return '00' + num.toString();
    } else if ( num >= 10 && num < 100) {
        return '0' + num.toString();
    }
    return num.toString();
};

// 获取身份证的最后一位，校验码
const getLastNumber = (top17) => {
  // 身份证前17位, top17 
  // 身份证系数
  const K = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  // 临时变量
  var temp = 0;
  // 将身份证的前17位于对应的系数相乘的积相加
  for (var i = 0; i < 17 ; i++ ) {
      temp += K[i] * parseInt(top17.substring(i, i+1))
  }
  // 将相乘的积相加后的结果除以11，取余数
  const remainder = temp % 11;
  // 身份证最后一位的候选值列表
  const lastNum = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
  // 依据余数确定最后一位值
  return lastNum[remainder] 
};


export default (options, relation) => {
  // 定义结果变量
  var __result = ''
  // 判断是否相关， 如果不是独立字段，即相关
  if (relation.type !== RELATION_ENUM.INDEPEND.EN) {
    // 字符串分割得到关联字段列表 
    let relationFieldNamesList = relation.fieldNames.split(',')
    // 定义区域，时间前14位临时变量
    var top14 = '';
    // 遍历关联字段的地区与时间, 性别字段不取，故-1
    for(var i = 0 ; i < relationFieldNamesList.length-1; i ++){
        // 获取关联字段的值 
        let value = options[FIELD_PRE + relationFieldNamesList[i]];
        top14 += value
    }
    // 得到关联的性别字段的值
    const sexValue = options[FIELD_PRE + relationFieldNamesList[2]];
    // 依据性别获取15-17位数
    const topFifteen2Seventeen = getTopFifteen2Seventeen(sexValue);
    // 字符串拼接前17位
    const top17 = top14 + topFifteen2Seventeen;
    // 依据前17位，计算出最后一位校验位
    const lastNum = getLastNumber(top17);
    __result = top17 + lastNum;
  } else {
    //   如果是独立字段
    // 随机获取区号，即身份证的前6位
    const top6 = getTop6();
    // 随机后去日期，即身份证的日期8位
    const topSeven2Fourteen = getTopSeven2Fourteen();
    // 随机获取15-17位数, 传入空变量，则表示随机获取
    const topFifteen2Seventeen = getTopFifteen2Seventeen('');
    const top17 = top6 + topSeven2Fourteen + topFifteen2Seventeen;
    // 依据前17位，计算出最后一位校验位
    const lastNum = getLastNumber(top17);
    __result = top17 + lastNum;
  }
  const deliver_options = {};
  deliver_options[FIELD_PRE + options.__fieldName] = __result;
  return {
    options: deliver_options,
    data: __result
  };
};