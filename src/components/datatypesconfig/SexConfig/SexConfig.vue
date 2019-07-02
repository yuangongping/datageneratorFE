<template>
  <!-- 修改组件独立的样式时注意修改组件class -->
  <div class="sex-config">
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
</template>

<style lang="scss">
.sex-config {
  .alias {
    width: 100px;
  }
}
</style>


<script>
import { Input, Select, Option, Icon, Tooltip } from "iview";

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
    relation: String,
  },
  components: {
    Select,
    Option,
    Input,
    Icon,
    Tooltip
  },
  methods: {
    chgOptions() {
      this.$emit('update:options', JSON.stringify(this.optionsValue));
    }
  }
};
</script>
