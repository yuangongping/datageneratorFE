<template>
  <!-- TODO: 解释、例子、预览 -->
  <div class="home">
    

    <Exporter v-if="rawdata.length > 0" filename="result" filetype="json" :rawdata="rawdata" />
    <Input v-model="nrows" />
    <Button @click="generate"> 生成 </Button>
    
    <!-- 生产数据的展示区域 -->
    <ul>
      <li v-for="(datarow, k) in dataGened" :key="k">
        {{ datarow }}
      </li>
    </ul>

    <div 
      :is="dataTypeConfig.component" 
      :dataType="dataTypeConfig.dataType"
      :fieldName.sync="dataTypeConfig.fieldName" 
      :options.sync="dataTypeConfig.options"
      :relation.sync="dataTypeConfig.relation"
      v-for="(dataTypeConfig, k) in dataTypeConfigs"
      :key="k"
    >
      <Button @click="delRow(k)">删除</Button>
    </div>
    
    <!-- 组件选择器 -->
    <Select v-model="dataTypeToAdd">
      <Option :value="dataType" v-for="dataType in Object.keys(DATA_TYPES)" :key="dataType"> {{ DATA_TYPES[dataType].alias }} </Option>
    </Select>
    <Button type="primary" @click="addRow()">添加字段</Button>
    <Button @click="checkData"> 检查数据 </Button>
  </div>
</template>

<script>
// @ is an alias to /src
import deepcopy from 'deepcopy';
import { Progress, Button, Input, Select, Option } from 'iview';
import Exporter from '@/components/Exporter/index.vue';
import { Generator } from '@/generator/index';
import { SexConfig, NameConfig, CounterConfig,
         NumberConfig, IdentificationNumberConfig,
         Str2NumberConfig, StrSpliceConfig,
         StringSegmenteConfig } from '@/components/datatypesconfig/index.js';
import { DATA_TYPES } from '@/datatypes/index.js';

export default {
  name: 'home',
  data() {
    return {
      DATA_TYPES: DATA_TYPES,
      dataTypeConfigs: [
      ],
      dataTypeToAdd: 'Sex',
      // 生成的数据量变量
      nrows: 5,
      // 数据生成结果
      dataGened: [],
      rawdata: '',
    }
  },
  components: {
    Exporter,
    Progress,
    Button,
    Input,
    Select,
    Option,
    // 字段配置组件
    SexConfig,
    NameConfig,
    CounterConfig,
    NumberConfig,
    IdentificationNumberConfig,
    Str2NumberConfig,
    StrSpliceConfig,
    StringSegmenteConfig
  },
  mounted() {
  },
  methods: {
    // 解析dataTypeConfigs数组中的参数
    parseDataTypeConfigs() {
      // 深度复制 this.dataTypeConfigs 变量 
      let dataTypeConfigs = deepcopy(this.dataTypeConfigs);
      // 遍历dataTypeConfigs数组，功能是将options，relation由字符串转变为数据对象，如字典或列表，因为传入的参数时转变为了字符串
      dataTypeConfigs.forEach(el => {
        el.options = JSON.parse(el.options);
        el.relation = JSON.parse(el.relation);
      });
      // 返回格式化后的数据
      return dataTypeConfigs;
    },

    // 生产数据函数
    generate() {
      const generator = new Generator(this.parseDataTypeConfigs(), this.nrows);
      
      try {
        this.dataGened = generator.generate();
      } catch (e) {
        this.$Message.error({
          content: e.toString(),
          duration: 5
        });
      }
      // this.rawdata = JSON.stringify(this.dataGened);
    },
     
    // 添加字段组件
    addRow() {
      // 依据选择器中选择选项确定组件类型与数据参数配置
      const { dataTypeToAdd, dataTypeConfigs } = this;
      // const component = 'SexConfig' //dataTypeToAdd.toLowerCase() + '-config'
      const component = dataTypeToAdd + 'Config'
      dataTypeConfigs.push({
        component: component,
        fieldName: "",
        dataType: dataTypeToAdd,
        options: JSON.stringify(DATA_TYPES[dataTypeToAdd].options),
        relation: JSON.stringify(DATA_TYPES[dataTypeToAdd].relation)
      })
    },
    
    // 删除字段组件， k下标
    delRow(k) {
      this.dataTypeConfigs.splice(k, 1);
    },

    // 数据检查函数
    checkData() {
      console.log(this.dataTypeConfigs)
    }
  }
}
</script>
