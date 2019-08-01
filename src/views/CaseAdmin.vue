<template>
  <div class="case">
      <div class="case-item" v-for="(caseItem, index) in caseList" :key="caseItem.id">
        <div class="content">
          <div class="title">
            {{ caseItem.table_name }}
            <Tooltip v-if="caseItem.stars > 0" class="recommend" max-width="300" content="已被推荐为快捷配置, 在首页进行展示" theme="light" placement="top">
              <Icon
                v-for="i in caseItem.stars"
                :key="i"
                type="ios-star"
              />
            </Tooltip>
          </div>

          <div class="fields-data">
            <div class="flex-row">
              <span
                class="fields"
                v-for="field in caseItem.fields"
                :key="field.fieldName"
              >{{ field.fieldName }}</span>
            </div>

            <div class="flex-row">
              <span v-for="(value, name) in caseItem.data" :key="name">{{ value }}</span>
            </div>
          </div>

          <div class="share-meta flex-row">
            <div>
              #来自
              <span class="sharer"> {{ caseItem.nick_name }}</span>
            </div>

            <div class="share-time">{{ caseItem.shareTime | timeToAgo }}</div>

            <div class="action-num" @click="quote(index)"  :class="{picked: caseItem.quoted}">
              <Icon type="md-share"/>
              引用
              {{ caseItem.quoteNum }}
            </div>

            <div class="action-num" @click="like(index)" :class="{picked: caseItem.liked}">
              <Icon type="ios-thumbs-up" />
              赞
              {{ caseItem.likeNum }}
            </div>

            <!-- 管理员操作框 -->
            <div  style="margin-right:0px;">
              <Icon type="ios-checkmark-circle" style="margin-right:5px;"/>
              <Poptip
                confirm
                title="确定通过吗"
                @on-ok="adoptCase(index)"
                style="margin-right:5px;"
              > 
                <span v-if="caseItem.status > 0" class="passed" >已通过</span>
                <span v-else>待审核</span>
              </Poptip>
            </div>

            <div>
              <Icon type="ios-star"  style="margin-right:5px;"/>
              <InputNumber :min="1" v-model="caseItem.fast_config" size="small"  style="margin-right:5px;"></InputNumber>
              <span @click="recommendCase(index)">推荐</span>
            </div>
            
            <div>
              <Icon type="md-trash"   style="margin-right:5px;"/>
              <Poptip
                  confirm
                  title="确定删除吗"
                  @on-ok="delCase(index)"
                >
                  <span>删除</span>
                </Poptip>
            </div>
            
          </div>
        </div>
      
    </div>
   <Page
        class="page"
        size="small"
        :page-size="numPerPage"
        show-total
        :total="totalNum"
        :current="storeCasePage"
        @on-change="pageChange"
    />
  </div>
</template>

<style lang="scss">
.filter{
  span{
    margin-right: 10%;
  }
  .select{
    width: 100px;
  }
  .ivu-select-selection{
    border: 0px solid #dcdee2;
  }
}
.passed{
    color: red;
}

.case {
  .case-item {
    border-bottom: 1px solid #eee;
    padding: 20px 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    .content {
      padding-left: 5px;
      .title {
        font-size: 16px;
        color: #1269db;
        font-weight: 700;

        .recommend {
          margin-left: 5px;
          .ivu-icon {
            font-size: 12px;
            color: #ff3d3d;
            cursor: pointer;
             margin-bottom: 3px;
          }
        }
      }

      .fields-data {
        margin: 10px 0;
        span {
          border: 1px solid #888888;
          &:nth-child(n + 2) {
            border-left: none;
          }
          display: inline-block;
          padding: 2px 0;
          width: 80px;
          height: 24px;
          overflow: hidden;
          text-align: center;
        }

        .fields {
          background-color: #f2f2f2;
          border-bottom: none;
          font-weight: 700;
        }
      }

      .share-meta {
        color: #888;
        .sharer {
          color: #1269db;
        }
        .action-num {
          display: flex;
          align-items: center;
          cursor: pointer;
          i {
            margin-right: 5px;
          }
        }
      }
    }
  }

  .page {
    margin-top: 20px;
  }
}
.administrator{
  display: flex;
}

.case .case-item .content .share-meta .acti {
  margin-right: 0px;
}
</style>
<script>
import api from '@/api/index.js';
import { Generator } from "@/generator/index";
import { Icon, Page, Tooltip,  Poptip, InputNumber } from "iview";
import { timeToAgo } from "@/utils/functions";
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      totalNum: 0,
      caseList: [],
      mycaseList: [],
      numPerPage: 5,
    };
  },
  components: {
    Icon,
    Page,
    Tooltip,
    Poptip,
    InputNumber
  },
  computed: {
    ...mapGetters(['storeCasePage'])
  },
  filters: {
    timeToAgo
  },
  mounted() {
    // 获取数据总条数
    this.totalCase();
    // 获取数据
    this.listCase();
  },
  methods: {
    // 获取数据总量
    async totalCase() {
      try {
        const res = await api.totalCaseAdmin();
        if (res.code === 200) {
          this.totalNum = res.data;
        } else {
          console.error(res);
          this.$Message.error("获取总页码错误");
        }
      } catch (e) {
        console.error(e);
        this.$Message.error(e);
      }
    },
    async like(index) {
      try {
        const res = await api.updateCase({
          id: this.caseList[index].id,
          type: 'like'
        });

        if (res.code === 200) {
          this.caseList[index].likeNum++;
          this.caseList[index].liked = true;
        } else {
          console.error(res);
          this.$Message.error("数据更新错误，请检查！");
        }
      } catch (e) {
        console.error(e);
        this.$Message.error(e);
      }
    },
    async quote(index) {
      try {
        const res = await api.updateCase({
          id: this.caseList[index].id,
          type: 'quote'
        });

        if (res.code === 200) {
          this.caseList[index].quoteNum += 1;
          this.caseList[index].quoted = true;
          this.$store.commit('SET_QUOTE', this.caseList[index])
        } else {
          console.error(res);
          this.$Message.error("数据更新错误，请检查！");
        }
      } catch (e) {
        console.error(e);
        this.$Message.error(e);
      }
    },

    async myquote(index) {
      try {
        this.mycaseList[index].quoted = true;
        this.$store.commit('SET_QUOTE', this.mycaseList[index])
      } catch (e) {
        console.error(e);
        this.$Message.error(e);
      }
    },
    // 删除我的案例
    mydelete(index){
      try {
        localStorage.removeItem(this.mycaseList[index].id);
        this.listCase();
        this.$Message.success('删除成功！');
      } catch (e) {
        console.error(e);
        this.$Message.error(e);
      }
    },
    // 删除分享的案例
    async delCase(index){
      try {
        const res = await api.delCase(this.caseList[index].id);
        if(res.code === 200) {
          this.listCase();
          this.$Message.success('删除成功！');
        } else {
          this.$Message.success('删除失败！');
        }
      } catch (e) {
        console.error(e);
        this.$Message.error(e);
      }
    },
    // 审核案例
    async recommendCase(index){
      try {
        const res = await api.recommendCase(this.caseList[index].id,this.caseList[index].fast_config);
        if(res.code === 200) {
          this.listCase();
          this.$Message.success('审核通过');
        } else {
          this.$Message.success('操作失败！');
        }
      } catch (e) {
        console.error(e);
        this.$Message.error(e);
      }
    },
    // 通过审核
    async adoptCase(index) {
      try {
        const res = await api.adoptCase(this.caseList[index].id);
        if(res.code === 200) {
          this.$Message.success('审核通过');
          this.listCase();
        } else {
          this.$Message.success('操作失败！');
        }
      } catch (e) {
        console.error(e);
        this.$Message.error(e);
      }
    },
    async listCase() {
      try {
        const res = await api.listCaseAdmin({
           page: this.storeCasePage,
           num: this.numPerPage,
        });
        if (res.code === 200) {
          this.caseList = this.parseCases(res.data);
        } else {
          this.$Message.error("数据获取错误，请检查！");
        }
      } catch (e) {
        console.log('e')
        this.$Message.error(e);
      }
    },

    pageChange(num) {
      this.$store.commit('SET_CASE_PAGE', num);
      this.listCase();
    },

    parseCases(caseData) {
      const _cases = [];
      caseData.forEach(_case => {
        const fields = [];
        const configs = JSON.parse(_case.configs);

        configs.forEach(config => {
          if (config.__display) {
            fields.push({
              fieldName: config.fieldName
            });
          }
        });

        let data = {};
        const generator = new Generator(configs, 1);
        try {
          data = generator.plainGenerate()[0];
        } catch (e) {
          console.log(e);
        }
        _cases.push({
          id: _case.id,
          nick_name: _case.nick_name,
          table_name: _case.table_name,
          shareTime: _case.date_created,
          likeNum: _case.like_num,
          quoteNum: _case.quote_num,
          fast_config: _case.fast_config,
          status: _case.status,
          stars: _case.fast_config % 10,
          liked: false,
          quoted: false,
          configs: configs,
          fields: fields,
          data: data
        });
      });
      return _cases;
    }
  }
};
</script>


