<template>
  <div class="fast-config">
      <div v-for="fastType in Object.keys(FAST_TYPES)" 
      :key="fastType" 
      class="fast"> 
        <a @click="fastConfig(fastType)">{{FAST_TYPES[fastType].alias}}</a>
      </div>
  </div>
</template>

<script>

import { FAST_TYPES } from './fastconfig.js';
export default {
  name: 'fastconfig',
  data() {
    return {
      FAST_TYPES: FAST_TYPES,
    }
  },
  mounted() {
  },
  methods: {
    fastConfig(fastType) {
      this.$emit('fast-config', FAST_TYPES[fastType].config)
    }
  }
}
</script>