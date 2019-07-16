<template>
    <div class="case">
      <div
        class="case-item" 
        v-for="(caseItem, index) in caseList" 
        :key="caseItem.id"
        
      >
        <div class="head-img">
          {{ caseItem.name | headText }}
        </div>

        <div class="content">
          <div class="title">
            {{ caseItem.name }}
          </div>

          <div class="fields">
            <span v-for="field in caseItem.fields"
              :key="field.fieldName"
            >
              {{ field.fieldName }}
            </span>
          </div>

          <div class="share-meta">
            <div class="sharer">
              来自 {{ caseItem.sharer }}
            </div>
            
            <div class="share-time">
              {{ caseItem.shareTime | getDate }}
            </div>

            <div class="action-num" @click="quote(index)">
              <Icon type="md-share" />
              引用
              {{ caseItem.quoteNum }}
            </div>

            <div class="action-num" @click="like(index)">
              <Icon type="md-heart" />
              赞
              {{ caseItem.likeNum }}
            </div>
          </div>
        </div>
        
        
      </div>
    </div>
    
</template>

<style lang="scss">
.case {
  .case-item {
    border-bottom: 1px solid #eee;
    padding: 20px 10px;
    display: flex;
    flex-direction: row;
    align-items: center;

    .head-img {
      width: 60px;
      height: 60px;
      background: #5B95F9;
      text-align: center;
      line-height: 60px;
      color: #ffffff;
      border-radius: 30px;
      font-size: 20px;
    }

    .content {
      padding-left: 5px;
      .title {
        font-size: 16px;
        color: #1269db;
      }

      .fields {
        padding: 5px 0;
      }

      .share-meta {
        display: flex;
        flex-direction: row;
        color: #888;

        div {
          margin-right: 20px;
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
}
</style>
<script>
import { Icon } from 'iview';
import { apiUpdateCase, apiListCase } from '@/api/api.js'
export default { 
  data() {
    return {
      caseList: [],
    }
  },
  components: {
    Icon
  },
  filters: {
    headText(name) {
      return name.slice(0, 1);
    },
    getDate(dateTimeStamp){
			if(dateTimeStamp==undefined){
				return false;
			}else{
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
  },
  created() {
    this.listCase()
  },
  methods: {
    async like(index) {
      const params = {'id': this.caseList[index].id, 'like_num': this.caseList[index].likeNum + 1, 'islike': true};
      try {
        const apiLike = await apiUpdateCase(params);
        if (apiLike.code === 200){
          this.caseList[index].likeNum ++ ;
        } else {
          this.$Message.error("数据更新错误，请检查！"); 
        }
      } catch(e) {
        this.$Message.error(e);
      }
    },
    async quote(index) {
      const params = {'id': this.caseList[index].id, 'quote_num': this.caseList[index].quoteNum + 1, 'islike': false};
      try {
        const apiQuote = await apiUpdateCase(params);
        if (apiQuote.code === 200){
           this.caseList[index].quoteNum += 1
        } else {
          this.$Message.error("数据更新错误，请检查！"); 
        }
      } catch(e) {
        this.$Message.error(e);
      }
    },
    async listCase() {
      try{
        const res = await apiListCase();
        if (res.code === 200){
          this.caseList = this.parseCases(res.data)
        } else {
          this.$Message.error("数据获取错误，请检查！"); 
        }
      } catch(e) {
        this.$Message.error(e);
      }
    },

    parseCases(caseData) {
      const _cases = []
      caseData.forEach(_case => {
        const fields = []
        const configs = JSON.parse(_case.configs);
        configs.forEach(config => {
          if (config.__display) {
            fields.push({
              fieldName: config.fieldName,
            })
          }
        })
        _cases.push({
          id:_case.id,
          sharer: _case.nick_name,
          name: _case.table_name,
          shareTime: _case.date_created,
          likeNum: _case.like_num,
          quoteNum: _case.quote_num,
          fields: fields,
        })
      })
      return _cases;
    }
  }
}
</script>


