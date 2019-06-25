<template>
  <Row :gutter="16">
    <Col :span="2">
      <Tag color="primary">{{ dataTypeAlias }}</Tag>
    </Col>
    <Col :span="4">
      <span class="option-title">字段名</span>
      <Input type="text"
       v-model="fieldNameValue"
       @on-change="chgFieldName"
       />
    </Col>
    <Col :span="3">
      <span class="option-title">最小随机值</span>
      <InputNumber
        v-model="optionsValue.min"
        @on-change="chgOptions"
      />
    </Col>
    <Col :span="3">
      <span class="option-title">最大随机值</span>
      <InputNumber
        v-model="optionsValue.max"
        @on-change="chgOptions"
      />
    </Col>

    <Col :span="3">
      <span class="option-title">保留几位小数位</span>
      <InputNumber
        :max="5"
        :min="0"
        v-model="optionsValue.decimal"
        @on-change="chgOptions"
      />
    </Col>

    

    <Col :span="3">
      <Select
        v-model="relationValue.type" 
        style="width:200px"
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

      <span class="option-title">关联字段</span>
      <Input type="text"
       v-model="relationValue.fieldNames"
       @on-change="chgRelation"
      />
    </Col>

    <Col :span="6" v-if="relationValue.type === RELATION_ENUM.NUM_EXPRESS.EN">
      <span class="option-title">数字表达式</span>
      <Input type="text"
       v-model="relationValue.expression"
       @on-change="chgRelation"
       placeholder="${DATA} * ${REALTE}"
       />
    </Col>

    <Col :span="3">
      <span class="option-title">没有重复值</span>
      <i-switch
        size="small"
        v-model="optionsValue.__unique"
        @on-change="chgOptions"
      >
      </i-switch>
    </Col>
    
    <Col :span="3">
      <span class="option-title">结果是否包含该字段</span>
      <i-switch
        size="small"
        v-model="optionsValue.__display"
        @on-change="chgOptions"
      >
      </i-switch>
    </Col>

    <Col :span="2">
      <slot></slot>
    </Col>
  </Row>
</template>

<style lang="scss">
.option-title {
  width: 150px;
  line-height: 20px;
}
</style>


<script>
import deepcopy from 'deepcopy';
import { DATA_TYPES } from '@/datatypes/index.js'; 
import { RELATION_ENUM, ALLOW_RELATIONS } from '@/datatypes/CONST.js';
import { Row, Col, Input, InputNumber, Select, Option, Tag, Switch } from "iview";

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
    InputNumber,
    Tag,
    'i-switch': Switch,
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
