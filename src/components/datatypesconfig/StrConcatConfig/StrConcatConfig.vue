<template>
  <div class="strconcat-config">
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
                v-for="(relateField, k) in relateFields"
                :key="k"
                v-model="relateFields[k]"
                @on-change="chgRelateFields"
            />
          </div>
        </Tooltip>
      </label>
       <Icon type="ios-remove-circle" @click="removeRelateField" />
       <Icon type="ios-add-circle add-relate-field" @click="addRelateField" />
    </div>

  </div>
</template>

<style lang="scss">
.strconcat-config {
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
import { Input, Select, Option, Icon, Tooltip, Tag } from "iview";
import { DATA_TYPES } from '@/datatypes/index.js';
export default {
  data() {
    return {
      DATA_TYPES: DATA_TYPES,
      optionsValue: JSON.parse(this.options),
      relationValue: JSON.parse(this.relation),
      RELATION_ENUM: RELATION_ENUM,
      allowRelations: ALLOW_RELATIONS[this.dataType],
      relateFields: JSON.parse(this.relation).fieldNames.split(',')
    }
  },
  components: {
    Select,
    Option,
    Input,
    Icon,
    Tooltip,
    Tag
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
    },
    chgRelateFields(){
      if (this.relateFields.indexOf('') > -1) {
        this.relationValue.fieldNames = ''
      } else {
        this.relationValue.fieldNames = this.relateFields.join(',');
      }
      this.$emit('update:relation', JSON.stringify(this.relationValue));
    },
    addRelateField() {
      this.relateFields.push('')
      this.chgRelateFields();
    },
    removeRelateField() {
      if (this.relateFields.length > 1) {
        this.relateFields.splice(this.relateFields.length - 1);
        this.chgRelateFields();
      }
    }
  }
    
}
</script>

