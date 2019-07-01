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
          :disabled="relationValue.type==='After'?true:false"
        >
        </DatePicker>
        <span class="config-title">生成时间范围</span>
      </label>
    </div>

    <!--选择生成时间类型  -->

    <div class="config-item">
      <label>
        <Select
          v-model="optionsValue.timeCategory" 
          placeholder="选择生成时间类型"
          @on-change="chgOptions"
        >
          <Option value="randomSingleTime" >随机时刻</Option>
          <Option value="stepIncrementSingleTime" >固定步长递增</Option>
          <Option value="randomIncrementSingleTime" >随机递增</Option>
        </Select>
        <span class="config-title">生成时间类型</span>
      </label>
    </div>

    <!-- 固定步长类型时间需提供步长值 -->

    <div class="config-item step" v-if="optionsValue.timeCategory === 'stepIncrementSingleTime'">
      <label>
        <InputNumber type="text"
          v-model="optionsValue.timeStep"
          @on-change="chgOptions"
          placeholder="(分钟)"
          :disabled="relationValue.type==='After'?true:false"
        />
        <span class="config-title">步长</span>
      </label>
    </div>

    <!-- 随机步长类型时间需提供最大、最小步长值 -->

    <div class="config-item step" v-if="optionsValue.timeCategory === 'randomIncrementSingleTime'">
      <label>
        <InputNumber type="text"
          v-model="optionsValue.minStep"
          @on-change="chgOptions"
          placeholder="(分钟)"
          :disabled="relationValue.type==='After'?true:false"
          />
        <span class="config-title">最小步长</span>
      </label>

      <label>
        <InputNumber type="text"
          v-model="optionsValue.maxStep"
          @on-change="chgOptions"
          placeholder="(分钟)"
          :disabled="relationValue.type==='After'?true:false"
        />
        <span class="config-title">最大步长</span>
      </label>
    </div>

    <!-- 选择为独立字段或者关联字段 -->

    <div class="config-item relation-config">
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

    <div class="config-item">
      <label>
        <Input type="text"
          v-model="relationValue.fieldNames"
          @on-change="chgRelation"
        />
        <span class="config-title">关联字段</span>
      </label>
    </div>

    <!-- 关联其他字段取值时需提供最大、最小间隔值 -->
    <div class="config-item" v-if="relationValue.type === RELATION_ENUM.After.EN">
      <label>
        <InputNumber type="text"
          v-model="relationValue.minInterval"
          @on-change="chgRelation"
          placeholder="分钟"
        />
        <span class="config-title">最小间隔</span>
      </label>

      <label>
        <InputNumber type="text"
          v-model="relationValue.maxInterval"
          @on-change="chgRelation"
          placeholder="分钟"
        />
        <span class="config-title">最大间隔</span>
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
          <Option value="format_1" >yyyy-MM-dd HH:mm:ss</Option>
          <Option value="format_2" >yyyy-mm-dd</Option>
          <Option value="format_3" >年/月/日</Option>
          <Option value="format_4" >年/月/日/时/分</Option>
          <Option value="format_5" >yyyymmdd</Option>
        </Select>
        <span class="config-title">时间格式</span>
      </label>
    </div>
  </div>
</template>

<style lang="scss">
.time-config {
  .step {
    .ivu-input-number {
      width: 95px;
    }
  }
}
</style>


<script>
import { DATA_TYPES } from '@/datatypes/index.js'; 
import { RELATION_ENUM, ALLOW_RELATIONS } from '@/datatypes/CONST.js';
import {  Input,InputNumber, Select, Option ,DatePicker} from "iview";

export default {
  data() {
    return {
      optionsValue: JSON.parse(this.options),
      relationValue: JSON.parse(this.relation),
      RELATION_ENUM: RELATION_ENUM,
      allowRelations: ALLOW_RELATIONS[this.dataType]
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
    InputNumber
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
