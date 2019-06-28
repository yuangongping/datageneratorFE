<template>
  <!-- 修改组件独立的样式时注意修改组件class -->
  <div class="sex-config">

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
      <div class="config-item alias">
        <label>
          <Input type="text"
            v-model="optionsValue.manAlias"
            @on-change="chgOptions"
          />
          <span class="config-title">生成男性值</span>
        </label>
        <Tooltip max-width="200" content="自定义男女性别的生成结果，例如可定义生成男性结果为 0，生成女性结果为 1" theme="light" placement="top">
            <Icon class="question" type="md-help"/>
        </Tooltip>
      </div>

      <div class="config-item alias">
        <label>
          <Input type="text"
            v-model="optionsValue.womanAlias"
            @on-change="chgOptions"
          />
          <span class="config-title">生成女性值</span>
        </label>
      </div>

      <div class="config-item">
        <Select
          v-model="optionsValue.sex"
          @on-change="chgOptions"
        >
          <Option value="random" aria-checked="">随机生成男女</Option>
          <Option value="man">只生成男性</Option>
          <Option value="woman">只生成女性</Option>
        </Select>
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
.sex-config {
  .alias {
    width: 100px;
  }
}
</style>


<script>
import deepcopy from 'deepcopy';
import { DATA_TYPES } from '@/datatypes/index.js'; 
import { Row, Col, Input, Select, Option, Tag, Switch, Icon, Button, Tooltip } from "iview";

export default {
  data() {
    return {
      dataTypeAlias: DATA_TYPES[this.dataType].alias,
      fieldNameValue: this.fieldName,
      optionsValue: JSON.parse(this.options),
      relationValue: JSON.parse(this.relation),
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
  },
  methods: {
    chgFieldName() {
      this.$emit('update:fieldName', this.fieldNameValue);
    },
    chgOptions() {
      this.$emit('update:options', JSON.stringify(this.optionsValue));
    }
  }
};
</script>
