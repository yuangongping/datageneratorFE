/**
 * @description 随机选择数组中的一个元素
 * @param {Array} arr : 待选数组
 * @return {any} 
 */
export const randomChoice = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
}
