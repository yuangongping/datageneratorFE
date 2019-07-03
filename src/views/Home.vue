<template>
  <!-- TODO: 解释、例子、预览 -->
  <div class="home">
     <div class="action-area">
      <BasicConfig 
        @basic-config="basicConfig">
      </BasicConfig>

      <FastConfig 
      @fast-config="fastConfig">
      </FastConfig>
     </div>

    <Exporter v-if="rawdata.length > 0" filename="result" filetype="json" :rawdata="rawdata" ></Exporter>
    <Input v-model="nrows" />
    
    <!-- 生产数据的展示区域 -->
    <ul>
      <li v-for="(datarow, k) in dataGened" :key="k">
        {{ datarow }}
      </li>
    </ul>
    <div class="field-list">
      <div class="field-title">配置项</div>
      <Scroll  v-if="dataTypeConfigs.length > 0">
        <transition-group name="flip-list" >
          <div 
            v-for="(dataTypeConfig, k) in dataTypeConfigs"
            :key="dataTypeConfig.id"
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
            

            <!-- 【 通用区域 】下上移动字段、唯一性和字段显示设置、关闭按钮 -->

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

            <div class="up-down" >
                <Icon v-if="k > 0" type="md-arrow-up" @click="sortUp(k)"></Icon>
                <Icon v-if="k < dataTypeConfigs.length - 1" type="md-arrow-down" @click="sortDown(k)"></Icon>
            </div>

            <div class="delrow">
              <Icon type="md-close" @click="delRow(k)"/>
            </div>
            <!-------------------->

          </div>
        </transition-group>
      </Scroll>
    </div>
      
    <!-- <Select v-model="dataTypeToAdd">
      <Option :value="dataType" v-for="dataType in Object.keys(DATA_TYPES)" :key=dataType> {{ DATA_TYPES[dataType].alias }} </Option>
    </Select>
    <Button type="primary" @click="addRow()">添加字段</Button> -->
    <Button @click="checkData"> 检查数据 </Button>
    
  </div>
</template>

<script>
// @ is an alias to /src
import Vue from 'vue'
import deepcopy from 'deepcopy';
import draggable from 'vuedraggable';
import { Progress, Button, Input, Select, Option, Icon, Tag, Switch, Tooltip, Scroll } from 'iview';
import Exporter from '@/components/Exporter/index.vue';
import FastConfig from '@/components/FastConfig/FastConfig.vue';
import BasicConfig from '@/components/BasicConfig/BasicConfig.vue';
import { Generator } from '@/generator/index';
import { SexConfig, NameConfig, CounterConfig,
         NumberConfig, IdentificationNumberConfig, Str2NumberConfig,
         StrSpliceConfig, StringSegmenteConfig ,RandomChoiceConfig,
         TextConfig, TimeConfig, ProvinceConfig, 
         CityConfig, DistrictConfig, DistrictCodeConfig } from '@/components/datatypesconfig/index.js';  
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
      rawdata: ''
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
    Scroll,
    'i-switch': Switch,
    // vue draggable
    draggable,
    // 字段配置组件
    SexConfig,
    NameConfig,
    CounterConfig,
    NumberConfig,
    ProvinceConfig,
    CityConfig,
    DistrictConfig,
    DistrictCodeConfig,
    IdentificationNumberConfig,
    Str2NumberConfig,
    StrSpliceConfig,
    StringSegmenteConfig,
    RandomChoiceConfig,
    TextConfig,
    TimeConfig,
    FastConfig,
    BasicConfig
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
        el.options.__unique = el.__unique;
        el.options.__display = el.__display;
        // 用于为options添加 __$$fieldname: gendata 为其关联的字段传入生成值
        el.options.__fieldName = el.fieldName;
        el.relation = JSON.parse(el.relation);
      });
      // 返回格式化后的数据
      return dataTypeConfigs;
    },

    // 生产数据函数
    generate() {
      console.log('##############', this.dataTypeConfigs)
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


    // 基础字段组件
    basicConfig(componentToAdd) {
      const { dataTypeConfigs } = this;
      const component = componentToAdd + 'Config'
      dataTypeConfigs.push({
        component: component,
        id: new Date().getTime().toString(), // 使用时间戳添加一个唯一标识，可用于排序动画等
        fieldName: "",
        dataType: componentToAdd,
        options: JSON.stringify(DATA_TYPES[componentToAdd].options),
        relation: JSON.stringify(DATA_TYPES[componentToAdd].relation),
        __unique: DATA_TYPES[componentToAdd].__unique,
        __display: DATA_TYPES[componentToAdd].__display,
      })
    },
    // 快捷添加
    fastConfig(configs) {
      const { dataTypeConfigs } = this;
      const time = new Date().getTime();
      for (const i in configs) {
        dataTypeConfigs.push({
          component: configs[i].component,
          id: (time + i).toString(),
          fieldName: configs[i].fieldName,
          dataType: configs[i].dataType,
          options: JSON.stringify(configs[i].options),
          relation: JSON.stringify(configs[i].relation),
          __unique: configs[i].__unique,
          __display: configs[i].__display,
        })
      }
    },
    
    // 删除字段组件， k下标
    delRow(k) {
      this.dataTypeConfigs.splice(k, 1);
    },

    // 数据检查函数
    sortUp(k) {
      if (k != 0) {
        let temp = this.dataTypeConfigs[k - 1];
        Vue.set(this.dataTypeConfigs, k - 1, this.dataTypeConfigs[k]);
        Vue.set(this.dataTypeConfigs, k, temp);
      }
    },
    sortDown(k) {
      if (k != (this.dataTypeConfigs.length - 1)) {
        let temp = this.dataTypeConfigs[k + 1];
        Vue.set(this.dataTypeConfigs, k + 1, this.dataTypeConfigs[k]);
        Vue.set(this.dataTypeConfigs, k, temp);
      }
    },
    checkData() {
      console.log(this.dataTypeConfigs)
    }
  }
}
</script>

<style lang="scss">
.home {
  padding: 0 30px;
}
.flip-list-move {
  transition: transform 1s;
}
.field-list {
  margin-top: 15px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  background-color: #ffffff;
  padding: 10px 10px;
}
.field-title {
    height: 20px;
    line-height: 20px;
    margin-bottom: 10px;
    font-size: 16px;
    font-weight: 700;
    font-family: "SimHei";
    color: #2d8cf0;
    padding-left: 10px;
    border-left: 2px solid #2d8cf0;
  }

.action-area {
  display: flex;
  div {
    &:nth-child(n) {
      margin-right: 20px;
    }
    &:nth-child(2n) {
      margin-right: 0;
    }
  }
}

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
  .up-down {
    width: 30px;
    display: flex;
    flex-direction: column;
    cursor: pointer;
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
