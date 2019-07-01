<template>
  <div class="IdentificationNumber-config">

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

    <div class="field-config">
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
      <!--  如果是独立字段，时间从1949年1月1号至当前时间，即70年中随机选择，
            区域则是全国随机选择，
            性别也是随机选择
            如果是值相关，则从其他组件获取时间，性别，地区代码等参数
       -->
      <div class="field-config" v-if="relationValue.type !== 'INDEPEND'">

        <div class="config-item" >
          <label>
            <Input 
              type="text"
              v-model="address"
              @on-change="chgRelationFieldNames"
              placeholder="请填地址字段名"
            />
            <span class="config-title">地址关联字段</span>
          </label>
        </div>
           
        <div class="config-item" >
          <label>
            <Input 
              type="text"
              v-model="date"
              @on-change="chgRelationFieldNames"
              placeholder="请填时间字段名"
            />
            <span class="config-title">时间关联字段</span>
          </label>
        </div>
    
        <div class="config-item" >
          <label>
            <Input 
              type="text"
              v-model="sex"
              @on-change="chgRelationFieldNames"
              placeholder="请填性别字段名"
            />
            <span class="config-title">性别关联字段</span>
          </label>
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
</template>

<style lang="scss">
.tag{
  margin-left: 15%;
}
.option-title {
  width: 150px;
  line-height: 20px;
}

</style>


<script>
import { DATA_TYPES } from '@/datatypes/index.js'; 
import { RELATION_ENUM, ALLOW_RELATIONS } from '@/datatypes/CONST.js';
import { Input, Select, Option, Tag, Switch, Tooltip} from "iview";

export default {
  data() {
    return {
      // 地址组件关联字段
      address:'',
      // 时间组件关联字段
      date: '',
      // 性别组件关联字段
      sex: '',
      // 组件别名
      dataTypeAlias: DATA_TYPES[this.dataType].alias,
      // 该组件的字段名
      fieldNameValue: this.fieldName,
      // 组件选项参数
      optionsValue: JSON.parse(this.options),
      // 关联组件配置参数
      relationValue: JSON.parse(this.relation),
      // 所有的关联类型
      RELATION_ENUM: RELATION_ENUM,
      // 该组件的关联类型列表
      allowRelations: ALLOW_RELATIONS[this.dataType],
    }
  },
  components: {
    Select,
    Option,
    Input,
    Tag,
    Tooltip,
    'i-switch': Switch,
  },
  props: {
    fieldName: String,
    dataType: String,
    options: String,
    relation: String,
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
    },
    chgRelationFieldNames(){
      var data = [this.address, this.date, this.sex];
      this.relationValue.fieldNames = data.join(',');
      this.$emit('update:relation', JSON.stringify(this.relationValue));
    }
  }
}
</script>
