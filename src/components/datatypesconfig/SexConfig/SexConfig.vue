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
      <span class="option-title">生成男性值</span>
      <Input type="text"
       v-model="optionsValue.manAlias"
       @on-change="chgOptions"
      />
    </Col>
    <Col :span="3">
      <span class="option-title">生成女性值</span>
      <Input type="text"
       v-model="optionsValue.womanAlias"
       @on-change="chgOptions"
      />
    </Col>

    <Col :span="4">
      <Select
       v-model="optionsValue.sex"
       @on-change="chgOptions"
      >
        <Option value="random" aria-checked="">随机生成男女</Option>
        <Option value="man">只生成男性</Option>
        <Option value="woman">只生成女性</Option>
      </Select>
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
import { Row, Col, Input, Select, Option, Tag, Switch } from "iview";

export default {
  data() {
    return {
      dataTypeAlias: DATA_TYPES[this.dataType].alias,
      fieldNameValue: this.fieldName,
      optionsValue: JSON.parse(this.options),
      relationValue: JSON.parse(this.relation),
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
    'i-switch': Switch,
  },
  methods: {
    chgFieldName() {
      this.$emit('update:fieldName', this.fieldNameValue);
    },
    chgOptions() {
      this.$emit('update:options', JSON.stringify(this.optionsValue));
    }
  }
};
</script>
