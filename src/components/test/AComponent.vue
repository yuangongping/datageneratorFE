<template>
  <div>
    <Input type="text"
     @on-change="handleInput"
     v-model="localText"
     />
    <li>A Component--- {{ text }}</li>
  </div>
</template>

<script>
import { Input } from "iview";
export default {
  name: "AComponent",
  data() {
    return {
      localText: this.text
    };
  },
  props: {
    text: String,
  },
  components: {
    Input
  },
  methods: {
    handleInput(event) {
      let value = event.target.value;
      this.$emit('update:text', value);
    }
  }
};
</script>
