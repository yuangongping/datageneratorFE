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
        <span class="config-title">区县码关联字段</span>
        <Input 
          type="text"
          v-model="relateFields[0]"
          @on-change="chgRelateFields"
          placeholder="仅可关联区县码组件"
        />
    </label>
    </div>
           
    <div class="config-item"  v-if="relationValue.type !== 'INDEPEND'">
      <label>
        <span class="config-title">出生日期关联字段</span>
        <Tooltip max-width="200" theme="light" placement="top">
          <div slot="content">时间格式示例：19990101</div>
          <Input 
            type="text"
            v-model="relateFields[1]"
            @on-change="chgRelateFields"
            placeholder="例：19990101"
          />
        </Tooltip>
      </label>
    </div>
    
    <div class="config-item"  v-if="relationValue.type !== 'INDEPEND'">
      <label>
        <span class="config-title">性别关联字段</span>
        <Input 
          type="text"
          v-model="relateFields[2]"
          @on-change="chgRelateFields"
          placeholder="仅可关联性别组件"
        />
      </label>
    </div>

  </div>
</template>

<script>
import { RELATION_ENUM, ALLOW_RELATIONS } from '@/datatypes/CONST.js';
import { Input, Select, Option, Tag, Tooltip } from "iview";
import { DATA_TYPES } from '@/datatypes/index.js';

export default {
  data() {
    return {
      DATA_TYPES: DATA_TYPES,
      optionsValue: JSON.parse(this.options),
      // 关联组件配置参数
      relationValue: JSON.parse(this.relation),
      // 所有的关联类型
      RELATION_ENUM: RELATION_ENUM,
      // 该组件的关联类型列表
      allowRelations: ALLOW_RELATIONS[this.dataType],
      // 组件局部变量
      relateFields: JSON.parse(this.relation).fieldNames.trim() == ''
       ? ['', '', ''] 
       : JSON.parse(this.relation).fieldNames.split(',')
    }
  },
  components: {
    Tooltip,
    Select,
    Input,
    Option,
    Tag
  },
  props: {
    dataType: String,
    options: String,
    relation: String,
  },
  methods: {
    chgOptions() {
      this.$emit('update:options', JSON.stringify(this.optionsValue));
    },
    chgRelation() {
      this.$emit('update:relation', JSON.stringify(this.relationValue));
    },
    chgRelateFields(){
      if (this.relateFields.indexOf('') > -1) {
        this.relationValue.fieldNames = ''
      } else {
        this.relationValue.fieldNames = this.relateFields.join(',');
      }
      this.$emit('update:relation', JSON.stringify(this.relationValue));
    }
  }
}
</script>
