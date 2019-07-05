<template>
  <div class="basic-config"> 
    <div class="title">基础配置项</div>
    <div class="button-group">
      <ButtonGroup 
        v-for="basicType in Object.keys(DATA_TYPES)" 
        :key="basicType"
        size="small"
      > 
        <Button type="info" icon= "md-add" @click="basicConfig(basicType)">
          {{DATA_TYPES[basicType].alias}}
        </Button>
      </ButtonGroup>
    </div>
  </div>
</template>

<script>

import { DATA_TYPES } from '@/datatypes/index.js';
import { ButtonGroup, Button } from 'iview';
export default {
  name: 'basiconfig',
  data() {
    return {
      DATA_TYPES: DATA_TYPES,
    }
  },
  components: {
    ButtonGroup,
    Button
  },
  mounted() {
  },
  methods: {
    basicConfig(basicType) {
      this.$emit('basic-config', basicType)
    }
  }
}
</script>

<style lang="scss">
.basic-config {
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  background-color: #ffffff;
  padding: 10px 10px;
  width: 80%;
  
  .title {
    height: 20px;
    line-height: 20px;
    margin-bottom: 10px;
    font-size: 16px;
    font-weight: 700;
    font-family: "SimHei";
    color: #2d8cf0;
    padding-left: 10px;
    border-left: 2px solid #2d8cf0;
  }

  .button-group {
    .ivu-btn-group {
      margin-right: 10px;
      margin-bottom: 10px;
    }
  }
}
</style>
