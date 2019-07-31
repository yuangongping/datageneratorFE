<template>
    <div class="suggestion">
      <div v-for="suggestionItem in suggestionList"  :key="suggestionItem.id">
        <div class="item">
          <!-- 图标 -->
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

              <div class="reply" @click="replySuggestionFlag=true; replyForm.suggestion_id=suggestionItem.id">
                <Icon type="md-chatboxes" />
                回复
              </div>
            </div>

            <div class="subitem" v-for="replyItem in suggestionItem.reply" :key="replyItem.id">
              <div class="item" v-if="replyItem.status > 0">
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

                    <div class="reply" @click="replySuggestionFlag=true; replyForm.suggestion_id=suggestionItem.id">
                      <Icon type="md-chatboxes" />
                      回复
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- 回复 -->
      <div class="add-reply" >  
        <Modal
          title="回复"
          v-model="replySuggestionFlag"
          :mask-closable="false"
          @on-ok="replySuggestion"
        >
          <span>用户名</span>
          <Input v-model="replyForm.nick_name" type="text" placeholder="请输入您的昵称..." style="width:90%; margin: 20px 0px 30px 10px"/><br>
          <span>意  见</span>
          <Input v-model="replyForm.content" type="textarea" :rows="3" placeholder="请输入您的意见..." style="width:90%;  margin: 0px 0px 0px 18px"/>
        </Modal>
      </div>

      <div class="add-suggestion" >
        <Button class="suggest-btn" icon="md-add" @click="suggestionFlag = true">建议</Button>  
        <Modal
          title="提意见"
          v-model="suggestionFlag"
          :mask-closable="false"
          @on-ok="addSuggestion"
        >
          <span>用户名</span>
          <Input v-model="replyForm.nick_name" type="text" placeholder="请输入您的昵称..." style="width:90%; margin: 20px 0px 30px 10px"/><br>
          <span>意  见</span>
          <Input v-model="replyForm.content" type="textarea" :rows="3" placeholder="请输入您的意见..." style="width:90%;  margin: 0px 0px 0px 18px"/>
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
      background:  rgb(195, 214, 21);
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
import { Modal, Input, Button, Page, Icon } from 'iview';
import api from '@/api/index.js';
import { timeToAgo } from "@/utils/functions";
import { mapGetters } from 'vuex';

export default { 
  data() {
    return {
      totalNum: 0,
      suggestionList: [],
      suggestionFlag: false,
      replySuggestionFlag: false,
      replyForm: {
        nick_name: '',
        content: '',
        suggestion_id: ''
      }
    }
  },
  components: {
    Input,
    Modal,
    Button,
    Page,
    Icon
  },
  mounted() {
    this.totalSuggestion();
    this.listSuggestion();
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
    async totalSuggestion(){
      try {
        const res = await api.totalSuggestion();
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

    async addSuggestion() {
       try {
        const params={
          nick_name: this.nick_name,
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

    async listSuggestion() {
      try{
        const res = await api.listSuggestion({
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
    async replySuggestion(){
      const res = await api.replySuggestion(this.replyForm);
      if (res.code == 200) {
        this.$Message.success('信息提交成功, 等待后台审核其合法性！');
        this.listSuggestion();
      }
    },
    pageChange(num) {
      this.$store.commit('SET_SUGGESTION_PAGE', num);
      this.listSuggestion();
    }
  }
}
</script>
