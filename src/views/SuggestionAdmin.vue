<template>
    <div class="suggestion">
      <div v-for="suggestionItem in suggestionList"  :key="suggestionItem.id">
        <div class="item">
          <div class="head-img">
            {{ suggestionItem.nick_name | headText }}
          </div>

          <div class="body">
            <div class="content_first">
              {{ suggestionItem.content }}
            </div>

            <div class="opinion-meta">
              <div class="opinion">
                来自 <span class="nick_name">{{ suggestionItem.nick_name }}</span>
              </div>
              
              <div class="publish-time">
                {{ suggestionItem.date_created | timeToAgo}}
              </div>

              <div class="reply">
                <Icon class="icon" type="ios-checkmark-circle" />
                <Poptip
                  confirm
                  title="确定通过吗"
                  @on-ok="adoptSuggestion(suggestionItem.id)"
                  style="margin-right:5px;"
                > 
                  <span v-if="suggestionItem.status > 0" class="passed" >已通过</span>
                  <span v-else style="color: gray">待审核</span>
                </Poptip>
                 
                <Icon class="icon" type="md-trash" />
                  <Poptip
                  confirm
                  title="确定删除吗"
                  @on-ok="delSuggestion(suggestionItem.id)"
                  >
                  <span style="color:red">删除</span>
                </Poptip>
              </div>
               
            </div>

            <div class="subitem" v-for="replyItem in suggestionItem.reply" :key="replyItem.id">
              <div class="item">
                <div class="sub-head-img">
                  {{ replyItem.nick_name | headText }}
                </div>

                <div class="body">
                  <div class="sub-content_first">
                    {{ replyItem.content }}
                  </div>

                  <div class="opinion-meta">
                    <div class="opinion">
                      来自 <span class="nick_name">{{ replyItem.nick_name }}</span>
                    </div>
                    
                    <div class="publish-time">
                      {{ replyItem.date_created | timeToAgo}}
                    </div>

                    <div class="reply">
                      <Icon class="icon" type="ios-checkmark-circle" />
                      <Poptip
                        confirm
                        title="确定通过吗"
                        @on-ok="adoptSuggestionReply(replyItem.id)"
                        style="margin-right:5px;"
                      > 
                        <span v-if="replyItem.status > 0" class="passed" >已通过</span>
                        <span v-else class="pendingApproval">待审核</span>
                      </Poptip>
                      
                      <Icon class="icon" type="md-trash" />
                        <Poptip
                        confirm
                        title="确定删除吗"
                        @on-ok="delSuggestionReply(replyItem.id)"
                        >
                        <span style="color:red">删除</span>
                      </Poptip>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <Page
        class="page"
        size="small"
        :page-size="storeNumPerPage"
        show-total
        :total="totalNum"
        :current="storeSuggestionPage"
        @on-change="pageChange"
      />
    </div>
</template>

<style lang="scss">
$nick_name_color: #1269db;

.item {
  display: inline-flex;
  .head-img {
    width: 50px;
    height: 50px;
    background: #52BC89;
    text-align: center;
    line-height: 50px;
    color: #ffffff;
    border-radius: 50px;
    font-size: 20px;
  }
  .body{
    flex-direction: column;
    .content_first {
      margin: 15px 0px 0px 10px;
    }
    .sub-content_first {
      margin: 8px 0px 0px 10px;
    }
    .opinion-meta{
      display: inline-flex;
      margin: 10px 0px 20px 10px;
      border-bottom: 1px solid rgb(243, 240, 240);
      div{
        margin-right: 30px;
      }
    }
    .reply{
      margin-right: 0px; 
      cursor: pointer;
      .icon {
        height:80%;
        margin-right: 6px; 
      }
      .pendingApproval{
        color: gray;
      }
      .passed{
        color: #52BC89;
      }
    }
    .nick_name{
      color: $nick_name_color;
    }
    .subitem{
      .sub-body{
        display: inline-flex;
      }
    }
    .sub-head-img{
      width: 35px;
      height: 35px;
      background: rgb(195, 214, 21);
      text-align: center;
      line-height: 35px;
      color: #ffffff;
      border-radius: 35px;
      font-size: 10px;
    }
  }
}
.page {
  margin-top: 20px;
}
</style>
<script>
import { Modal, Input, Button, Page, Icon, Poptip } from 'iview';
import api from '@/api/index.js';
import { timeToAgo } from "@/utils/functions";
import { mapGetters } from 'vuex';

export default { 
  data() {
    return {
      totalNum: 0,
      suggestionList: []
    }
  },
  components: {
    Input,
    Modal,
    Button,
    Page,
    Icon,
    Poptip
  },
  mounted() {
    this.totalSuggestionAdmin();
    this.listSuggestionAdmin();
  },
  computed: {
    ...mapGetters(['storeSuggestionPage', 'storeNumPerPage'])
  },
  filters: {
    headText(nick_name) {
      return nick_name.slice(0, 1);
    },
    timeToAgo
  },
  methods: {
    async totalSuggestionAdmin(){
      try {
        const res = await api.totalSuggestionAdmin();
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
    async listSuggestionAdmin() {
      try{
        const res = await api.listSuggestionAdmin({
          page: this.storeSuggestionPage,
          num: this.storeNumPerPage
        });
        if (res.code === 200){
          this.suggestionList = res.data
        } else {
          console.error(res);
          this.$Message.error("数据获取错误，请检查！"); 
        }
      } catch(e) {
        console.error(e);
        this.$Message.error(e);
      }
    },

    // 意见审核
    async adoptSuggestion(id) {
      try {
        const res = await api.adoptSuggestion(id);
        if(res.code === 200) {
          this.$Message.success('审核通过');
          this.listSuggestionAdmin();
        } else {
          this.$Message.success('操作失败！');
        }
      } catch (e) {
        this.$Message.error(e);
      }
    },
    
    // 删除意见
    async delSuggestion(id) {
      try {
        const res = await api.delSuggestion(id);
        if(res.code === 200) {
          this.listSuggestionAdmin();
          this.$Message.success('删除成功！');
        } else {
          this.$Message.success('删除失败！');
        }
      } catch (e) {
        console.error(e);
        this.$Message.error(e);
      }
    },

    // 审核回复
    async adoptSuggestionReply(id) {
      try {
        const res = await api.adoptSuggestionReply(id);
        if(res.code === 200) {
          this.$Message.success('审核通过');
          this.listSuggestionAdmin();
        } else {
          this.$Message.success('操作失败！');
        }
      } catch (e) {
        this.$Message.error(e);
      }
    },

    // 删除意见回复
    async delSuggestionReply(id) {
      try {
        const res = await api.delSuggestionReply(id);
        if(res.code === 200) {
          this.listSuggestionAdmin();
          this.$Message.success('删除成功！');
        } else {
          this.$Message.success('删除失败！');
        }
      } catch (e) {
        console.error(e);
        this.$Message.error(e);
      }
    },

    // 翻页组件的页码改变回调函数
    pageChange(num) {
      this.$store.commit('SET_SUGGESTION_PAGE', num);
      this.listSuggestion();
    }
  }
}
</script>
