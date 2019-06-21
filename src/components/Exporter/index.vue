<template>
  <div class="exporter" @mouseover="maskShow = true" @mouseout="maskShow = false" >
    <div class="mask" v-show="maskShow" @click="download()">
      <Icon type="md-download" />
    </div>

    <Icon type="ios-document" />
    <span>
     {{ filename }}.{{ filetype }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
.exporter {
  max-width: 100px;
  position: relative;
  padding: 10px;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  .ivu-icon {
    font-size: 40px;
  }
  span {
    font-size: 16px;
  }

  .mask {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0; top: 0;
    background-color: rgba(255, 255, 255, 0.8);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .ivu-icon {
      color: cornflowerblue;
    }
  }
}
</style>


<script>
import { Icon } from 'iview';

export default {
  name: "Exporter",
  data() {
    return {
      maskShow: false
    }
  },
  props: {
    filename: String,
    filetype: String,
    rawdata: String,
  },
  components: {
    Icon
  },
  methods: {
    download() {
      const { rawdata, filename, filetype } = this;

      if (rawdata == "" || filename == "" || filetype == "") {
        throw new Error("下载组件存在非空属性")
      }

      const aNode = document.createElement("a"),
      blob = new Blob([rawdata]); 

      aNode.download = filename + '.' + filetype;
      aNode.href = (window.URL ? URL : webkitURL).createObjectURL(blob);
      aNode.click();
    }
  }
}
</script>
