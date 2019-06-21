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
    >
    <Button @click="delRow(k)">删除</Button>
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
import { Progress, Button, Input, Select, Option } from 'iview';
import Exporter from '@/components/Exporter/index.vue';
import { Generator } from '@/generator/index';
import { SexConfig, NameConfig, CounterConfig, NumberConfig } from '@/components/datatypesconfig/index.js';
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
    // 字段配置组件
    SexConfig,
    NameConfig,
    CounterConfig,
    NumberConfig
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
      console.log(this.parseDataTypeConfigs())
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
      const component = dataTypeToAdd.toLowerCase() + '-config'

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
