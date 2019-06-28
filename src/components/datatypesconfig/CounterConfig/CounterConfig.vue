<template>
  <!-- 修改组件独立的样式时注意修改组件class -->
  <div class="counter-config">
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
</template>

<style lang="scss">
.counter-config {
  .number {
    width: 60px;
  }
}
</style>


<script>
import deepcopy from 'deepcopy';
import { DATA_TYPES } from '@/datatypes/index.js'; 
import { Row, Col, Input, Select, Option, Tag, Switch, Tooltip} from "iview";

// console.log(DATA_TYPES.Name.relation)

export default {
  data() {
    return {
      optionsValue: JSON.parse(this.options),
      relationValue: JSON.parse(this.relation),
    };
  },
  props: {
    dataType: String,
    options: String,
    relation: String
  },
  components: {
    Row,
    Col,
    Select,
    Option,
    Input,
    Tag,
    Tooltip,
    'i-switch': Switch,
  },
  methods: {
    chgOptions() {
      this.$emit('update:options', JSON.stringify(this.optionsValue));
    },
    chgRelation() {
      this.$emit('update:relation', JSON.stringify(this.relationValue));
    }
  }
};
</script>
