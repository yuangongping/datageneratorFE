<template>
<div class="LogicOperation-config">

  <div class="config-item">
      如果
  </div>

  <div class="config-item">
    <label>
      <span class="config-title">
        <RadioGroup size="small" v-model="relationValue.expression.condition1.type" @on-change="chgRelateFields">
          <Radio label="FIELD">关联字段</Radio>
          <Radio label="VALUE">自定义值</Radio>
        </RadioGroup>
      </span>
      <div class="input-box">
          <Input type="text"
            v-model="relationValue.expression.condition1.value"
            @on-change="chgRelateFields"
          />
        </div>
    </label>
  </div>

  <div class="config-item relation-config">
    <label>
    <Select v-model="optionsValue.logicOperation" @on-change="chgOptions">
      <Option 
        v-for="itemKey in OPTIONS_ENUM.LogicOperation"
        :value="itemKey.EN"
        :key="itemKey.EN">
          {{ itemKey.CN }}
      </Option>
    </Select>
    <span class="config-title">逻辑运算</span>
    </label>
  </div>

  <div class="config-item">
    <label>
      <span class="config-title">
        <RadioGroup size="small" v-model="relationValue.expression.condition2.type" @on-change="chgRelateFields">
          <Radio label="FIELD">关联字段</Radio>
          <Radio label="VALUE">自定义值</Radio>
        </RadioGroup>
      </span>
      <div class="input-box">
          <Input type="text"
            v-model="relationValue.expression.condition2.value"
            @on-change="chgRelateFields"
          />
        </div>
    </label>
  </div>

  <div class="config-item">
    条件成立, 
  </div>

  <div class="config-item">
    <label>
      <span class="config-title">
        <RadioGroup size="small" v-model="relationValue.expression.result1.type" @on-change="chgRelateFields">
          <Radio label="FIELD">关联字段</Radio>
          <Radio label="VALUE">自定义值</Radio>
        </RadioGroup>
      </span>
      <div class="input-box">
          <Input type="text"
            v-model="relationValue.expression.result1.value"
            @on-change="chgRelateFields"
          />
        </div>
    </label>
  </div>

  <div class="config-item">
    否则,  
  </div>

  <div class="config-item">
    <label>
      <span class="config-title">
        <RadioGroup size="small" v-model="relationValue.expression.result2.type" @on-change="chgRelateFields">
          <Radio label="FIELD">关联字段</Radio>
          <Radio label="VALUE">自定义值</Radio>
        </RadioGroup>
      </span>
      <div class="input-box">
          <Input type="text"
            v-model="relationValue.expression.result2.value"
            @on-change="chgRelateFields"
          />
        </div>
    </label>
  </div>
</div>
    
</template>

<script>
import { RELATION_ENUM, ALLOW_RELATIONS, OPTIONS_ENUM } from '@/datatypes/CONST.js';
import { DATA_TYPES } from '@/datatypes/index.js';
import { Input, Select, Option, Tooltip, RadioGroup, Radio } from "iview";

export default {
  data(){
    return {
      DATA_TYPES: DATA_TYPES,
      optionsValue: JSON.parse(this.options),
      relationValue: JSON.parse(this.relation),
      RELATION_ENUM: RELATION_ENUM,
      OPTIONS_ENUM: OPTIONS_ENUM,
      allowRelations: ALLOW_RELATIONS[this.dataType],
    }
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
    Tooltip,
    RadioGroup,
    Radio
  },
  methods: {
    chgOptions() {
      this.$emit('update:options', JSON.stringify(this.optionsValue));
    },
    chgRelation() {
      this.$emit('update:relation', JSON.stringify(this.relationValue));
    },
    chgRelateFields(){
      let noRelationCounter = 0;
      let emptyRelate = false;
      let relateFieldsArr = []
      for (const key in this.relationValue.expression) {
        let item = this.relationValue.expression[key];
        if (item.type == 'FIELD') {
          if (item.value == '') {
            emptyRelate = true;
          } else {
            relateFieldsArr.push(item.value)
          }
        } else {
          ++noRelationCounter;
        } 
      }

      if (noRelationCounter == 4) {
        this.relationValue.type = RELATION_ENUM.INDEPEND.EN;
      } else {
        this.relationValue.type = RELATION_ENUM.COR_RELATION.EN;
        if (!emptyRelate) {
          this.relationValue.fieldNames = relateFieldsArr.join(',');
        } else {
          this.relationValue.fieldNames = '';
        }
      }
      
      this.$emit('update:relation', JSON.stringify(this.relationValue));
    }
  }
}
</script>

