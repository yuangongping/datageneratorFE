<template>
  <!-- 修改组件独立的样式时注意修改组件class -->
  <div class="counter-config">
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
      <div class="config-item number">
        <label>
          <Input type="text"
            v-model="optionsValue.startNum"
            @on-change="chgOptions"
          />
          <span class="config-title">起始值</span>
        </label>
      </div>

      <div class="config-item number">
        <label>
          <Input type="text"
            v-model="optionsValue.division"
            @on-change="chgOptions"
          />
          <span class="config-title">步长</span>
        </label>
      </div>

      <div class="config-item">
        <label>
          <Input type="text"
             v-model="optionsValue.template"
            @on-change="chgOptions"
            placeholder="index_${DATA}"
          />
          <span class="config-title">累加模板</span>
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
.counter-config {
  .number {
    width: 60px;
  }
}
</style>


<script>
import { DATA_TYPES } from '@/datatypes/index.js'; 
import { Input, Tag, Switch, Tooltip} from "iview";

// console.log(DATA_TYPES.Name.relation)

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
    relation: String
  },
  components: {
    Input,
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
