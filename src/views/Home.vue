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
      v-for="(dataTypeConfig, k) in dataTypeConfigs"
      :key="k"
      class="config-row"
    >
      <!-- 【 通用区域 】字段类型、字段名 -->
      <div class="field-type">
        <Tag color="primary">
          <!-- {{ dataTypeConfig.dataType }} -->
          {{ DATA_TYPES[dataTypeConfig.dataType].alias }}
        </Tag>
      </div>

      <div class="field-name">
        <label>
          <Input type="text"
            v-model="dataTypeConfig.fieldName"
          />
          <span class="config-title">字段名</span>
        </label>
      </div>
      <!-------------------->

      <!-- 字段配置组件区域 -->
      <div
        class="field-config"
        :is="dataTypeConfig.component"
        :dataType="dataTypeConfig.dataType"
        :options.sync="dataTypeConfig.options"
        :relation.sync="dataTypeConfig.relation"
      ></div>
      <!-------------------->
      

      <!-- 【 通用区域 】唯一性和字段显示设置、关闭按钮 -->
      <div class="switch-config">
        <Tooltip max-width="200" content="设置该字段是否为不重复的值，请合理设置唯一性" theme="light" placement="top">
          <i-switch
            size="large"
            v-model="dataTypeConfig.__unique"
          >
            <span slot="open">唯一</span>
            <span slot="close">唯一</span>
          </i-switch>
        </Tooltip>
      </div>

      <div class="switch-config">
        <Tooltip max-width="200" content="设置该字段是否显示在生成结果中，某些用于过渡的字段可以不用在生成结果中显示" theme="light" placement="top">
          <i-switch
            size="large"
            v-model="dataTypeConfig.__display"
          >
            <span slot="open">显示</span>
            <span slot="close">显示</span>
          </i-switch>
        </Tooltip>
      </div>

      <div class="delrow">
        <Icon type="md-close" @click="delRow(k)"/>
      </div>
      <!-------------------->

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
import { Progress, Button, Input, Select, Option, Icon, Tag, Switch, Tooltip } from 'iview';
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
    Icon,
    Tag,
    Tooltip,
    'i-switch': Switch,
    // vue draggable
    draggable,
    
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
        el.options.__unique = el.__unique;
        el.options.__display = el.__display;
        // 用于为options添加 __$$fieldname: gendata 为其关联的字段传入生成值
        el.options.__fieldName = el.fieldName;
        el.relation = JSON.parse(el.relation);
      });
      return dataTypeConfigs;
    },
    generate() {
      console.log(this.parseDataTypeConfigs());
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
        relation: JSON.stringify(DATA_TYPES[dataTypeToAdd].relation),
        __unique: DATA_TYPES[dataTypeToAdd].__unique,
        __display: DATA_TYPES[dataTypeToAdd].__display,
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
  
  .delrow {
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

