<template>
  <!-- TODO: 解释、例子、预览 -->
  <div class="home">
    

    <Exporter v-if="rawdata.length > 0" filename="result" filetype="json" :rawdata="rawdata" />
    <Input v-model="nrows" />
    <Button @click="generate"> 生成 </Button>
    

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
      class="config-row"
    >
      <Icon type="md-close" @click="delRow(k)"/>
    </div>
      

    <Select v-model="dataTypeToAdd">
      <Option :value="dataType" v-for="dataType in Object.keys(DATA_TYPES)"> {{ DATA_TYPES[dataType].alias }} </Option>
    </Select>
    <Button type="primary" @click="addRow()">添加字段</Button>

    <Button @click="checkData"> 检查数据 </Button>
  </div>
</template>

<script>
// @ is an alias to /src
import Vue from 'vue';
import deepcopy from 'deepcopy';
import draggable from 'vuedraggable';
import { Progress, Button, Input, Select, Option, Icon } from 'iview';
import Exporter from '@/components/Exporter/index.vue';
import { Generator } from '@/generator/index';
import { SexConfig, NameConfig, CounterConfig, NumberConfig ,TimeConfig} from '@/components/datatypesconfig/index.js';
import { DATA_TYPES } from '@/datatypes/index.js';

export default {
  name: 'home',
  data() {
    return {
      DATA_TYPES: DATA_TYPES,
      dataTypeConfigs: [
      ],
      dataTypeToAdd: 'Sex',
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
    Icon,
    // vue draggable
    draggable,
    
    // 字段配置组件
    SexConfig,
    NameConfig,
    CounterConfig,
    NumberConfig,
    TimeConfig
  },
  mounted() {
  },
  methods: {
    parseDataTypeConfigs() {
      let dataTypeConfigs = deepcopy(this.dataTypeConfigs);
      dataTypeConfigs.forEach(el => {
        el.options = JSON.parse(el.options);
        el.relation = JSON.parse(el.relation);
      });
      return dataTypeConfigs;
    },
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

    addRow() {
      const { dataTypeToAdd, dataTypeConfigs } = this;
      const component = dataTypeToAdd + 'Config'

      dataTypeConfigs.push({
        component: component,
        fieldName: "",
        dataType: dataTypeToAdd,
        options: JSON.stringify(DATA_TYPES[dataTypeToAdd].options),
        relation: JSON.stringify(DATA_TYPES[dataTypeToAdd].relation)
      })
    },
    delRow(k) {
      this.dataTypeConfigs.splice(k, 1);
    },
    checkData() {
      console.log(this.dataTypeConfigs)
    }
  }
}
</script>

<style lang="scss">
.config-row {
  font-size: 15px;
  padding: 20px 0 6px 0;
  margin-bottom: 5px;
  background-color: #f1fafa;
  display: flex;
  flex-flow: row nowrap;

  justify-content: flex-start; // 主轴排列方式
  align-items: center; // 交叉轴对齐方式
  
  &:nth-child(2n) {
    background-color: #fafafa;
  }

  .field-type {
    width: 70px;
    margin-right: 10px;
  }

  .field-name {
    width: 160px;
    margin-right: 10px;
  }

  .relation-config {
    width:120px;
    .ivu-select-selection {
      width:120px;
    }
  }

  .field-config {
    flex: 1;
    display: flex;
    justify-content: flex-start; // 主轴排列方式
    align-items: center; // 交叉轴对齐方式

    .config-item {
      margin-right: 10px;
      display: flex;
      justify-content: flex-start; // 主轴排列方式
      align-items: center; // 交叉轴对齐方式
    }
  }

  .switch-config {
    width: 70px;
  }
  
  .close-slot {
    width: 30px;
    cursor: pointer;
    font-size: 16px;
  }

  .question {
    color: #66cccc; margin-left: 2px; cursor: pointer; font-size: 12px;
  }
}

label {
  position:relative;
  display:inline-block;

  .config-title {
    padding: 4px;
    pointer-events: none;
    position:absolute;
    left:0;
    top: -22px;
    color: #479ac7;
    font-size: 12px;
  }
}

</style>

