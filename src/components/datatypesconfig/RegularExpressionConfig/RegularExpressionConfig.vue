<template>
  <div class="RegularExpression-config">
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

    <div class="config-item">
      <label>
        <span class="config-title">关联字段</span>
        <Tooltip max-width="200" theme="light" placement="top">
          <div slot="content" v-if="relationValue.allowTypes === 'ALL'">可以关联所有字段</div>
          <div slot="content" v-else>建议关联 <Tag color="primary" style="color: #fff;" v-for="datatype in relationValue.allowTypes" :key="datatype">{{ DATA_TYPES[datatype].alias }}</Tag> 组件, 请合理设置关联字段</div>
          <div class="input-box">
            <Input type="text"
                v-model="relationValue.fieldNames"
                @on-change="chgRelation"
            />
          </div>
        </Tooltip>
      </label>
    </div>

    <div class="config-item">
      <label>
        <Tooltip max-width="300px" theme="light" placement="top">
          <div slot="content">
            <Tag class="tag" color="primary" v-for="item in expressionDemo" :key="item.value">{{ item.name}}: {{ item.value }} </Tag>
          </div>
          <div class="input-box">
            <Input 
              class="js-expression"
              v-model="optionsValue.expression" 
              @on-change="chgOptions"
              placeholder="请输入js正则表达式"/>
          </div>
        </Tooltip>
        <span class="config-title">
          表达式
        </span>
      </label>
    </div>

    <div class="config-item">
      <RadioGroup  v-model="optionsValue.outputTypes" @on-change="chgOptions">
        <Radio
            :label="textTypeKey"
            v-for="textTypeKey in radiogroupList"
            :key="textTypeKey"
        >{{ textTypeKey  }}</Radio>
      </RadioGroup> 
    </div>
    <div class="config-item" v-if="optionsValue.outputTypes === '替换'">
      <label>
        <span class="config-title">替换值</span>
        <Input type="text"
            v-model="optionsValue.replaceValue"
            @on-change="chgOptions"
        />
      </label>
    </div>

  </div>
</template>

<style lang="scss">
.js-expression{
  width: 300px;
}
.tag{
    width: 150px;
}
</style>


<script>
import { RELATION_ENUM, ALLOW_RELATIONS } from '@/datatypes/CONST.js';
import { Input, Select, Option, Tooltip, Tag, Radio, RadioGroup } from "iview";
import { DATA_TYPES } from '@/datatypes/index.js';
export default {
  data() {
    return {
      DATA_TYPES: DATA_TYPES,
      optionsValue: JSON.parse(this.options),
      relationValue: JSON.parse(this.relation),
      RELATION_ENUM: RELATION_ENUM,
      allowRelations: ALLOW_RELATIONS[this.dataType],
      radiogroupList: ['提取', '替换'],

      expressionDemo: [
        {'name':'数字', 'value': '\\d+'},
        {'name':'英文', 'value':'[a-zA-Z]'},
        {'name':'中文',  'value':'[\\u4E00-\\u9FA5]'}
      ]
    }
  },
  components: {
    Select,
    Option,
    Input,
    Tooltip,
    Tag,
    Radio,
    RadioGroup
  },
  props: {
    fieldName: String,
    dataType: String,
    options: String,
    relation: String,
  },
  methods: {
    chgOptions() {
      this.$emit('update:options', JSON.stringify(this.optionsValue));
    },
    chgRelation() {
      this.$emit('update:relation', JSON.stringify(this.relationValue));
    }
  }
    
}
</script>

