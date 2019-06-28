import { FIELD_PRE, RELATION_ENUM } from '../CONST.js';
import { random, floor} from 'mathjs';
export default (options,relation) => {

  const timeStep = (Number(options.timeStep) || 1)*60;/*步长*/
  const initialTime = options.initialTime;
  const timeFormat = options.timeFormat;
  const timeCategory = options.timeCategory;
  const startTimeStamp = Number(Date.parse(initialTime[0])/1000);/*将起始时间转换为时间戳*/
  const endTimeStamp = Number(Date.parse(initialTime[1])/1000);
  var transResult,resultTIme,randomStepStamp,randomInterval;
  //有关联关系
  if(relation.type != RELATION_ENUM.INDEPEND.EN) {
    if (relation.fieldNames.indexOf(',') > -1) {
      throw new Error(`数字类型的字段 ${options.__fieldName} 只能有一个关联字段`);
    }
    const relVal = parseFloat(options[FIELD_PRE + relation.fieldNames]);//从关联字段取值
    const relationCategory = options['relationCategory'];//所关联字段的时间类型
    if (relation.type == RELATION_ENUM.After.EN){
      const minInterval = relation.minInterval*60;
      const maxInterval = relation.maxInterval*60;
      if(minInterval>maxInterval){
        throw new Error(`最小间隔需小于等于最大间隔`);
      }
      if (timeCategory == "randomSingleTime"){
        randomInterval = floor(random()*(maxInterval-minInterval+1)+minInterval) + relVal;//单位为秒
        transResult = randomInterval;//传递生成结果时间戳
        resultTIme = new Date(randomInterval*1000);
      }
      else if(timeCategory == "stepIncrementSingleTime")//有关联关系时生成固定步长时间序列,步长由所关联字段步长决定
      {
        if(relationCategory=="randomSingleTime" || relationCategory=="randomIncrementSingleTime"){//所关联字段时间类型为随机时间
          throw new Error(`${options.__fieldName}字段所选时间类型无法与${relation.fieldNames}字段时间类型进行关联`);
        }
        else{
          if(minInterval!=maxInterval){
            throw new Error(`${options.__fieldName}字段所选时间类型与${relation.fieldNames}字段时间类型进行关联时最大最小间隔需相等`);
          }
          randomInterval = floor(random()*(maxInterval-minInterval+1)+minInterval) + relVal;//单位为秒
          transResult = randomInterval;//传递生成结果时间戳
          resultTIme = new Date(randomInterval*1000);
        }
      }
      else{//有关联关系时生成随机递增时间序列
        if(relationCategory=="randomSingleTime"){//所关联字段时间类型为随机时间
          throw new Error(`${options.__fieldName}字段所选时间类型无法与${relation.fieldNames}字段时间类型进行关联`);
        }
        else if(relationCategory=="stepIncrementSingleTime" || relationCategory=="randomIncrementSingleTime" ){//所关联字段时间类型为固定步长递增或随机递增
          randomInterval = floor(random()*(maxInterval-minInterval+1)+minInterval) + relVal;//单位为秒
          while(randomInterval<=options.__lastTimeValue){
            randomInterval = floor(random()*(maxInterval-minInterval+1)+minInterval) + relVal;//单位为秒
          }
          transResult = randomInterval;//传递生成结果时间戳
          resultTIme = new Date(randomInterval*1000);
          options.__lastTimeValue = randomInterval;//传递上一次生成时间，确保下一次生成时间大于上一次时间
        }
      }
    }
  }
  //无关联关系
  else{
    if(timeCategory == "randomSingleTime"){//生成随机时间
      var randomStamp =  floor(random()*(endTimeStamp-startTimeStamp+1)+startTimeStamp);
      resultTIme = new Date(randomStamp*1000);
      transResult = Number(randomStamp);//传递生成结果的时间戳
    }
    else if(timeCategory == "stepIncrementSingleTime") {//生成固定步长递增时间
      let stepTime = startTimeStamp + options.__counter*timeStep;
      resultTIme = new Date(stepTime*1000);
      transResult = Number(stepTime);//传递生成结果的时间戳
      if(stepTime>endTimeStamp || stepTime<startTimeStamp ){
        throw new Error(`${options.__fieldName}生成时间已超出所设置时间范围`);
      }
    }
    else{//生成随机递增时间
      if(options.minStep>options.maxStep){
        throw new Error(`最小间隔需小于等于最大间隔`);
      }
      var randomStep = floor(random()*(options.maxStep-options.minStep+1)+options.minStep);
      if(options.__counter==0){
        randomStepStamp = startTimeStamp+randomStep*60;
        options.__accumulate = randomStepStamp;
      }
      else{
        randomStepStamp = options.__accumulate+randomStep*60;
        options.__accumulate = randomStepStamp;
      }
      if(randomStepStamp>endTimeStamp || randomStepStamp<startTimeStamp ){
        throw new Error(`${options.__fieldName}生成时间已超出所设置时间范围`);
      }
      resultTIme = new Date(randomStepStamp*1000);
      transResult = Number(randomStepStamp);//传递生成结果的时间戳
    }
  }
  // 格式选择
  var timelist = [String(resultTIme.getFullYear()), String(resultTIme.getMonth()+1),String(resultTIme.getDate()),String(resultTIme.getHours()),String(resultTIme.getMinutes()),String(resultTIme.getSeconds())]
  for(var i=0;i<timelist.length;i++){
    if (timelist[i].length<2){
      timelist[i] = '0'+timelist[i];
    }
  }
  if(timeFormat == 'format_1'){
    resultTIme = resultTIme.toLocaleDateString().replace(/\//g, "-") + " " + resultTIme.toTimeString().substr(0, 8);
  }
  else if(timeFormat=='format_2'){
    resultTIme = timelist[0]+'-'+timelist[1]+'-'+timelist[2];
  }
  else if(timeFormat=='format_3'){
    resultTIme = timelist[0]+'年'+timelist[1]+'月'+timelist[2]+'日';
  }
  else if(timeFormat=='format_5'){
    resultTIme =timelist[0]+timelist[1]+timelist[2];
  }
  else{
    resultTIme =timelist[0]+'年'+timelist[1]+'月'+timelist[2]+'日'+' '+timelist[3]+'时'+timelist[4]+'分';
  }

  const deliver_options = {};
  deliver_options[FIELD_PRE + options.__fieldName] = transResult;
  deliver_options['relationCategory'] = timeCategory;
  return{
    options: deliver_options,
    data:resultTIme
  };
};
