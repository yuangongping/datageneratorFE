<template>
  <!-- 修改组件独立的样式时注意修改组件class -->
  <div class="text-config">
    <div class="config-item">
      <div>
        <Checkbox-group v-model="optionsValue.textTypes" @on-change="chgOptions">
          <Checkbox
            :label="textTypeKey"
            v-for="textTypeKey in Object.keys(Text_OPTIONS_ENUM.TEXT_TYPE)"
            :key="textTypeKey"
          >{{ Text_OPTIONS_ENUM.TEXT_TYPE[textTypeKey].CN }}</Checkbox>
        </Checkbox-group>
      </div>
    </div>

    <div class="config-item relation-config">
      <Select
        v-model="optionsValue.lenType"
        @on-change="chgOptions"
      >
        <Option
          v-for="lenTypeKey in Object.keys(Text_OPTIONS_ENUM.LEN_TYPE)"
          :value="lenTypeKey"
          :key="lenTypeKey"
        >{{ Text_OPTIONS_ENUM.LEN_TYPE[lenTypeKey].CN}}</Option>
      </Select>
    </div>

    <div class="config-item" v-if="optionsValue.lenType == Text_OPTIONS_ENUM.LEN_TYPE.RANDOM.EN">
      <div class="config-item">
        <label>
          <InputNumber v-model="optionsValue.min" @on-change="chgOptions" :max="optionsValue.max"/>
          <span class="config-title">最小长度</span>
        </label>
      </div>

      <div class="config-item">
        <label>
          <InputNumber v-model="optionsValue.max" @on-change="chgOptions" :min="optionsValue.min"/>
          <span class="config-title">最大长度</span>
        </label>
      </div>
    </div>

    <div class="config-item" v-else>
      <label>
        <InputNumber v-model="optionsValue.fix" @on-change="chgOptions"/>
        <span class="config-title">固定长度</span>
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
import { OPTIONS_ENUM } from '@/datatypes/CONST.js';
import { InputNumber, Select, Option, Checkbox, CheckboxGroup } from "iview";

export default {
  data() {
    return {
      optionsValue: JSON.parse(this.options),
      relationValue: JSON.parse(this.relation),
      Text_OPTIONS_ENUM: OPTIONS_ENUM[this.dataType]
    };
  },
  props: {
    dataType: String,
    options: String,
    relation: String
  },
  components: {
    Select,
    Option,
    InputNumber,
    Checkbox,
    CheckboxGroup,
  },
  methods: {
    chgOptions() {
      this.$emit("update:options", JSON.stringify(this.optionsValue));
    }
  }
};
</script>
