<template>
  <div class="visual">
    <div class="filter">
      
      <div class="item">
        <label>IP筛选：</label>
        <Select v-model="ipchoice" 
          filterable
          :max-tag-count="1"
          class="select"
          >
            <Option value="ALL">全部</Option>
            <Option v-for="ip in ipfilter" :value="ip" :key="ip">{{ip}}</Option>
        </Select>
      </div>

      <div class="item">
        <label>时间筛选： </label>
        <Select 
          v-model="timefilter"
          class="select">
            <Option value="ALL">全部</Option>
            <Option value="自定义">自定义</Option>
        </Select>
        <div class="selfDefine" v-if="timefilter=='自定义'" >
          <DatePicker v-model="starttime" type="date" placeholder="Select date"></DatePicker>
          <label class="connectLabel"> 至</label>
          <DatePicker v-model="endtime" type="date" placeholder="Select date" ></DatePicker>
        </div>
      </div>
      <div class="item">
        <Button type="primary" icon="ios-funnel" @click="getinfo">筛选</Button>
      </div>

    </div>
    <Table size="large" :columns="title" :data="content"></Table>
    <div>
      <Page
        class="page"
        size="small"
        :page-size="pagesize"
        show-total
        :total="totalNum"
        :current="storeVisualPage"
        @on-change="pageChange"
      />
    </div>
  </div>
</template>
<style lang="scss">
.filter{
  display: flex;
  .item {
    display:inline-flex;
    align-items: center;
    height: 50px;
    margin-right: 20px;
    .select{
      border: 1px solid rgb(240, 236, 236);
      border-radius: 4px;
    }
  }
}
.selfDefine{
  margin-left: 10px;
  .connectLabel{
    margin-left: 10px;
    margin-right: 10px;
  }
}

</style>

<script>
import api from '@/api/index.js';
import { mapGetters } from 'vuex';
import { Generator } from "@/generator/index";
import { Icon, Select, Table,RadioGroup, Radio, DatePicker, Option,Button, Page} from "iview";
export default{
  data() {
    return {
      title: [
        { 
            type: 'index',
            title: "序号",
            width: 100,
            align: 'center'
        },
        {
          title: "时间",
          key:   "date_created",
        },
        {
          title: "地址",
          key:   "ip"
        },
        {
          title: "数据量",
          key:   "export_data_number",
        },
        {
          title: "文件格式",
          key:   "export_file_type",
        },
        {
          title: "文件名",
          key:   "export_filename",
        }
      ],
      content:[],
      timefilter:"ALL",
      ipfilter:[],
      ipchoice:"ALL",
      starttime:'',
      endtime:'',
      totalNum: 0,
      firstvisit: '0',
      pagesize: 10
    };
  },
  components:{
    Table,
    Select,
    RadioGroup,
    Radio,
    Option,
    DatePicker,
    Button,
    Page
  },
  mounted(){
      this.getinfo()
  },
  computed: {
    ...mapGetters(['storeVisualPage'])
  },
  methods: {
      async getinfo(){
        this.content=[];
        var endtime = String(Date.parse(this.endtime));
        var starttime = String(Date.parse(this.starttime));
        if(starttime > endtime){
          this.$Message.error(`起始时间应小于终止时间！`);
          return;
        }
        try {
          const res = await api.getUserRecord(
            {
              'ipchoice': this.ipchoice,
              'timefilter': this.timefilter,
              'starttime': starttime,
              'endtime': endtime,
              'pagesize': this.pagesize,
              'currentpage':this.storeVisualPage,
              'firstvisit':this.firstvisit
          });
        if (res.code === 200) {
          if(this.firstvisit ==='0'){
            this.ipfilter=res.ipfilter;
            this.firstvisit='1';
          }
          this.content=res.data;
          this.totalNum=res.totalNum;

        } else {
          console.error(res);
          this.$Message.error("获取记录信息错误");
        }
      } catch (e) {
        console.error(e);
      }
    },
    pageChange(num) {
      this.$store.commit('SET_VISUAL_PAGE', num);
      this.getinfo();
    }
  }
}

</script>