import { DATA_TYPES } from '@/datatypes/index.js';
import deepcopy from 'deepcopy';
import { RELATION_ENUM } from '../datatypes/CONST';

export class Generator{
  /**
   *Creates an instance of Generator.
   * @param {Array} configArr 配置数组
   * @param {Number} nrows 生成的行
   * @memberof Generator
   */
  constructor(configArr, nrows) {
    /**
     * configArr Example
     * 
     * [
        {
          fieldName: 'boyName',
          dataType: 'Name',
          options: {
            sex: 'man'
          }
        },
        ...
      ]
    */
    this.dataFilter = {}; // 数据过滤器，用于唯一性校验
    this.configArr = configArr;
    this.jsonTemplate = this.getJsonTemplate();
    this.sortedDataTypes = this.getSortedDataTypes();
    this.nrows = nrows;
  }
  
  /**
   * 通过配置数组生成一个json模板
   *
   * @memberof Generator
   */
  getJsonTemplate() {
    const { configArr } = this;
    const jsonTemplate = {};
    configArr.forEach(el => {
      if (el.options.__display) {
        jsonTemplate[el.fieldName] = null;
      }
    });
    return jsonTemplate;
  }

  /**
   *得到一个按照优先级排序过后的数据类型对象
   *按照优先级排序后高优先级的数据生成结果根据
   *关联性会传给低优先级的数据，保证两者结果相关联
   * priority 越小越优先
   *
   * @memberof Generator
   */
  getSortedDataTypes() {
    const { configArr, dataFilter } = this;
    const unsortDataTypes = []
    configArr.forEach(el => {
      const tempDataType = {
        fieldName: el.fieldName,
        dataType: deepcopy(DATA_TYPES[el.dataType])
      };
      // 赋值__fieldName
      el.options.__fieldName = el.fieldName;
      // 合并默认的options、relation与自定义的options、relation
      Object.assign(tempDataType.dataType.options, el.options);
      if (tempDataType.dataType.relation != undefined) {
        Object.assign(tempDataType.dataType.relation, el.relation)
      }
      // 如果字段是唯一的，创建数据过滤器
      if (tempDataType.dataType.options.__unique) {
        dataFilter[el.fieldName] = [];
      }
      unsortDataTypes.push(tempDataType);
    });

    const sortedDataTypes = unsortDataTypes.sort((a, b) => {
      return a.dataType.priority - b.dataType.priority;
    });
    return sortedDataTypes;
  }

  /**
   * 
   * @param {String} uniqueOpt 唯一性
   * @param {String} fieldName 字段名
   */
  getValue(genFunc, fieldName, options, relation) {
    const { dataFilter } = this;
    let genResult;
    if (options.__unique) {
      // 尝试10万次生成，用于重复校验
      let failStat = true;
      for (let i = 0; i < 100000; i++) {
        genResult = genFunc(options, relation);
        if (dataFilter[fieldName].indexOf(genResult.data) < 0) {
          dataFilter[fieldName].push(genResult.data);
          failStat = false;
          break;
        }
      }
      if (failStat) {
        throw new Error(`无法生成值不重复的字段${fieldName}, 请检查唯一性是否合理`);
      }
    } else {
      genResult = genFunc(options, relation);
    }
    return genResult;
  }

  generate() {
    const { jsonTemplate, nrows, sortedDataTypes } = this;
    const data = [];

    for (let i = 0; i < nrows; i++) {
      const genOneObj = {};
      sortedDataTypes.forEach(el => {
        let options = el.dataType.options;
        options.__counter = i; // 放入计数器
        
        if (el.dataType.relation) {
          // 如果存在关联的数据类型
          if (el.dataType.relation.type != RELATION_ENUM.INDEPEND.EN) {
            const relateFieldNames = el.dataType.relation.fieldNames.split(',');
            relateFieldNames.forEach(relateField => {
              // 合并与之关联的options与自己的options用于生成 新的options和data
              if (genOneObj[relateField]) {
                Object.assign(options, genOneObj[relateField].options);
              } else {
                throw new Error(`无法获取 ${el.fieldName} 的关联字段 ${relateField}，请检查关联的字段名称！`);
              }
            });
          }
        }
        genOneObj[el.fieldName] = this.getValue(el.dataType.genFunc, el.fieldName, options, el.dataType.relation);
      });

      // 按照之前的数据模板重新赋值生成的数据，保证之前模板不受排序的影响
      const templateRow = {};
      for (let key in jsonTemplate) {
        templateRow[key] = genOneObj[key].data;
      }
      data.push(templateRow);
    }
    return data;
  }

}

