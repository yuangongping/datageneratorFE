<template>
  <!-- 修改组件独立的样式时注意修改组件class -->
  <div class="carprefix-config">
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

    <div class="config-item" >
      <label>
        <span class="config-title">关联字段</span>
        <Tooltip max-width="200" theme="light" placement="top">
        <div slot="content" v-if="relationValue.allowTypes === 'ALL'">可以关联所有字段</div>
        <div slot="content" v-else>建议关联 <Tag color="primary" style="color: #fff;" v-for="datatype in relationValue.allowTypes" :key="datatype">{{ DATA_TYPES[datatype].alias }}</Tag> 组件, <strong>注意：台湾地区车牌号前缀为英文，请合理筛选关联城市</strong></div>
        <Input type="text"
          v-model="relationValue.fieldNames"
          @on-change="chgRelation"
        />
        </Tooltip>
      </label>
    </div>
  </div>
</template>

<script>
import { RELATION_ENUM, ALLOW_RELATIONS } from '@/datatypes/CONST.js';
import { Input, Select, Option, Tooltip, Tag, Icon} from "iview";
import { DATA_TYPES } from '@/datatypes/index.js';
export default {
  data() {
    return {
      DATA_TYPES: DATA_TYPES,
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
    Tag,
    Icon
  },
  methods: {
    chgOptions() {
      this.$emit('update:options', JSON.stringify(this.optionsValue));
    },
    chgRelation() {
      this.$emit('update:relation', JSON.stringify(this.relationValue));
    }
  }
};
</script>
