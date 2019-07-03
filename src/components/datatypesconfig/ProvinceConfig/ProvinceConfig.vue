<template>
  <!-- 修改组件独立的样式时注意修改组件class -->
  <div class="province-config">
    <div class="config-item" style="width: 50px">
      <span class="option-title">
        <Checkbox
          :indeterminate="indeterminate"
          :value="checkAll"
          @click.prevent.native="handleCheckAll">
          全选
        </Checkbox>
      </span>
		</div>

		<div class="config-item">
			<div style="width: 700px; border: 2px solid #c9c9e9; border-radius:15px; height: 70px; padding：2px; overflow-y:scroll">
        <Checkbox-group v-model="optionsValue.provinces" @on-change="checkAllGroupChange">
          <Checkbox :label="province" v-for="province in this.allProvinces" :key="province"></Checkbox>
        </Checkbox-group>
			</div>
		</div>
  </div>
</template>

<script>
import { Checkbox, CheckboxGroup } from "iview";
import OriginalData from '@/datatypes/COMMON_DATA/OriginalData_dict.js';
export default {
  data() {
    return {
      optionsValue: JSON.parse(this.options),
      relationValue: JSON.parse(this.relation),
      indeterminate: false,
      checkAll: false,
      allProvinces: Object.keys(OriginalData) //字典的key值组成一个所有省份组的数组
    };
  },
  props: {
    dataType: String,
    options: String,
    relation: String,
  },
  components: {
    Checkbox,
    CheckboxGroup,
  },
  methods: {
    handleCheckAll () {  // 全选逻辑实现
      if (this.indeterminate) {
          this.checkAll = false;
      } else {
          this.checkAll = !this.checkAll;
      }
      
      this.indeterminate = false;

      if (this.checkAll) {
          this.optionsValue.provinces = this.allProvinces;
      } else {
          this.optionsValue.provinces = [];
      }
      
      this.$emit('update:options', JSON.stringify(this.optionsValue));
    },
    checkAllGroupChange (data) {  // 选择省份时数据同步
      if (data.length === 30) {
          this.indeterminate = false;
          this.checkAll = true;
      } else if (data.length > 0) {
          this.indeterminate = true;
          this.checkAll = false;
      } else {
          this.indeterminate = false;
          this.checkAll = false;
      }
      this.$emit('update:options', JSON.stringify(this.optionsValue));
    },
  }
};
</script>
