<template>

  <!-- 修改组件独立的样式时注意修改组件class -->
  <div class="time-config">

    <!-- 【 通用区域 】字段类型、字段名 -->
    <div class="field-type">
      <Tag color="primary">{{ dataTypeAlias }}</Tag>
    </div>

    <div class="field-name">
      <label>
        <Input type="text"
          v-model="fieldNameValue"
          @on-change="chgFieldName"
          placeholder=" "
        />
        <span class="config-title">字段名</span>
      </label>
    </div>
    <!-------------------->
    
    <div class="field-config">
      <div class="config-item">
        <label>
          <DatePicker type="datetimerange" 
            @on-change="chgOptions" 
            v-model="optionsValue.initialTime"
            placeholder="请输入起止时间"
            id="initialTime"></DatePicker>
          <span class="config-title">生成时间范围</span>
        </label>
      </div>

      <div class="config-item">
        <label>
          <Select
            v-model="optionsValue.__timeCategory" 
            placeholder="选择生成时间类型"
            @on-change="chgOptions"
            >
            <Option value="randomSingleTime" >随机时刻</Option>
            <Option value="stepIncrementSingleTime" >固定步长递增</Option>
            <Option value="randomIncrementSingleTime" >随机递增</Option>
            </Select>
        </label>
      </div>

      <div class="config-item step" v-if="optionsValue.__timeCategory === 'stepIncrementSingleTime'">
        <label>
          <InputNumber type="text"
            v-model="optionsValue.timeStep"
            @on-change="chgOptions"
            placeholder="(分钟)"
            />
          <span class="config-title">步长</span>
        </label>
      </div>

      <div class="config-item step" v-if="optionsValue.__timeCategory === 'randomIncrementSingleTime'">
        <label>
          <InputNumber type="text"
            v-model="optionsValue.minStep"
            @on-change="chgOptions"
            placeholder="(分钟)"
            />
          <span class="config-title">最小步长</span>
        </label>
        <label>
          <InputNumber type="text"
            v-model="optionsValue.maxStep"
            @on-change="chgOptions"
            placeholder="(分钟)"
            />
          <span class="config-title">最大步长</span>
        </label>
      </div>

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
          <span class="config-title">选择生成时间格式</span>
        </label>
      </div>

    </div>

    <!-- 【 通用区域 】唯一性和字段显示设置、关闭槽 -->
    <div class="switch-config">
      <Tooltip max-width="200" content="设置该字段是否为不重复的值，请合理设置唯一性" theme="light" placement="top">
        <i-switch
          size="large"
          v-model="optionsValue.__unique"
          @on-change="chgOptions"
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
          v-model="optionsValue.__display"
          @on-change="chgOptions"
        >
          <span slot="open">显示</span>
          <span slot="close">显示</span>
        </i-switch>
      </Tooltip>
    </div>

    <div class="close-slot">
      <slot></slot>
    </div>
  </div>
  <!-------------------->
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
import { Row, Col, Input,InputNumber, Select, Option, Tag, Switch ,DatePicker} from "iview";

export default {
  data() {
    return {
      dataTypeAlias: DATA_TYPES[this.dataType].alias,
      fieldNameValue: this.fieldName,
      optionsValue: JSON.parse(this.options),
      relationValue: JSON.parse(this.relation),
      RELATION_ENUM: RELATION_ENUM,
      allowRelations: ALLOW_RELATIONS[this.dataType]
    };
  },
  props: {
    fieldName: String,
    dataType: String,
    options: String,
    relation: String,
  },
  components: {
    Row,
    Col,
    Select,
    Option,
    Input,
    Tag,
    DatePicker,
    InputNumber,
    'i-switch': Switch
  },
  methods: {
    chgFieldName() {
      this.$emit('update:fieldName', this.fieldNameValue);
    },
    chgOptions() {
      this.$emit('update:options', JSON.stringify(this.optionsValue));
    },
    chgRelation() {
      this.$emit('update:relation', JSON.stringify(this.relationValue));
    }
  }
};
</script>
