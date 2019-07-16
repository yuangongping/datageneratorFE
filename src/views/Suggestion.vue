<template>
    <div class="suggestion">
      <div
        class="suggestion-item" 
        v-for="suggestionItem in suggestion" 
        :key="suggestionItem.id"
        
      >
        <div class="head-img">
          {{ suggestionItem.opinioner | headText }}
        </div>

        <div class="content">
          <div class="suggestion">
            {{ suggestionItem.content }}
          </div>

          <div class="opinion-meta">
            <div class="opinion">
              来自 {{ suggestionItem.opinioner }}
            </div>
            
            <div class="publish-time">
              {{ suggestionItem.pubTime  | getDate}}
            </div>
          </div>

        </div>
      </div>

      <Button class="suggest-btn" icon="md-add" @click="suggestionFlag = true">建议</Button>  
      <Modal
        title="提意见"
        v-model="suggestionFlag"
        :mask-closable="false"
        @on-ok="addSuggestion"
      >
        <Input v-model="content" type="textarea" :rows="2" placeholder="请输入您的意见..." />
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
</style>
<script>
import { Icon, Modal, Input, Button } from 'iview';
export default { 
  data() {
    return {
      suggestionList: [{
        id: 1,
        opinioner : '胖胖的小可爱',
        content: "学习起点高、难度大，市面上只有很少的培训机构在做。对应岗位：数据科学家、数据挖掘工程师、机器学习工程师等学习起点高、\
        学习起点高、难度大，市面上只有很少的培训机构在做。对应岗位：数据科学家、数据挖掘工程师、机器学习工程师等难度大，市面上只有很少的\
        培训机构在做。对应岗位：数据科学家、数据挖掘工程师、机器学习工程师等",
        pubTime: '2019-07-11 18:20:20',
        likeNum: 0,
        readNum: 0
      },
      {
        id: 2,
        opinioner : 'widaodao',
        content: "学习起点高、难度大，市面上只有很少的培训机构在做。对应岗位：数据科学家、数据挖掘工程师、机器学习工程师等学习起点高、\
        学习起点高、难度大，市面上只有很少的培训机构在做。对应岗位：数据科学家、数据挖掘工程师、机器学习工程师等难度大，市面上只有很少的\
        培训机构在做。对应岗位：数据科学家、数据挖掘工程师、机器学习工程师等",
        pubTime: '2019-07-11 18:20:20',
        // likeNum: 0,
        readNum: 0
      }],
      suggestionFlag: false,
      content: ''
    }
  },
  components: {
    Icon,
    Input,
    Modal,
    Button
  },
  computed: {
    suggestion() {
      const _suggestion = []
      this.suggestionList.forEach(suggestion => {
        _suggestion.push({
          opinioner: suggestion.opinioner,
          pubTime: suggestion.pubTime,
          // likeNum: suggestion.likeNum,
          readNum: suggestion.readNum,
          content: suggestion.content,
        })
      })

      return _suggestion;
    }
  },
  filters: {
    headText(opinioner) {
      return opinioner.slice(0, 1);
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
    addSuggestion() {
      this.suggestionList.push({
         id: 2,
        opinioner : 'test',
        content: this.content,
        pubTime: '2019-07-12 8:00:20',
        likeNum: 0,
        readNum: 0
      })
    }
  }
}
</script>
