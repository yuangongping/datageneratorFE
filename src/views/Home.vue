<template>
  <!-- TODO: 解释、例子、预览 -->
  <div class="home">
    <div class='content'>
      <div class="action-area">
        <BasicConfig 
          @basic-config="basicConfig">
        </BasicConfig>

        <FastConfig 
          @fast-config="fastConfig"
        >
        </FastConfig>
      </div>

      <div class="field-list shadow-box"  v-if="dataTypeConfigs.length > 0">
        <div class="field-title">
          <span>
            配置项
          </span>
          <Poptip
            confirm
            title="确定清空配置吗？"
            @on-ok="emptyConfigs"
            class="empty-config"
          >
            <span>清空</span>
          </Poptip>
          
        </div>
        <transition-group name="flip-list" >
          <div 
            v-for="(dataTypeConfig, k) in dataTypeConfigs"
            :key="dataTypeConfig.id"
            class="config-row"
          >
            <!-- 【 通用区域 】字段类型、字段名 -->
            <div class="field-type">
              <Tag color="primary">
                {{ DATA_TYPES[dataTypeConfig.dataType].shortAlias }}
              </Tag>
            </div>

            <div class="field-name">
              <label>
                <Input type="text"
                  v-model="dataTypeConfig.fieldName"
                />
                <span class="config-title">字段名</span>
              </label>
            </div>
            
          <!-- 字段配置组件区域 -->
          <div
            class="field-config"
            :is="dataTypeConfig.component"
            :dataType="dataTypeConfig.dataType"
            :options.sync="dataTypeConfig.options"
            :relation.sync="dataTypeConfig.relation"
            >
          </div>
            <!-- 【 通用区域 】下上移动字段、唯一性和字段显示设置、关闭按钮 -->
            <div class="switch-config">
              <Tooltip max-width="200" content="设置该字段是否为不重复的值，请合理设置唯一性" theme="light" placement="top">
                <i-switch
                  size="large"
                  v-model="dataTypeConfig.__unique"
                >
                  <span slot="open">唯一</span>
                  <span slot="close">唯一</span>
                </i-switch>
              </Tooltip>
            </div>

            <div class="switch-config">
              <Tooltip max-width="200" content="设置该字段是否显示在生成结果中，某些用于过渡的字段可以不用在生成结果中显示" theme="light" placement="top">
                <i-switch
                  size="large"
                  v-model="dataTypeConfig.__display"
                >
                  <span slot="open">显示</span>
                  <span slot="close">显示</span>
                </i-switch>
              </Tooltip>
            </div>

            <div class="up-down" >
                <Icon v-if="k > 0" type="md-arrow-up" @click="sortUp(k)"></Icon>
                <Icon v-if="k < dataTypeConfigs.length - 1" type="md-arrow-down" @click="sortDown(k)"></Icon>
            </div>

            <div class="delrow">
              <Icon type="md-close" @click="delRow(k)"/>
            </div>

          </div>
        </transition-group>
      </div>

      <Modal
        title="数据预览"
        width="90%"
        :footer-hide="true"
        v-model="previewFlag"
        :styles="{'top': '20px'}"
        :mask-closable="false"
      >
        <Table :columns="tableHead" :data="dataPreview"></Table>
      </Modal>

      <!-- 保存并分享 -->
      <transition name="fade">
        <div class="save-share shadow-box flex-row" v-if="saveForm.show">
          <div class="form-region flex-row">
            <div class="flex-row">
              <div class="title">数据集名称/表名</div><Input v-model="saveForm.table_name" :maxlength="20" />
            </div>
            <div class="flex-row" v-if="saveForm.wantShare">
              <div class="title">分享来自于</div><Input v-model="saveForm.nick_name" :maxlength="15" />
            </div>
            <Button type="primary" @click="saveShare">
              <span v-if="saveForm.wantShare">
                保存并分享
              </span>
              <span v-else>
                保存
              </span>
            </Button>

            <Tooltip max-width="200" content="这么实用的数据集，真的不分享到社区吗..." theme="light" placement="top">
              <i-switch
                size="large"
                v-model="saveForm.wantShare"
              >
                <span slot="open">分享</span>
                <span slot="close">分享</span>
              </i-switch>
            </Tooltip>
          </div>

          <Icon class="close" type="md-close" @click="saveForm.show=false"/>
        </div>
      </transition>

      <!-- 数据导出 -->
      <transition name="fade">
        <div class="export shadow-box" v-if="exportForm.show">
          <div class="flex-row">
            <div class="title">数据量</div>
            <InputNumber
            :min="1"
            :precision="0"
            v-model="exportForm.dataNum"
            @on-change="changeExportDataNum"
            ></InputNumber>

            <Tooltip
              max-width="400"
              content="数据量大于10万，数据生成所需时间长，可能会导致浏览器变卡变慢甚至卡死（视具体情况而定），生成大于10万的数据请耐心等待..."
              theme="light"
              placement="top"
              v-show="exportForm.tipShow"
            >
              <div class="tip flex-row">
                <Icon type="md-warning" :size="14"/>
                <span>数据量大于10万，请耐心等待...</span>
              </div>
            </Tooltip>
          </div>

          <div class="flex-row">
            <div class='title'>文件类型</div>
            <RadioGroup v-model="exportForm.fileType">
              <Radio label="json" ></Radio>
              <Radio label="csv"></Radio>
              <Radio label="xml"></Radio>
            </RadioGroup>
          </div>

          <div class="flex-row">
            <div class='title'>文件名</div>
            <Input
              v-model="exportForm.fileName"
              :maxlength="20"
              class="file-name"
            />
          </div>

          <div class="flex-row btn">
            <Button
              @click="doExport"
              type="primary"
              size="small"
            >导出</Button>
          </div>

          <Icon class="close" type="md-close" @click="exportForm.show=false"/>
        </div>
      </transition>

      <!-- 按钮区 -->
      <div class="preview-save" v-if="dataTypeConfigs.length > 0">
        <Button @click="preview"  type="primary" icon="md-eye"> 预览 </Button>
        <Tooltip max-width="200" content="保存数据以便于下次生成使用，同时推荐您将结果分享到社区，共享生成配置" theme="light" placement="top">
          <Button @click="saveForm.show=true" :disabled="saveForm.show"  type="primary" icon="md-share"> 保存并分享配置</Button>
        </Tooltip>
        <Button @click="exportForm.show=true"  :disabled="exportForm.show"  type="primary" icon="md-download"> 导出数据 </Button>
      </div>
    </div>

    
    <div id="downloadingmodal" class="flex-row" v-if="downloading">
        <div class="flex-column">
          <img src="../assets/images/loading.gif">
          <span>数据生成中, 请耐心等待...</span>
          <Progress :percent="genPercent" status="active" />
        </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Vue from 'vue'
import { mapGetters } from 'vuex';
import deepcopy from 'deepcopy';
import { Progress, Button, Input, Select, Option, Icon, Tag, Poptip,
         Switch, Tooltip, Modal, Table, InputNumber, RadioGroup, Radio, Scroll } from 'iview';
import Exporter from '@/components/Exporter/index.vue';
import FastConfig from '@/components/FastConfig/FastConfig.vue';
import BasicConfig from '@/components/BasicConfig/BasicConfig.vue';

import { SexConfig, NameConfig, CounterConfig,
         NumberConfig, IdentificationNumberConfig, Str2NumberConfig,
         StrConcatConfig, StrSegmentConfig ,RandomChoiceConfig,
         TextConfig, TimeConfig, ProvinceConfig, 
         CityConfig, DistrictConfig, DistrictCodeConfig, 
         RandomFieldConfig, DetailAddressConfig, GeographCoordinatesConfig,
         OccupationConfig} from '@/components/datatypesconfig/index.js';  
import { DATA_TYPES } from '@/datatypes/index.js';

import { Generator } from '@/generator/index';
import Worker from '@/generator/generate.worker.js';
import { WORKER_MESSAGE } from '@/generator/CONST.js'

import api from '../api/index.js';
import { formatJson, formatXml, formatCsv } from '../utils/export.js';


export default {
  name: 'home',
  data() {
    return {
      previewFlag: false,
      shareFlag: false,
      tableHead: [],
      // 预览数据量, 预览10条
      previewDataNum: 10, 
      DATA_TYPES: DATA_TYPES,
      dataTypeConfigs: [
      ],
      dataTypeToAdd: 'Sex',
      // 数据生成结果
      dataPreview: [],
      saveForm: {
        show: false,
        table_name: '',
        wantShare: true,
        nick_name: '一位不方便透露身份的网友',
      },
      exportForm: {
        show: false,
        tipShow: false,
        dataNum: 100,
        fileType: 'json',
        fileName: 'data_generated'
      },
      downloading: false,
      genPercent: 0,
    }
  },
  components: {
    Exporter,
    Progress,
    Button,
    Input,
    Select,
    Option,
    Icon,
    Tag,
    Tooltip,
    Scroll,
    'i-switch': Switch,
    InputNumber,
    RadioGroup, 
    Radio,
    Modal,
    Table,
    Poptip,
    Progress,
    
    // 字段配置组件
    SexConfig,
    NameConfig,
    CounterConfig,
    NumberConfig,
    ProvinceConfig,
    CityConfig,
    DistrictConfig,
    DistrictCodeConfig,
    IdentificationNumberConfig,
    Str2NumberConfig,
    StrConcatConfig,
    StrSegmentConfig,
    RandomChoiceConfig,
    TextConfig,
    TimeConfig,
    RandomFieldConfig,
    FastConfig,
    BasicConfig,
    DetailAddressConfig,
    GeographCoordinatesConfig,
    OccupationConfig
  },
  computed: {
    ...mapGetters(['storeConfigs'])
  },
  watch: {
    dataTypeConfigs: function (newVal, oldVal) {
      this.$store.commit('SET_CONFIGS', deepcopy(newVal))
      if (this.dataTypeConfigs.length == 0) {
        this.exportForm.show = false;
        this.saveForm.show = false;
      }
    }
  },
  mounted() {
    this.dataTypeConfigs = deepcopy(this.storeConfigs);
  },
  methods: {
    // 解析dataTypeConfigs数组中的参数
    parseDataTypeConfigs() {
      // 深度复制 this.dataTypeConfigs 变量 
      let dataTypeConfigs = deepcopy(this.dataTypeConfigs);
      // 遍历dataTypeConfigs数组，功能是将options，relation由字符串转变为数据对象，如字典或列表，因为传入的参数时转变为了字符串
      dataTypeConfigs.forEach(el => {
        el.options = JSON.parse(el.options);
        el.options.__unique = el.__unique;
        el.options.__display = el.__display;
        // 用于为options添加 __$$fieldname: gendata 为其关联的字段传入生成值
        el.options.__fieldName = el.fieldName;
        el.relation = JSON.parse(el.relation);
      });
      // 返回格式化后的数据
      return dataTypeConfigs;
    },

    // 普通生成
    plainGenerate(configs, nrows) {
      const generator = new Generator(configs, nrows);
      return generator.plainGenerate()
    },

    // 使用worker生成
    workerGenerate(configs, nrows, downLoadFunc) {
      const worker = new Worker();
      var _self = this;

      worker.onmessage = function (event) {
        const message = event.data;
        if (message.type == WORKER_MESSAGE.progress) {
          _self.genPercent = message.data;
        }

        if (message.type ==  WORKER_MESSAGE.finish) {
          downLoadFunc(message.data, _self.exportForm.fileName, _self.exportForm.fileType);
          _self.downloading = false;
        }
      };

      worker.onerror = function (e) {
        _self.downloading = false;
        _self.$Message.error({
          content: e.message,  // worker传过来的错误信息在message里面
          duration: 5
        });
      }

      worker.postMessage({
        configs: configs,
        nrows: nrows
      });
    },

    // ----------  预览
    preview(){
      this.dataPreview = [];
      try {
        this.dataPreview = this.plainGenerate(this.parseDataTypeConfigs(), this.previewDataNum);
        // 设置对话框为可见状态
        this.previewFlag = true;
        // 获取数据的所有keys
        const keys = Object.keys(this.dataPreview[0]);
        // 重置数据表头
        this.tableHead = [];
        for(var i = 0; i < keys.length; i++ ){
          this.tableHead.push(
            {
              title: keys[i],
              key:  keys[i]
            }
          )
        }
      } catch (e) {
        this.$Message.error({
          content: e.toString(),
          duration: 5
        });
      }
    },
    
    // ----------  下载
    download(data, filename, filetype) {
      try{
        if (!data) {
          throw new Error("没有可导出的数据！");
          return;
        }
        // 以及数据格式生成对应文件
        switch(filetype){
          case 'json':
            formatJson(data, filename, filetype);
            break;
          case 'csv':
            formatCsv(data, filename, filetype);
            break;
          case 'xml':
            formatXml(data, filename, filetype);
            break;
          default:
            formatCsv(data, filename, 'csv');
        }
        
      } catch (e) {
        this.$Message.error({
          content: e.toString(),
          duration: 5
        });
      }
    },

    // ----------  导出
    doExport () {
      const { exportForm, download, modalLoading, parseDataTypeConfigs, workerGenerate } = this;
      if (exportForm.fileName) {
        this.genPercent = 0;
        this.downloading = true;
        workerGenerate(parseDataTypeConfigs(), exportForm.dataNum, download);
      } else {
        this.$Message.error({
          content: "请填写导出文件名",
          duration: 5
        });
      }
    },

    // 基础字段组件
    basicConfig(componentToAdd) {
      const { dataTypeConfigs } = this;
      const component = componentToAdd + 'Config'
      dataTypeConfigs.push({
        component: component,
        id: new Date().getTime().toString(), // 使用时间戳添加一个唯一标识，可用于排序动画等
        fieldName: "",
        dataType: componentToAdd,
        options: JSON.stringify(DATA_TYPES[componentToAdd].options),
        relation: JSON.stringify(DATA_TYPES[componentToAdd].relation),
        __unique: DATA_TYPES[componentToAdd].__unique,
        __display: DATA_TYPES[componentToAdd].__display,
      })
    },

    // 快捷添加
    fastConfig(configs) {
      const { dataTypeConfigs } = this;
      const time = new Date().getTime();
      for (const i in configs) {
        dataTypeConfigs.push({
          component: configs[i].component,
          id: (time + i).toString(),
          fieldName: configs[i].fieldName,
          dataType: configs[i].dataType,
          options: JSON.stringify(configs[i].options),
          relation: JSON.stringify(configs[i].relation),
          __unique: configs[i].__unique,
          __display: configs[i].__display,
        })
      }
    },
    // 清空配置
    emptyConfigs() {
      this.dataTypeConfigs = [];
    },

    //获取当前时间 , 年-月-日 时：分：秒格式
    getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var seperator2 = ":";
      var month = date.getMonth() + 1<10? "0"+(date.getMonth() + 1):date.getMonth() + 1;
      var strDate = date.getDate()<10? "0" + date.getDate():date.getDate();
      var currentdate = date.getFullYear() + seperator1  + month  + seperator1  + strDate
          + " "  + date.getHours()  + seperator2  + date.getMinutes()
          + seperator2 + date.getSeconds();
      return currentdate;
    },

    // 保存分享
    async saveShare() {
      try {
        if (!this.saveForm.table_name) {
          throw new Error("请输入数据集/表名称")
        }
        this.generate(1); // 先生存1条数据检验配置是否正确
        // 数据格式化
        const form = {
          nick_name: this.saveForm.nick_name,
          table_name: this.saveForm.table_name,
          configs: this.parseDataTypeConfigs(),
          quote_num: 0,
          like_num: 0
        };
        if (!this.saveForm.wantShare) {  
          /*    仅保存至localstore        */
          var key = 'case_' + Date.parse(new Date());
          form.configs = JSON.stringify(form.configs);
          form['date_created'] = this.getNowFormatDate();
          form['id'] = key;
          localStorage.setItem(key, JSON.stringify(form));
        } else {
          /*   保存并分享， 数据保存到后端，同时保存至localstore */
          // 发出请求，数据保存至后端
          const res = await api.addCase(form)
          if (res.code === 200){
            this.$Message.success('分享成功');
            // 数据保存至localshore
            var key = 'case_' + Date.parse(new Date());
            form.configs = JSON.stringify(form.configs);
            form['date_created'] = this.getNowFormatDate();
            form['id'] = key;
            localStorage.setItem(key, JSON.stringify(form));
          } else {
            this.$Message.error("数据无法保存，请检查！"); 
          }
        }
      } catch (e) {
        this.$Message.error({
          content: e.toString(),
          duration: 5
        });
      }
    },

    // 导出数据数量的输入回调
    changeExportDataNum(num) {
      if (num >= 100000) {
        this.exportForm.tipShow = true;
      } else {
        this.exportForm.tipShow = false;
      }
    },

    // 自定义加载模态框函数，设置可见与不可见
    modalLoading(visible){
      var el = document.getElementById('downloadingmodal');
      if (visible){
        el.style.visibility =  "visible";
      }else{
        el.style.visibility =  "hidden" ;
      }
    },

      // 删除字段组件， k下标
    delRow(k) {
      this.dataTypeConfigs.splice(k, 1);
    },

    // 上移
    sortUp(k) {
      if (k != 0) {
        let temp = this.dataTypeConfigs[k - 1];
        Vue.set(this.dataTypeConfigs, k - 1, this.dataTypeConfigs[k]);
        Vue.set(this.dataTypeConfigs, k, temp);
      }
    },

    // 下移
    sortDown(k) {
      if (k != (this.dataTypeConfigs.length - 1)) {
        let temp = this.dataTypeConfigs[k + 1];
        Vue.set(this.dataTypeConfigs, k + 1, this.dataTypeConfigs[k]);
        Vue.set(this.dataTypeConfigs, k, temp);
      }
    },
  }
}
</script>

<style lang="scss">
#downloadingmodal {
  position: fixed;
  width:100%;
  height:100%;
  left: 0px;
  top: 0px;
  z-index: 1000;
  background-color: white;
  opacity: 0.9;
  text-align:center;

  .flex-column {
    padding: 300px;
    align-items: center;
    flex: 1;
  }

  img {
    width: 200px;
  }
}

// 通用flex
.flex-row {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.flex-column {
  display: flex;
  flex-direction: column;
}

.flip-list-move {
  transition: transform 1s;
}

.preview-save { 
  button{
    margin: 10px;
    &:nth-child(1) {
      margin-left: 0;
    }
  }
}

.field-list {
  margin-top: 15px;
  background-color: #ffffff;
  padding: 10px 10px;
  .field-title {
    height: 20px;
    line-height: 20px;
    margin-bottom: 10px;
    font-size: 16px;
    font-weight: 700;
    font-family: "SimHei";
    color: #2d8cf0;
    padding-left: 10px;
    border-left: 2px solid #2d8cf0;
    display: flex;

    span {
      flex: 1;
    }
    .empty-config {
      width: 35px;
      color: #888;
      cursor: pointer;
      font-size: 12px;
      font-weight: 100;
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
    }
  }
}
.action-area {
  display: flex;
  div {
    &:nth-child(n) {
      margin-right: 20px;
    }
    &:nth-child(2n) {
      margin-right: 0;
    }
  }
}
.config-row {
  font-size: 15px;
  padding: 20px 0 6px 0;
  margin-bottom: 5px;
  background-color: #f1fafa;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start; // 主轴排列方式
  align-items: center; // 交叉轴对齐方式
  
  &:nth-child(2n) {
    background-color: #fafafa;
  }
  .field-type {
    width: 62px;
    padding-left: 5px;
    margin-right: 10px;
  }
  .field-name {
    width: 160px;
    margin-right: 10px;
  }
  .relation-config {
    width:120px;
    .ivu-select-selection {
      width:120px;
    }
  }
  .field-config {
    flex: 1;
    display: flex;
    justify-content: flex-start; // 主轴排列方式
    align-items: center; // 交叉轴对齐方式
    .config-item {
      margin-right: 10px;
      display: flex;
      justify-content: flex-start; // 主轴排列方式
      align-items: center; // 交叉轴对齐方式
    }
  }
  .switch-config {
    width: 70px;
  }
  
  .delrow {
    width: 30px;
    cursor: pointer;
    font-size: 16px;
  }
  .up-down {
    width: 30px;
    display: flex;
    flex-direction: column;
    cursor: pointer;
  }
  .question {
    color: #66cccc; margin-left: 2px; cursor: pointer; font-size: 12px;
  }
}
label {
  position:relative;
  display:inline-block;
  .config-title {
    padding: 4px;
    pointer-events: none;
    position:absolute;
    left:0;
    top: -22px;
    color: #479ac7;
    font-size: 12px;
  }
}

// 保存分享表单
.save-share {
  margin: 10px 0;
  padding: 20px;
  width: 900px;

  .form-region {
    flex: 1;
  }

  .title {
    width: 100px;
    margin-right: 5px;
    text-align: right;
    color: #000;
    font-size: 13px;
  }

  .ivu-input-wrapper {
    width: 200px !important;
  }

  button {
    margin: 0 30px;
  }

  .close {
    width: 20px;
    cursor: pointer;
    font-size: 14px;
    margin-left: 30px;
  }
}

// 导出表单
.export {
  margin: 10px 0;
  padding: 20px;
  width: 400px;
  position: relative;

  .close {
    position: absolute;
    right: 6px;
    top: 6px;
    font-size: 14px;
    cursor: pointer;
  }

  .tip {
    color: sandybrown;
    margin-left: 8px;
    cursor: pointer;
  }

  .flex-row {
    margin-top: 20px;
    &:nth-child(1) {
      margin-top: 0;
    }

    .title {
      width: 60px;
      margin-right: 30px;
      text-align:justify;
      text-align-last: justify;
    }

    .file-name {
      width: 200px;
    }
    
  }

  .btn {
    justify-content: flex-end;
    button {
      width: 60px;
    }
  }
}
</style>