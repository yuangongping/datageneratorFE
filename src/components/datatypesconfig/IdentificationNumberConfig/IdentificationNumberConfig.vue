<template>
  <div class="IdentificationNumber-config">
    <!--  如果是独立字段，时间从1949年1月1号至当前时间，即70年中随机选择，
      区域则是全国随机选择，
      性别也是随机选择
      如果是值相关，则从其他组件获取时间，性别，地区代码等参数
    -->
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

    <div class="config-item" v-if="relationValue.type !== 'INDEPEND'">
      <label>
        <Input 
          type="text"
          v-model="address"
          @on-change="chgRelationFieldNames"
          placeholder="请填地址字段名"
        />
        <span class="config-title">地址关联字段</span>
      </label>
    </div>
           
    <div class="config-item"  v-if="relationValue.type !== 'INDEPEND'">
      <label>
        <Input 
          type="text"
          v-model="date"
          @on-change="chgRelationFieldNames"
          placeholder="请填时间字段名"
        />
        <span class="config-title">时间关联字段</span>
      </label>
    </div>
    
    <div class="config-item"  v-if="relationValue.type !== 'INDEPEND'">
      <label>
        <Input 
          type="text"
          v-model="sex"
          @on-change="chgRelationFieldNames"
          placeholder="请填性别字段名"
        />
        <span class="config-title">性别关联字段</span>
      </label>
    </div>

  </div>
</template>

<script>
import { RELATION_ENUM, ALLOW_RELATIONS } from '@/datatypes/CONST.js';
import { Input, Select, Option } from "iview";

export default {
  data() {
    return {
      // 地址组件关联字段
      address:'',
      // 时间组件关联字段
      date: '',
      // 性别组件关联字段
      sex: '',
      // 组件选项参数
      optionsValue: JSON.parse(this.options),
      // 关联组件配置参数
      relationValue: JSON.parse(this.relation),
      // 所有的关联类型
      RELATION_ENUM: RELATION_ENUM,
      // 该组件的关联类型列表
      allowRelations: ALLOW_RELATIONS[this.dataType],
    }
  },
  components: {
    Select,
    Input,
    Option
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
    },
    chgRelationFieldNames(){
      var data = [this.address, this.date, this.sex];
      this.relationValue.fieldNames = data.join(',');
      this.$emit('update:relation', JSON.stringify(this.relationValue));
    }
  }
}
</script>
