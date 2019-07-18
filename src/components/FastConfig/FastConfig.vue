<template>
  <div class="fast-config">
    <div class="title">快捷配置</div>
    <!-- <div class="button-group">
      <ButtonGroup 
        v-for="fastType in Object.keys(FAST_TYPES)" 
        :key="fastType" 
        size="small"> 
        <Button type="info" icon="md-add" @click="fastConfig(fastType)">
          {{FAST_TYPES[fastType].alias}}
        </Button>
      </ButtonGroup>
    </div> -->

    <div class="button-group">
      <ButtonGroup 
        v-for="(fastItem, k) in fastConfigs" 
        :key="k" 
        size="small"> 
        <Button type="info" icon="md-add" @click="fastConfig(fastItem)">
          {{ fastItem.table_name }}
        </Button>
      </ButtonGroup>
    </div>

    <Button v-if="storeQuote != null" type="error" icon="md-add" size="small" @click="pasteQuote">
      {{ storeQuote.table_name }} (来自引用)
    </Button>
  </div>
</template>

<script>
import api from '@/api/index.js'
import { ButtonGroup, Button } from 'iview';
import { mapGetters } from 'vuex';

export default {
  name: 'fastconfig',
  data() {
    return {
      fastConfigs: []
    }
  },
  components: {
    ButtonGroup,
    Button
  },
  computed: {
    ...mapGetters(['storeQuote'])
  },
  mounted() {
    this.getFastConfigs();
  },
  methods: {
    fastConfig(fastItem) {
      this.$emit('fast-config', JSON.parse(fastItem.configs))
    },
    pasteQuote() {
      this.$emit('fast-config', this.storeQuote.configs)
    },
    async getFastConfigs() {
      try {
        const res = await api.getFastConfigs();
        if (res.code === 200) {
          this.fastConfigs = res.data;
        } else {
          console.error(res);
          this.$Message.error("获取总页码错误");
        }
      } catch (e) {
        console.error(e);
        this.$Message.error(e);
      }
    }
  }
}
</script>

<style lang="scss">
.fast-config {
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  background-color: #ffffff;
  padding: 10px 10px;
  width: 50%;
  
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