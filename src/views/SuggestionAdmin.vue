<template>
    <div class="suggestion">
      <div
        class="suggestion-item" 
        v-for="suggestionItem in suggestionList" 
        :key="suggestionItem.id"
        
      >
        <div class="head-img">
          {{ suggestionItem.nick_name | headText }}
        </div>

        <div class="content">
          <div class="suggestion">
            {{ suggestionItem.content }}
          </div>

          <div class="opinion-meta">
            <div class="opinion">
              来自 {{ suggestionItem.nick_name }}
            </div>
            
            <div class="publish-time">
              {{ suggestionItem.date_created | timeToAgo}}
            </div> 

            <div style="margin-right:0px; cursor: pointer;">
              <Icon type="ios-checkmark-circle" style="margin-right:5px;"/>
              <Poptip
                confirm
                title="确定通过吗"
                @on-ok="adoptSuggestion(suggestionItem.id)"
                style="margin-right:5px;"
              > 
                <span v-if="suggestionItem.status > 0" class="passed" >已通过</span>
                <span v-else>待审核</span>
              </Poptip>
            </div>

             <div style="margin-right:0px; cursor: pointer;">
              <Icon type="md-trash"   style="margin-right:5px;"/>
              <Poptip
                  confirm
                  title="确定删除吗"
                  @on-ok="delSuggestion(suggestionItem.id)"
                >
                  <span>删除</span>
                </Poptip>
            </div>
          </div>
        </div>
      </div>

      <div class="add-suggestion" >
        <Button class="suggest-btn" icon="md-add" @click="suggestionFlag = true">建议</Button>  
        <Modal
          title="提意见"
          v-model="suggestionFlag"
          :mask-closable="false"
          @on-ok="addSuggestion"
        >
          <span class='input_label'>用户名</span>
          <Input v-model="nickname" type="text"  style="width: 200px" placeholder="请输入您的昵称..." /><br>
          <Input v-model="content" type="textarea" :rows="3" placeholder="请输入您的意见..." />
        </Modal>
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
.suggestion {
  .suggestion-item {
    border-bottom: 1px solid #eee;
    padding: 20px 10px;
    display: flex;
    flex-direction: row;
    align-items: center;

    .head-img {
      width: 60px;
      height: 60px;
      background: #52BC89;
      text-align: center;
      line-height: 60px;
      color: #ffffff;
      border-radius: 60px;
      font-size: 20px;
    }

    .content {
      padding-left: 10px;
      flex: 1;

      .suggestion {
        padding: 5px 0;
        font-size: 12px;
      }

      .opinion-meta {
        display: flex;
        flex-direction: row;
        color: #888;

        div {
          margin-right: 20px;
        }
      }
    }
  }
  .suggest-btn {
    margin-top: 20px;
  }
}
.ivu-modal-body{
  .input_label {
    width: 50px;
    display: inline-block;
    font-size: 14px;
    margin: 15px 20px 30px 10px;
    text-align:justify;
    text-align-last: justify;
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
      suggestionList: [],
      suggestionFlag: false,
      content: '',
      nickname: ''
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

    async addSuggestion() {
       try {
        const params={
          nick_name: this.nickname,
          content: this.content,
        }
        const res = await api.addSuggestion(params)
        if (res.code === 200){
          this.$Message.success('添加建议成功, 等待后台审核');
          this.listSuggestion()
        } else {
          this.$Message.error("数据无法保存，请检查！"); 
        }
      } catch (e) {
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
    pageChange(num) {
      this.$store.commit('SET_SUGGESTION_PAGE', num);
      this.listSuggestion();
    }
  }
}
</script>
