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
              {{ suggestionItem.date_created  | getDate}}
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
</style>
<script>
import { Icon, Modal, Input, Button } from 'iview';
import { apiInsertSuggestion, apiListSuggestion } from '@/api/api.js'
export default { 
  data() {
    return {
      suggestionList: [],
      suggestionFlag: false,
      content: '',
      nickname: ''
    }
  },
  components: {
    Icon,
    Input,
    Modal,
    Button
  },
  created() {
    this.listSuggestion()
  },
 
  filters: {
    headText(nick_name) {
      return nick_name.slice(0, 1);
    },
     getDate(dateTimeStamp){
			if(dateTimeStamp==undefined){
				return false;
			}else{
        if (dateTimeStamp.indexOf("-") != -1){
          var diffValue = new Date().getTime() - new Date(dateTimeStamp.replace(/\-/g, "/")).getTime();		
          if(diffValue < 0){
            console.log("结束日期不能小于开始日期！");
          }
          var dayC =diffValue/(1000 * 60 * 60 * 24);
          var hourC =diffValue/(1000 * 60 * 60 );
          var minC =diffValue/(1000 * 60 );
          if(dayC>3){
          return dateTimeStamp;
          }else if(dayC>=1 && dayC<=3){
          return parseInt(dayC) +"天前";
          }else if(hourC>=1){
          return parseInt(hourC) +"小时前";
          }else if(minC>=1){
          return parseInt(minC) +"分钟前";
          }else{
          return "刚刚";
          }
        }
			}	
		}
  },
  methods: {
    async addSuggestion() {
       try {
        const params={
          nick_name: this.nickname,
          content: this.content,
        }
        const res = await apiInsertSuggestion(params)
        if (res.code === 200){
          this.$Message.success('添加建议成功');
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
        const res = await apiListSuggestion();
        if (res.code === 200){
          this.suggestionList = res.data
        } else {
          this.$Message.error("数据获取错误，请检查！"); 
        }
      } catch(e) {
        this.$Message.error(e);
      }
    }
  }
}
</script>
