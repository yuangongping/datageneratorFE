<template>
  <div class="RandomField-config">

    <div class="config-item relation-config">
      <label for="">
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
       <span class="config-title">关联类型</span>
      </label>
    </div>

     <div class="config-item" >
      <label>
        <span class="config-title">关联字段1</span>
        <Tooltip max-width="200" theme="light" placement="top">
          <div slot="content" v-if="relationValue.allowTypes === 'ALL'">可以关联所有字段</div>
          <div slot="content" v-else>建议关联 <Tag color="primary" style="color: #fff;" v-for="datatype in relationValue.allowTypes" :key="datatype">{{ DATA_TYPES[datatype].alias }}</Tag> 组件, 请合理设置关联字段</div>
          <div class="input-box" >
            <Input type="text"
              v-model="relateFields[0]"
              @on-change="chgRelateFields"
            />
          </div>
        </Tooltip>
      </label>
      <label>
        <div class="input-box" >
          <InputNumber
              :min="0"
              v-model="optionsValue.weightFirst"
              @on-change="chgOptions"
          />
        </div>
        <span class="config-title">随机比重1</span>
      </label>
    </div>

    <div class="config-item" >
      <label>
        <span class="config-title">关联字段2</span>
        <Tooltip max-width="200" theme="light" placement="top">
          <div slot="content" v-if="relationValue.allowTypes === 'ALL'">可以关联所有字段</div>
          <div slot="content" v-else>建议关联 <Tag color="primary" style="color: #fff;" v-for="datatype in relationValue.allowTypes" :key="datatype">{{ DATA_TYPES[datatype].alias }}</Tag> 组件, 请合理设置关联字段</div>
          <div class="input-box" >
            <Input type="text"
              v-model="relateFields[1]"
              @on-change="chgRelateFields"
            />
          </div>
        </Tooltip>
      </label>

      <label>
        <div class="input-box" >
          <InputNumber type="text"
              :min="0"
              v-model="optionsValue.weightSecond"
              @on-change="chgOptions"
          />
        </div>
        <span class="config-title">随机比重2</span>
      </label>
    </div>

  </div>
</template>

<style lang="scss">
.RandomField-config {
  .ivu-icon {
    margin-left: 10px;
    cursor: pointer;
  }
  .input-box {
    display: flex;
    align-items: center;

    div {
      margin-left: 2px;
      &:nth-child(1){
        margin-left: 0;
      }
    }
  }
  .add-relate-field {
    color: #2d8cf0;;
    margin-left: 10px;
    cursor: pointer;
  }
}
</style>

<script>
import { RELATION_ENUM, ALLOW_RELATIONS } from '@/datatypes/CONST.js';
import { Input, Select, Option,InputNumber, Tooltip, Tag  } from "iview";
import { DATA_TYPES } from '@/datatypes/index.js';

export default {
  data() {
    return {
      DATA_TYPES: DATA_TYPES,
      optionsValue: JSON.parse(this.options),
      // 关联组件配置参数
      relationValue: JSON.parse(this.relation),
      // 所有的关联类型
      RELATION_ENUM: RELATION_ENUM,
      // 该组件的关联类型列表
      allowRelations: ALLOW_RELATIONS[this.dataType],
       // 组件局部变量
      relateFields: JSON.parse(this.relation).fieldNames.trim() == ''
       ? ['', ''] 
       : JSON.parse(this.relation).fieldNames.split(',')
    }
  },
  components: {
    Select,
    Input,
    Option,
    InputNumber,
    Tooltip, 
    Tag 
  },
  props: {
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
    },
    // 更新
    chgRelateFields(){
      if (this.relateFields.indexOf('') > -1) {
        this.relationValue.fieldNames = ''
      } else {
        this.relationValue.fieldNames = this.relateFields.join(',');
      }
      this.$emit('update:relation', JSON.stringify(this.relationValue));
    }
  }
}
</script>
