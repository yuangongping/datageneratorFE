<template>
  <div class="fast-config">
    <div class="title">推荐案例</div>
    <div class="button-group">
      <Tooltip
        v-for="(fastItem, k) in fastConfigs" 
        :key="k" 
        max-width="200" theme="light" placement="top" >
        <div slot="content">贡献者：{{ fastItem.nick_name }} </div>
        <ButtonGroup 
          size="small"> 
            <Button type="info" icon="md-add" @click="fastConfig(fastItem)">
              {{ fastItem.table_name }}
            </Button>
        </ButtonGroup>
      </Tooltip>
    </div>

    <Tooltip
      v-if="storeQuote != null"
      max-width="200" theme="light" placement="top" >
      <div slot="content">贡献者：{{ storeQuote.nick_name }} </div>
      <Button type="error" icon="md-add" size="small" @click="pasteQuote">
        {{ storeQuote.table_name }} (来自引用)
      </Button>
    </Tooltip>
    
  </div>
</template>

<script>
import api from '@/api/index.js'
import { ButtonGroup, Button, Tooltip } from 'iview';
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
    Button,
    Tooltip
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
          this.$Message.error("获取快捷配置数据错误");
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
    .ivu-tooltip {
      margin-right: 10px;
      margin-bottom: 10px;
    }
  }
}
</style>