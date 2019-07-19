import { DATA_TYPES } from '@/datatypes/index.js';
import deepcopy from 'deepcopy';
import { RELATION_ENUM } from '../datatypes/CONST';
// import { randomBytes } from 'crypto';

export class Generator {
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
        const fieldDict = {};
        configArr.forEach(el => {
            if (el.fieldName.length == 0) {
                throw new Error("字段名不能为空, 请填写字段名");
            } else {
                if (fieldDict[el.fieldName]) {
                    throw new Error(`存在相同的字段名 ${el.fieldName} , 请重新填写字段名`);
                } else {
                    fieldDict[el.fieldName] = true;
                }
            }
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
    handleField(sortedFields, fieldName) {
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
                // 得到生成结果
                genResult = genFunc(options, relation);
                // 判断生成的值是否已经存在，不存在则
                if (!dataFilter[fieldName][genResult.data]) {
                    dataFilter[fieldName][genResult.data] = true;
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
        // 依据需要生成的数据量进行循环
        const sortedDataTypes = this.getSortedDataTypes();
        for (let i = 0; i < nrows; i++) {
            // 生成单个数据变量
            const genOneObj = {};
            sortedDataTypes.forEach(el => {
                let options = el.dataType.options;
                // 放入计数器
                options.__counter = i;
                // 判断数据是否存在关联字段，有些组件有，有些组件没有
                // 放入计数器
                options.__counter = i;
                if (el.dataType.relation) {
                    // 判断字段是否相关，不等于独立字段RELATION_ENUM.INDEPEND.EN，即相关
                    if (el.dataType.relation.type != RELATION_ENUM.INDEPEND.EN) {
                        // 获取关联字段名，多个关联字段以 ， 分割
                        const relateFieldNames = el.dataType.relation.fieldNames.split(',');
                        // 遍历关联字段
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
                // 获取各个字段的值
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

    wokerGenerate(workerSelf) {
        const { jsonTemplate, nrows } = this;

        /** worker version */
        const nrowsDeno = (nrows - 1) / 100;
        let lastPercent = 0;

        const data = [];
        // 依据需要生成的数据量进行循环
        const sortedDataTypes = this.getSortedDataTypes();
        for (let i = 0; i < nrows; i++) {
            // 生成单个数据变量
            const genOneObj = {};
            sortedDataTypes.forEach(el => {
                let options = el.dataType.options;
                // 放入计数器
                options.__counter = i;
                // 判断数据是否存在关联字段，有些组件有，有些组件没有
                // 放入计数器
                options.__counter = i;
                if (el.dataType.relation) {
                    // 判断字段是否相关，不等于独立字段RELATION_ENUM.INDEPEND.EN，即相关
                    if (el.dataType.relation.type != RELATION_ENUM.INDEPEND.EN) {
                        // 获取关联字段名，多个关联字段以 ， 分割
                        const relateFieldNames = el.dataType.relation.fieldNames.split(',');
                        // 遍历关联字段
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
                // 获取各个字段的值
                genOneObj[el.fieldName] = this.getValue(el.dataType.genFunc, el.fieldName, options, el.dataType.relation);
            });

            // 按照之前的数据模板重新赋值生成的数据，保证之前模板不受排序的影响
            const templateRow = {};
            for (let key in jsonTemplate) {
                templateRow[key] = genOneObj[key].data;
            }

            data.push(templateRow);

            /** worker version */
            const percent = parseInt(i / nrowsDeno);
            if (percent % 5 == 0 && percent != lastPercent) {
                workerSelf.postMessage({
                    type: 'PERCENT',
                    data: percent
                });
                lastPercent = percent;
            }
        }
        return data;
    }
}