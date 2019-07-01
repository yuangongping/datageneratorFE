<template>
  <!-- 修改组件独立的样式时注意修改组件class -->
  <div class="randomchoice-config">
    <div class="config-item candidate">
      <label>
        <Input type="text"
            v-model="optionsValue.RandomString"
            @on-change="chgOptions"
            placeholder="候选值之间用英文逗号隔开"
        />
        <span class="config-title">候选值</span>
      </label>
    </div>
  </div>
</template>

<style lang="scss">
.randomchoice-config {
  .candidate {
    flex: 1;
    label {
      flex: 1;
    }
  }
}
</style>


<script>
import deepcopy from 'deepcopy';
import { DATA_TYPES } from '@/datatypes/index.js'; 
import { Row, Col, Input, InputNumber, Select, Option, Tag, Switch, Tooltip } from "iview";

export default {
  data() {
    return {
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
