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
        <Input type="text"
          v-model="relationValue.fieldNames"
          @on-change="chgRelation"
          style="width: 200px"
          placeholder="只能关联时间字段, 用于计算年龄"
        />
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
import { Select, Option, Input } from "iview";
import OccupationData from '@/datatypes/COMMON_DATA/OccupationData.js';
export default {
  data() {
    return {
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
    Input
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
