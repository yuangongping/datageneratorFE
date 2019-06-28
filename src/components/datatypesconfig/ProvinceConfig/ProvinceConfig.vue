<template>
  <!-- 修改组件独立的样式时注意修改组件class -->
  <div class="province-config">

    <!-- 【 通用区域 】字段类型、字段名 -->
    <div class="field-type">
      <Tag color="primary">{{ dataTypeAlias }}</Tag>
    </div>

    <div class="field-name">
      <label>
        <Input type="text"
          v-model="fieldNameValue"
          @on-change="chgFieldName"
          placeholder=" "
        />
        <span class="config-title">字段名</span>
      </label>
    </div>
    <!-------------------->
	
    <div class="field-config">
		<div class="config-item" style="width: 50px">
		  <span class="option-title">
          <Checkbox
            :indeterminate="indeterminate"
            :value="checkAll"
            @click.prevent.native="handleCheckAll">全选</Checkbox>
          </span>
		</div>

		<div class="config-item">
			<div style="width: 700px; border: 2px solid #c9c9e9; border-radius:15px; height: 70px; padding：2px; overflow-y: scroll">
			<Checkbox-group v-model="checkAllGroup" @on-change="checkAllGroupChange">
			  <Checkbox :label="province['label']" v-for="province in this.allProvinces"></Checkbox>
			</Checkbox-group>
			</div>
		</div>
    </div>

      

    <!-- 【 通用区域 】唯一性和字段显示设置、关闭槽 -->
    <div class="switch-config">
      <Tooltip max-width="200" content="设置该字段是否为不重复的值，请合理设置唯一性" theme="light" placement="top">
        <i-switch
          size="large"
          v-model="optionsValue.__unique"
          @on-change="chgOptions"
        >
          <span slot="open">唯一</span>
          <span slot="close">唯一</span>
        </i-switch>
      </Tooltip>
    </div>

    <div class="switch-config">
      <Tooltip max-width="200" content="设置该字段是否显示在生成结果中，某些用于过渡的字段可以不用在生成结果中显示" theme="light" placement="top">
        <i-switch
          size="large"
          v-model="optionsValue.__display"
          @on-change="chgOptions"
        >
          <span slot="open">显示</span>
          <span slot="close">显示</span>
        </i-switch>
      </Tooltip>
    </div>

    <div class="close-slot">
      <slot></slot>
    </div>
  </div>
  <!-------------------->

</template>

<style lang="scss">
.province-config {
  .alias {
    width: 100px;
  }
  .checkbox {
    width: 450px; 
    border: 1px solid #e9e9e9; 
    // padding: 2px; 
    height: 70px; 
    overflow-y: scroll
  }
}
</style>


<script>
import deepcopy from 'deepcopy';
import { DATA_TYPES } from '@/datatypes/index.js'; 
import { RELATION_ENUM, ALLOW_RELATIONS } from '@/datatypes/CONST.js';
import { Row, Col, Input, Select, Option, Tag, Switch, Icon, Button, Tooltip, Checkbox, CheckboxGroup } from "iview";
import OriginalData from '@/datatypes/COMMON_DATA/OriginalData';
export default {
  data() {
    return {
      dataTypeAlias: DATA_TYPES[this.dataType].alias,
      fieldNameValue: this.fieldName,
      optionsValue: JSON.parse(this.options),
      relationValue: JSON.parse(this.relation),
      indeterminate: false,
      checkAll: false,
      checkAllGroup: [],
      allProvinces: OriginalData
    };
  },
  props: {
    fieldName: String,
    dataType: String,
    options: String,
    relation: String,
  },
  components: {
    Row,
    Col,
    Select,
    Option,
    Input,
    Tag,
    Button,
    Icon,
    Tooltip,
    'i-switch': Switch,
    Checkbox,
    CheckboxGroup,
  },
  methods: {
    handleCheckAll () {
                if (this.indeterminate) {
                    this.checkAll = false;
                } else {
                    this.checkAll = !this.checkAll;
                }
                this.indeterminate = false;

                if (this.checkAll) {
                    this.checkAllGroup = [];
                    OriginalData.forEach(el => {
                      this.checkAllGroup.push(el['label'])
                    });
                } else {
                    this.checkAllGroup = [];
                }
                
                this.optionsValue.province = this.checkAllGroup;
                this.$emit('update:options', JSON.stringify(this.optionsValue));
            },
    checkAllGroupChange (data) {  
                this.optionsValue.province = this.checkAllGroup;
                this.$emit('update:options', JSON.stringify(this.optionsValue));
                if (data.length === 34) {
                    this.indeterminate = false;
                    this.checkAll = true;
                } else if (data.length > 0) {
                    this.indeterminate = true;
                    this.checkAll = false;
                } else {
                    this.indeterminate = false;
                    this.checkAll = false;
                }
                },
    chgFieldName() {
      this.$emit('update:fieldName', this.fieldNameValue);
    },
    chgOptions() {
      this.$emit('update:options', JSON.stringify(this.optionsValue));
    }
  }
};
</script>
