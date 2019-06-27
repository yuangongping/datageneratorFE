<template>
  <div class="container">
    <el-row>
      <el-col :span=1>
        <el-tag size="small" effect="dark">{{ dataTypeAlias }}</el-tag>
      </el-col>
      <el-col :span=1>
        字段名
      </el-col>
      <el-col :span=3>
        <el-input v-model="fieldNameValue" placeholder="请输入内容" @change="chgFieldName"></el-input>
      </el-col>
      <el-col :span=3>
        <el-select v-model="relationValue.type" placeholder="请选择" @change="chgRelation">
          <el-option
            v-for="relation in allowRelations"
            :key="relation"
            :label="RELATION_ENUM[relation].CN"
            :value="relation"
          > 
          </el-option>
        </el-select>
      </el-col>
      <el-col :span=1>关联字段</el-col>
      <el-col :span=3>
        <el-input v-model="relationValue.fieldNames" placeholder="请输入内容" @change="chgRelation"></el-input>
      </el-col>
      <el-col :span=2> <span class="option-title">结果是否包含该字段</span></el-col>
      <el-col :span=1>
        <el-switch v-model="optionsValue.__display" size="small" @change="chgOptions">
        </el-switch>
      </el-col>
      <el-col :span=1>
        <slot></slot>
      </el-col>

    </el-row>
  </div>
    
</template>

<style>

</style>


<script>
import { DATA_TYPES } from '@/datatypes/index.js'; 
import { RELATION_ENUM, ALLOW_RELATIONS } from '@/datatypes/CONST.js';

export default {
  data() {
    return {
      dataTypeAlias: DATA_TYPES[this.dataType].alias,
      fieldNameValue: this.fieldName,
      optionsValue: JSON.parse(this.options),
      relationValue: JSON.parse(this.relation),
      RELATION_ENUM: RELATION_ENUM,
      allowRelations: ALLOW_RELATIONS[this.dataType],
    }
  },
  props: {
    fieldName: String,
    dataType: String,
    options: String,
    relation: String,
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
    
}
</script>

