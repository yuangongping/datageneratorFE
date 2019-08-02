<template>
    <div class="visual">
      <div>
        <span>ip筛选： </span>
        <Select v-model="ipchoice" 
         filterable
         :max-tag-count="1"
         style="width:100px" >
          <Option value="ALL">全部</Option>
          <Option v-for="ip in ipfilter" :value="ip" :key="ip">{{ip}}</Option>
        </Select>
      </div>
      <div>
        <span>时间筛选： </span>
        <Select v-model="timefilter" style="width:60px">
            <Option value="ALL">全部</Option>
            <Option value="自定义">自定义</Option>
        </Select>
        <div v-if="timefilter=='自定义'">
          <DatePicker v-model="starttime" type="date" placeholder="Select date" style="width: 200px"></DatePicker>
          <span>   至：  </span>
          <DatePicker v-model="endtime" type="date" placeholder="Select date" style="width: 200px"></DatePicker>
        </div>

      </div>
      <div>
        <Button @click="getinfo">筛选</Button>
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
<style >
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
      pagesize: 1
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