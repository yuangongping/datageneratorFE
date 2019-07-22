/**
 * @description 随机选择数组中的一个元素
 * @param {Array} arr : 待选数组
 * @return {any} 
 */
export const randomChoice = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * @description 格式化时间为几天前
 * @param {String} datetime : 时间，格式为2019-07-16 11:11:11
 * @return {String} 格式化后的时间
 */
export const timeToAgo = (datetime) => {
  const diffTime =
    new Date().getTime() -
    new Date(datetime.replace(/\-/g, "/")).getTime();

  if (diffTime < 0) {
    console.log(`当前日期小于待格式化${datetime}的日期`);
    return datetime;
  }

  const dayDiff = diffTime / (86400000);
  const hourDiff = diffTime / (3600000);
  const minDiff = diffTime / (60000);

  if (dayDiff > 3) {
    return datetime;
  } else if (dayDiff >= 1 && dayDiff <= 3) {
    return parseInt(dayDiff) + "天前";
  } else if (hourDiff >= 1) {
    return parseInt(hourDiff) + "小时前";
  } else if (minDiff >= 1) {
    return parseInt(minDiff) + "分钟前";
  } else {
    return "刚刚";
  }
}