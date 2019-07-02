
<template>
  <div id="flip-list-demo" class="demo">
    <button v-on:click="shuffle">Shuffle</button>
    <transition-group name="flip-list" tag="ul">
      <li v-for="(item, k) in items" v-bind:key="item.val">
        {{ item.val }}
      </li>
    </transition-group>
  </div>
</template>

<style>
.flip-list-move {
  transition: transform 1s;
}
</style>

<script>
export default {
  data() {
    return {
      items: [
        {
          val: 1
        },
        {
          val: 2
        },
        {
          val: 3
        },
        {
          val: 3
        },
      ]
    }
  },
  methods: {
    shuffle: function () {
      this.items.reverse();
    }
  }
}
</script>
