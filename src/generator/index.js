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
   * 处理每一个字段名，将其按关联顺序存放在排序后的字段里面
   * @param {Array} sortedFields 
   * @param {string} fieldName 
   */
  handleField(sortedFields, fieldName){
    let hasField = false;
    for (let config of this.configArr) { 
      if (fieldName == config.fieldName) {
        hasField = true;
        
        if (config.relation && config.relation.type != RELATION_ENUM.INDEPEND.EN) {
          if (config.relation.fieldNames.trim() == '') {
            throw new Error(`字段 ${config.fieldName} 存在空的关联关系！请添加正确的关联关系或改为独立字段！`)
          }
          const relateFieldNames = config.relation.fieldNames.split(',')
          // 遍历关联字段
          for (let relateField of relateFieldNames) {
            // 如果关联字段不在排序数组里面，继续递归处理关联字段
            if (sortedFields.indexOf(relateField) < 0) {
              try {
                this.handleField(sortedFields, relateField)
              } catch (e) {
                throw new Error(`处理关联字段：${relateField} 出错！请仔细检查关联关系！是否存在循环引用或不相关的字段？`)
              }
            } else {
              // 如果关联字段在排序数组里面, 将本字段放入排序数组
              if (sortedFields.indexOf(fieldName) < 0) {
                sortedFields.push(fieldName)
              }
            }
            // 对字段的关联字段 及 关联字段的关联字段进行递归处理之后
            // 别忘了对字段本身再做一次处理
            if (sortedFields.indexOf(fieldName) < 0) {
              try {
                this.handleField(sortedFields, fieldName);
              } catch (e) {
                throw new Error(`处理字段：${fieldName} 出错！请仔细检查关联关系！`)
              }
            }
          }
        } else {
          // 如果没有关联字段, 直接放在排序数组的最前方
          if (sortedFields.indexOf(fieldName) < 0) {
            sortedFields.unshift(config.fieldName)
          }
        }
        break;
      }
    }

    if (!hasField) {
      throw new Error(`不存在的字段名：${fieldName}`)
    }
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
    let sortedFields = []
    
    for (const config of configArr) {
      this.handleField(sortedFields, config.fieldName);
    }
    
    const sortedConfigArr = [];
    for (const field of sortedFields) {
      for (const config of configArr) {
        if (config.fieldName == field) {
          const tempDataType = {
            fieldName: field,
            dataType: deepcopy(DATA_TYPES[config.dataType])
          };
          // 合并默认的options、relation与自定义的options、relation
          Object.assign(tempDataType.dataType.options, config.options);
          if (tempDataType.dataType.relation != undefined) {
            Object.assign(tempDataType.dataType.relation, config.relation)
          }
          // 如果字段是唯一的，创建数据过滤器
          if (tempDataType.dataType.options.__unique) {
            dataFilter[field] = [];
          }
          sortedConfigArr.push(tempDataType);
          break;
        }
      } 
    }
    return sortedConfigArr;
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
    const { jsonTemplate, nrows } = this;
    const data = [];

    const sortedDataTypes = this.getSortedDataTypes();

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
              if (genOneObj[relateField] != undefined) {
                Object.assign(options, genOneObj[relateField].options);
              } else {
                throw new Error(`处理字段 ${el.fieldName} 的关联字段 ${relateField}出错，请仔细检查关联关系！是否存在循环引用或不相关的字段？`);
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

