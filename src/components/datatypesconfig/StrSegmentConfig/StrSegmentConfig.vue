<template>
  <div class="StringSegmente-config">
    
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

    <div class="config-item">
      <label>
        <InputNumber
          v-model="optionsValue.start"
          @on-change="chgOptions"
          :min="0"
        />
          <span class="config-title">起始位</span>
      </label>
    </div>

    <div class="config-item">
      <label>
        <InputNumber
          v-model="optionsValue.end"
          @on-change="chgOptions"
          :min="0"
        />
        <span class="config-title">终止位</span>
      </label>
    </div>

  </div>
</template>

<script>
import { RELATION_ENUM, ALLOW_RELATIONS } from '@/datatypes/CONST.js';
import { Input, InputNumber, Select, Option,  Tooltip, Tag } from "iview";
import { DATA_TYPES } from '@/datatypes/index.js';
export default {
  data() {
    return {
      DATA_TYPES: DATA_TYPES,
      // 字段参数
      optionsValue: JSON.parse(this.options),
      // 关联字段参数
      relationValue: JSON.parse(this.relation),
      // 枚举所有的关联类型列表
      RELATION_ENUM: RELATION_ENUM,
      // 获取该字段允许的关联类型， 如 StringSegmente:  ['COR_RELATION'],
      allowRelations: ALLOW_RELATIONS[this.dataType],
    }
  },
  components: {
    Select,
    Option,
    Input,
    InputNumber,
    Tooltip,
    Tag
  },
  props: {
    fieldName: String,
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
    }
  }
    
}
</script>

