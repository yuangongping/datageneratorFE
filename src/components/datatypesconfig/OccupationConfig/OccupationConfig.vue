<template>
  <!-- 修改组件独立的样式时注意修改组件class -->
  <div class="occupation-config">

    <div class="config-item">
      <label>
        <span class="config-title">职业分类</span>
        <Select
          v-model="optionsValue.occupationTypes" 
          @on-change="chgOptions"
          multiple
          :max-tag-count="1"
          collapse-tags
        >
          <Option 
            v-for="occupationType in Object.keys(OccupationData)"
            :value="occupationType"
            :key="occupationType"
          >
          {{ occupationType }}
          </Option>
        </Select>
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

	<div class="config-item" v-if="relationValue.type === RELATION_ENUM.COR_RELATION.EN">
			<label>
        <span class="config-title">关联字段</span>
        <Tooltip max-width="200" theme="light" placement="top">
        <div slot="content" v-if="relationValue.allowTypes == 'ALL'">可以关联所有字段</div>
        <div slot="content" v-else>因职业与年龄相关，建议关联 <Tag color="primary" style="color: #fff;" v-for="datatype in relationValue.allowTypes" :key="datatype">{{ DATA_TYPES[datatype].alias }}</Tag> 组件, 请合理设置关联字段</div>
        <Input type="text"
          v-model="relationValue.fieldNames"
          @on-change="chgRelation"
          style="width: 200px"
        />
        </Tooltip>
			</label>
		</div>
  </div>
</template>

<style lang="scss">
.select{
  margin-left: 10px;
}

</style>

<script>
import { RELATION_ENUM, ALLOW_RELATIONS } from '@/datatypes/CONST.js';
import { Select, Option, Input, Tooltip, Tag  } from "iview";
import OccupationData from '@/datatypes/COMMON_DATA/OccupationData.js';
import { DATA_TYPES } from '@/datatypes/index.js';
export default {
  data() {
    return {
      DATA_TYPES: DATA_TYPES,
      optionsValue: JSON.parse(this.options),
      relationValue: JSON.parse(this.relation),
      RELATION_ENUM: RELATION_ENUM,
      allowRelations: ALLOW_RELATIONS[this.dataType],
      OccupationData: OccupationData
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
    chgOptions() {
      this.$emit('update:options', JSON.stringify(this.optionsValue));
    },
    chgRelation() {
      this.$emit('update:relation', JSON.stringify(this.relationValue));
    }
  }
};
</script>
