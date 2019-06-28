<template>

  <!-- 修改组件独立的样式时注意修改组件class -->
  <div class="text-config">

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
      <div class="config-item " >
        <label>
            <Select
            v-model="optionsValue.compose_type" 
            @on-change="chgOptions"
            multiple style="width:220px"
            >
              <Option 
                v-for="choice in Text_Type_EN.text_type_arr"
                :value="choice"
                :key="choice"
              >
              {{ Text_ENUM[choice].CN}}
              </Option>
            </Select>
            <span class="config-title">随机组合类型</span>
        </label>
      </div>

      <div class="config-item relation-config">
        <Select
          v-model="optionsValue.lenth_type" 
          @on-change="chgOptions"
        >
          <Option 
            v-for="choice in Text_Type_EN.text_lenth_arr"
            :value="choice"
            :key="choice"
          >
          {{ Text_ENUM[choice].CN}}
          </Option>
        </Select>
      </div>
    
      <div class="config-item" v-if="optionsValue.lenth_type=='RANDOM_LENGTH'">
        <div class="config-item" >
            <label>
            <InputNumber
                v-model="optionsValue.min"
                @on-change="chgOptions"
                :max="optionsValue.max"
            />
            <span class="config-title">最小长度</span>
            </label>
        </div>

        <div class="config-item" >
            <label>
            <InputNumber
                v-model="optionsValue.max"
                @on-change="chgOptions"
                :min="optionsValue.min"
            />
            <span class="config-title">最大长度</span>
            </label>
        </div>
      </div>

      <div class="config-item" v-if="optionsValue.lenth_type=='FIXED_LENGTH'">
        <label>
            <InputNumber
                v-model="optionsValue.fixed"
                @on-change="chgOptions"
            />
            <span class="config-title">固定长度</span>
        </label>
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
.number-config {
  .decimal {
    .ivu-input-number {
      width: 95px;
    }
  }
}
</style>


<script>
import deepcopy from 'deepcopy';
import { DATA_TYPES } from '@/datatypes/index.js'; 
import { RELATION_ENUM, ALLOW_RELATIONS, Text_ENUM,  Text_Type_EN} from '@/datatypes/CONST.js';
import { Row, Col, Input, InputNumber, Select, Option, Tag, Switch, Tooltip } from "iview";

export default {
  data() {
    return {
      dataTypeAlias: DATA_TYPES[this.dataType].alias,
      fieldNameValue: this.fieldName,
      optionsValue: JSON.parse(this.options),
      relationValue: JSON.parse(this.relation),
      RELATION_ENUM: RELATION_ENUM,
      allowRelations: ALLOW_RELATIONS[this.dataType],
      Text_ENUM: Text_ENUM,
      Text_Type_EN: Text_Type_EN
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
    InputNumber,
    Tag,
    Tooltip,
    'i-switch': Switch,
  },
  methods: {
    chgFieldName() {
      this.$emit('update:fieldName', this.fieldNameValue);
    },
    chgOptions() {
      this.$emit('update:options', JSON.stringify(this.optionsValue));
    },
    chgRelation() {
      this.$emit('update:relation', JSON.stringify(this.relationValue));
    }
  }
};
</script>
