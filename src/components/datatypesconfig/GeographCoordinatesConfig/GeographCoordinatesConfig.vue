<template>
  <!-- 修改组件独立的样式时注意修改组件class -->
  <div class="geographcoordinates-config">
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


    <div class="config-item" v-if="relationValue.type !== RELATION_ENUM.INDEPEND.EN">
      <label>
        <Tag>
        <Tooltip max-width="200" content="建议关联区县组件, 请合理设置关联字段" theme="light" placement="top">
        
        <span class="config-title">关联字段</span>
        <Input type="text"
          v-model="relationValue.fieldNames"
          @on-change="chgRelation"
        />
        </Tooltip>
        </Tag>
      </label>
    </div>
  </div>
</template>

<style lang="scss">
.option-title {
  width: 150px;
  line-height: 20px;
}
</style>


<script>
import { RELATION_ENUM, ALLOW_RELATIONS } from '@/datatypes/CONST.js';
import { Input, Select, Option, Tooltip, Tag } from "iview";


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
    Tooltip,
    Tag
  },
  methods: {
    chgRelation() {
      this.$emit('update:relation', JSON.stringify(this.relationValue));
    }
  }
};
</script>
