import { FIELD_PRE, RELATION_ENUM } from '../CONST.js';
import { random, floor} from 'mathjs';

export default (options, relation) => {
  const timeStep = (Number(options.timeStep) || 1)*60;  // 固定步长递增的步长值 
  const initialTime = options.initialTime;  // 时间范围
  const timeFormat = options.timeFormat;  // 时间格式
  const timeCategory = options.timeCategory;  // 时间类型
  const startTimeStamp = Number(Date.parse(initialTime[0])/1000);  // 将起始时间转换为时间戳
  const endTimeStamp = Number(Date.parse(initialTime[1])/1000);  // 将终止时间转换为时间戳
  var transResult, resultTIme, randomStepStamp, randomInterval;  // 后续所用到的变量值
  //有关联关系
  if(relation.type !== RELATION_ENUM.INDEPEND.EN) {
    const relVal = parseFloat(options[FIELD_PRE + relation.fieldNames]);  // 从关联字段取值
    const relationCategory = options['relationCategory'];  // 所关联字段的时间类型
    if(!timeCategory ){
      throw new Error(`请选择生成时间类型`);
    }
    if (relation.fieldNames.indexOf(',') > -1) {
      throw new Error(`数字类型的字段 ${options.__fieldName} 只能有一个关联字段`);
    }
    if (relation.type === RELATION_ENUM.GREATER.EN){  // 选择大于关联值情况时
      const minInterval = relation.minInterval*60;  // 输入最大最小间隔，单位为分钟，转换为秒
      const maxInterval = relation.maxInterval*60;
      if(minInterval > maxInterval){
        throw new Error(`最小间隔需小于等于最大间隔`);
      }
      if (timeCategory === "randomSingleTime"){  // 选择生成随机时刻类型的时间
        randomInterval = floor(random() * (maxInterval - minInterval + 1) + minInterval) + relVal;  // 单位为秒
        transResult = randomInterval;  // 传递生成结果时间戳
        resultTIme = new Date(randomInterval * 1000);  // 最终生成时间
      }
      else if(timeCategory === "stepIncrementSingleTime")  // 有关联关系时生成固定步长时间序列,步长由所关联字段步长决定
      {
        if(relationCategory === "randomSingleTime" || relationCategory === "randomIncrementSingleTime"){  // 所关联字段时间类型为随机时刻或随机递增时无法关联
          throw new Error(`${options.__fieldName}字段所选时间类型无法与${relation.fieldNames}字段时间类型进行关联`);
        }
        else{  // 所关联字段时间类型为固定步长递增，当前字段步长由所关联字段步长决定
          if(minInterval !== maxInterval){
            throw new Error(`${options.__fieldName}字段所选时间类型与${relation.fieldNames}字段时间类型进行关联时最大最小间隔需相等`);
          }
          randomInterval = floor(random() * (maxInterval - minInterval + 1) + minInterval) + relVal;  // 单位为秒
          transResult = randomInterval;  // 传递生成结果时间戳
          resultTIme = new Date(randomInterval * 1000);  // 最终生成时间
        }
      }
      else{  // 有关联关系时生成随机递增时间序列
        if(relationCategory === "randomSingleTime"){  // 所关联字段时间类型为随机时间
          throw new Error(`${options.__fieldName}字段所选时间类型无法与${relation.fieldNames}字段时间类型进行关联`);
        }
        else if(relationCategory === "stepIncrementSingleTime" || relationCategory === "randomIncrementSingleTime" ){  // 所关联字段时间类型为固定步长递增或随机递增
          randomInterval = floor(random() * (maxInterval - minInterval + 1) + minInterval) + relVal;  // 单位为秒
          while(randomInterval < options.__lastTimeValue){  // 确保当前时间大于上一次生成的时间
            randomInterval = floor(random() * (maxInterval - minInterval + 1) + minInterval) + relVal;  // 单位为秒
          }
          transResult = randomInterval;  // 传递生成结果时间戳
          resultTIme = new Date(randomInterval * 1000);  // 最终生成时间
          options.__lastTimeValue = randomInterval;  // 传递上一次生成时间，确保下一次生成时间大于上一次时间
        }
      }
    }
  }
  //无关联关系
  else{
    if(initialTime[0] === ''){
      throw new Error(`请输入起止时间`);
    }
    if(!timeCategory ){
      throw new Error(`请选择生成时间类型`);
    }
    if(timeCategory === "randomSingleTime"){  // 生成随机时间
      var randomStamp =  floor(random() * (endTimeStamp - startTimeStamp + 1) + startTimeStamp);
      resultTIme = new Date(randomStamp * 1000);
      transResult = Number(randomStamp);  // 传递生成结果的时间戳
    }
    else if(timeCategory === "stepIncrementSingleTime") {  // 生成固定步长递增时间
      let stepTime = startTimeStamp + options.__counter * timeStep;
      resultTIme = new Date(stepTime * 1000);
      transResult = Number(stepTime);  // 传递生成结果的时间戳
      if(stepTime > endTimeStamp || stepTime < startTimeStamp ){
        throw new Error(`${options.__fieldName}生成时间已超出所设置时间范围`);
      }
    }
    else{  // 生成随机递增时间
      if(options.minStep > options.maxStep){
        throw new Error(`最小间隔需小于等于最大间隔`);
      }
      var randomStep = floor(random() * (options.maxStep - options.minStep + 1) + options.minStep);  // 选择随机步长
      if(options.__counter === 0){  // 起始时间
        randomStepStamp = startTimeStamp;
        options.__lastTimeValue = randomStepStamp;
      }
      else{  // 在上一次时间值的基础上累加
        randomStepStamp = options.__lastTimeValue + randomStep * 60;
        options.__lastTimeValue = randomStepStamp;//记录本次产生的值，用于下一次时间的累加
      }
      if(randomStepStamp > endTimeStamp || randomStepStamp < startTimeStamp ){
        throw new Error(`${options.__fieldName}生成时间已超出所设置时间范围`);
      }
      resultTIme = new Date(randomStepStamp * 1000);
      transResult = Number(randomStepStamp);//传递生成结果的时间戳
    }
  }
  // 时间格式选择
  var timelist = [String(resultTIme.getFullYear()), String(resultTIme.getMonth() + 1), String(resultTIme.getDate()), String(resultTIme.getHours()), String(resultTIme.getMinutes()), String(resultTIme.getSeconds())]
  for(var i=0; i < timelist.length; i++){
    if (timelist[i].length < 2){
      timelist[i] = '0' + timelist[i];
    }
  }
  if(timeFormat === 'FORMAT_1'){
    resultTIme = resultTIme.toLocaleDateString().replace(/\//g, "-") + " " + resultTIme.toTimeString().substr(0, 8);
  }
  else if(timeFormat === 'FORMAT_2'){
    resultTIme = timelist[0] + '-' + timelist[1] + '-' + timelist[2];
  }
  else if(timeFormat === 'FORMAT_3'){
    resultTIme = timelist[0] + '年' + timelist[1] + '月' + timelist[2] + '日';
  }
  else if(timeFormat === 'FORMAT_5'){
    resultTIme = timelist[0] + timelist[1] + timelist[2];
  }
  else{
    resultTIme = timelist[0] + '年' + timelist[1] + '月' + timelist[2] + '日' + ' ' + timelist[3] + '时' + timelist[4] + '分';
  }

  const deliver_options = {};
  deliver_options[FIELD_PRE + options.__fieldName] = transResult;
  deliver_options['relationCategory'] = timeCategory;
  return{
    options: deliver_options,
    data:resultTIme
  };
};
