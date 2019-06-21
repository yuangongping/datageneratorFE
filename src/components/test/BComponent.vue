<template>
  <div>
    <Input type="text" v-model="text1" />
    <li>B Component--- {{ text }}</li>
  </div>
</template>

<script>
import { Input } from 'iview';
export default {
  name: 'BComponent',
  props: {
    text1: String,
    default: ''
  }
}
</script>
