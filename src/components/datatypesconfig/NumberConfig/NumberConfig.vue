<template>

  <!-- 修改组件独立的样式时注意修改组件class -->
  <div class="number-config">
    <div class="config-item">
      <label>
        <InputNumber
          v-model="optionsValue.min"
          @on-change="chgOptions"
          :max="optionsValue.max"
        />
        <span class="config-title">最小随机值</span>
      </label>
    </div>

    <div class="config-item">
      <label>
        <InputNumber
          v-model="optionsValue.max"
          @on-change="chgOptions"
          :min="optionsValue.min"
        />
        <span class="config-title">最大随机值</span>
      </label>
    </div>

    <div class="config-item decimal">
      <label>
        <InputNumber
          v-model="optionsValue.decimal"
          @on-change="chgOptions"
          :min="0"
        />
        <span class="config-title">保留几位小数位</span>
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
    
    <div class="config-item">
      <label>
        <Input type="text"
          v-model="relationValue.expression"
          @on-change="chgRelation"
          placeholder="${DATA} * ${REALTE}"
        />
        <span class="config-title">数字表达式</span>
      </label>
    </div>
    
  </div>
</template>

<style lang="scss">
.number-config {
  .decimal {
    .ivu-input-number {
      width: 95px;
    }
  }
}
</style>


<script>
import deepcopy from 'deepcopy';
import { DATA_TYPES } from '@/datatypes/index.js'; 
import { RELATION_ENUM, ALLOW_RELATIONS } from '@/datatypes/CONST.js';
import { Row, Col, Input, InputNumber, Select, Option, Tag, Switch, Tooltip } from "iview";

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
    Tooltip,
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
