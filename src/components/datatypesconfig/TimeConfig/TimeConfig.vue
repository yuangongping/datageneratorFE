<template>
  <!-- 修改组件独立的样式时注意修改组件class -->
  <div class="time-config">
    <!--选择时间生成范围  -->
    <div class="config-item">
      <label>
        <DatePicker type="datetimerange" 
          @on-change="chgOptions" 
          v-model="optionsValue.initialTime"
          placeholder="请输入起止时间"
          :disabled="relationValue.type==='GREATER'?true:false"
        >
        </DatePicker>
        <span class="config-title">生成时间范围</span>
      </label>
    </div>

    <!-- 选择生成时间类型  -->
    <div class="config-item">
      <label>
        <Select
          v-model="optionsValue.timeCategory" 
          placeholder="选择生成时间类型"
          @on-change="chgOptions"
        >
          <Option
            v-for="TimeTypeKey in Object.keys(Time_OPTIONS_ENUM.TIME_TYPE)"
            :value="TimeTypeKey"
            :key="TimeTypeKey"
          >{{ Time_OPTIONS_ENUM.TIME_TYPE[TimeTypeKey].CN}}</Option>
        </Select>
        <span class="config-title">生成时间类型</span>
      </label>
    </div>

    <!-- 固定步长类型时间需提供步长值 -->
    <div class="config-item" v-if="optionsValue.timeCategory === Time_OPTIONS_ENUM.TIME_TYPE.FIX.EN">
      <label>
        <InputNumber type="text"
          v-model="optionsValue.timeStep"
          @on-change="chgOptions"
          placeholder="分钟"
          :disabled="relationValue.type==='GREATER'?true:false"
        />
        <span class="config-title">步长 / 分钟</span>
      </label>
    </div>

    <!-- 随机步长类型时间需提供最大、最小步长值 -->
    <div class="config-item" v-if="optionsValue.timeCategory === Time_OPTIONS_ENUM.TIME_TYPE.RANDOMINCREMENT.EN">
      <label>
        <InputNumber type="text"
          v-model="optionsValue.minStep"
          @on-change="chgOptions"
          placeholder="分钟"
          :disabled="relationValue.type==='GREATER'?true:false"
          style="width:100px;"
          />
        <span class="config-title">最小步长 / 分钟</span>
      </label>
      <span style="margin-left:10px"></span>
      <label>
        <InputNumber type="text"
          v-model="optionsValue.maxStep"
          @on-change="chgOptions"
          placeholder="分钟"
          :disabled="relationValue.type==='GREATER'?true:false"
          style="width:100px;"
        />
        <span class="config-title">最大步长 / 分钟</span>
      </label>
    </div>

    <!-- 选择为独立字段或者关联字段 -->
    <div class="config-item">
      <Select
        v-model="relationValue.type" 
        @on-change="chgRelation"
      >
        <Option 
          v-for="relation in allowRelations"
          :value="relation"
          :key="relation"
        >
        {{ RELATION_ENUM[relation].CN }}
        </Option>
      </Select>
    </div>

    <div class="config-item" v-if="relationValue.type !== RELATION_ENUM.INDEPEND.EN">
      <label>
        <span class="config-title">关联字段</span>
        <Tooltip max-width="200" theme="light" placement="top">
          <div slot="content" v-if="relationValue.allowTypes === 'ALL'">可以关联所有字段</div>
          <div slot="content" v-else>建议关联 <Tag color="primary" style="color: #fff;" v-for="datatype in relationValue.allowTypes" :key="datatype">{{ DATA_TYPES[datatype].alias }}</Tag> 组件, 请合理设置关联字段</div>
          <Input type="text"
            v-model="relationValue.fieldNames"
            @on-change="chgRelation"
          />
        </Tooltip>
      </label>
    </div>

    <!-- 关联其他字段取值时需提供最大、最小间隔值 -->
    <div class="config-item" v-if="relationValue.type === RELATION_ENUM.GREATER.EN">
      <label>
        <InputNumber type="text"
          v-model="relationValue.minInterval"
          @on-change="chgRelation"
          placeholder="分钟"
          style="width:100px;"
        />
        <span class="config-title">最小间隔 / 分钟</span>
      </label>
      <span style="margin-left:10px"></span>
      <label>
        <InputNumber type="text"
          v-model="relationValue.maxInterval"
          @on-change="chgRelation"
          placeholder="分钟"
          style="width:100px;"
        />
        <span class="config-title">最大间隔 / 分钟</span>
      </label>
    </div> 
    
    <!-- 时间格式选择 -->
    <div class="config-item">
      <label>
        <Select
          v-model="optionsValue.timeFormat" 
          placeholder="选择生成时间格式"
          @on-change="chgOptions"
        >
          <Option
            v-for="TimeStyleKey in Object.keys(Time_OPTIONS_ENUM.TIME_STYLE)"
            :value="TimeStyleKey"
            :key="TimeStyleKey"
          >{{ Time_OPTIONS_ENUM.TIME_STYLE[TimeStyleKey].CN}}</Option>
        </Select>
        <span class="config-title">时间格式</span>
      </label>
    </div>
  </div>
</template>

<script>
import { RELATION_ENUM, ALLOW_RELATIONS, OPTIONS_ENUM } from '@/datatypes/CONST.js';
import {  Input,InputNumber, Select, Option ,DatePicker,  Tooltip, Tag } from "iview";
import { DATA_TYPES } from '@/datatypes/index.js';
export default {
  data() {
    return {
      DATA_TYPES: DATA_TYPES,
      optionsValue: JSON.parse(this.options),
      relationValue: JSON.parse(this.relation),
      RELATION_ENUM: RELATION_ENUM,
      allowRelations: ALLOW_RELATIONS[this.dataType],
      Time_OPTIONS_ENUM: OPTIONS_ENUM[this.dataType]
    };
  },
  props: {
    dataType: String,
    options: String,
    relation: String,
  },
  components: {
    Select,
    Option,
    Input,
    DatePicker,
    InputNumber,
    Tooltip,
    Tag 
  },
  methods: {
    chgOptions() {
      this.$emit('update:options', JSON.stringify(this.optionsValue));
    },
    chgRelation() {
      this.$emit('update:relation', JSON.stringify(this.relationValue));
    }
  }
};
</script>
