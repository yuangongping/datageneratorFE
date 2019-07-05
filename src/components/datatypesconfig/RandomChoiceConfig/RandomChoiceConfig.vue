<template>
  <!-- 修改组件独立的样式时注意修改组件class -->
  <div class="randomchoice-config">
    <div class="config-item candidate" >
      <label>
        <Input type="text"
            v-model="optionsValue.RandomString"
            @on-change="chgOptions"
            placeholder="候选字符之间用英文逗号隔开"
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
import { Input } from "iview";

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
    Input,
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
