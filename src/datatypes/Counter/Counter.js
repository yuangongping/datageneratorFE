import { FIELD_PRE } from '@/datatypes/CONST.js';

export default (options) => {
  const division = Number(options.division) || 1;
  const startNum = Number(options.startNum) || 0;
  const template = options.template;
  let an = startNum + options.__counter * division;

  if (template) {
    if (template.indexOf('${DATA}') < 0) {
      throw new Error("计数器模板式格式不正确，请检查！");
    } else {
      an = template.replace('${DATA}', an);
    }
  }
  const deliver_options = {};
  deliver_options[FIELD_PRE + options.__fieldName] = an;
  return {
    options: {},
    data: an
  };
};