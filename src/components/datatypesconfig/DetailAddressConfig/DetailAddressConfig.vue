<template>
  <!-- 修改组件独立的样式时注意修改组件class -->
  <div class="detailAddress-config">

    <div class="config-item">
      <Select
        v-model="optionsValue.addressType"
        @on-change="chgOptions"
      >
        <Option
          v-for="addressTypeKey in Object.keys(DetailAddress_OPTIONS_ENUM)"
          :value="addressTypeKey"
          :key="addressTypeKey"
        >{{ DetailAddress_OPTIONS_ENUM[addressTypeKey].CN}}</Option>
      </Select>
    </div>
  </div>
</template>




<script>
import { Select, Option } from "iview";
import { OPTIONS_ENUM } from '@/datatypes/CONST.js';

export default {
  data() {
    return {
      optionsValue: JSON.parse(this.options),
      relationValue: JSON.parse(this.relation),
      DetailAddress_OPTIONS_ENUM: OPTIONS_ENUM[this.dataType]
    };
  },
  props: {
    dataType: String,
    options: String,
    relation: String,
  },
  components: {
    Select,
    Option
  },
  methods: {
    chgOptions() {
      this.$emit('update:options', JSON.stringify(this.optionsValue));
    }
  }
};
</script>
