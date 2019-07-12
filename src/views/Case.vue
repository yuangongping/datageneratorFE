<template>
    <div class="case">
      <div
        class="case-item" 
        v-for="caseItem in cases" 
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

            <div class="action-num">
              <Icon type="md-share" />
              引用
              {{ caseItem.quoteNum }}
            </div>

            <div class="action-num" @click="addHeart(caseItem.id)">
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
export default { 
  data() {
    return {
      caseList: [{
        id: 1,
        name: '法人库',
        sharer: '胖胖的小可爱',
        likeNum: 0,
        quoteNum: 0,
        config: '[{"component": "NameConfig","id": "1562834639872","fieldName": "name","dataType": "Name","options": {"sex": "random","__unique": false,"__display": true,"__fieldName": "name"},"relation": {"fieldNames": "sex","type": "COR_RELATION","allowTypes": ["Sex"]},"__unique": false,"__display": true},{"component": "SexConfig","id": "1562834640306","fieldName": "sex","dataType": "Sex","options": {"manAlias": "男","womanAlias": "女","sex": "random","__unique": false,"__display": true,"__fieldName": "sex"},"relation": null,"__unique": false,"__display": true}]',
        shareTime: '2019-07-08 18:20:20'
      },
      {
        id: 2,
        name: '人口信息库',
        sharer: '胖胖的小可爱',
        likeNum: 0,
        quoteNum: 0,
        config: '[{"component": "NameConfig","id": "1562834639872","fieldName": "name","dataType": "Name","options": {"sex": "random","__unique": false,"__display": true,"__fieldName": "name"},"relation": {"fieldNames": "sex","type": "COR_RELATION","allowTypes": ["Sex"]},"__unique": false,"__display": true},{"component": "SexConfig","id": "1562834640306","fieldName": "sex","dataType": "Sex","options": {"manAlias": "男","womanAlias": "女","sex": "random","__unique": false,"__display": true,"__fieldName": "sex"},"relation": null,"__unique": false,"__display": true}]',
        shareTime: '2019-07-12 11:58:20'
      }],
    }
  },
  components: {
    Icon
  },
  computed: {
    cases() {
      const _cases = []
      this.caseList.forEach(_case => {
        const fields = []
        const configs = JSON.parse(_case.config);
        configs.forEach(config => {
          if (config.__display) {
            fields.push({
              fieldName: config.fieldName,
            })
          }
        })

        _cases.push({
          id:_case.id,
          sharer: _case.sharer,
          name: _case.name,
          shareTime: _case.shareTime,
          likeNum: _case.likeNum,
          quoteNum: _case.quoteNum,
          fields: fields,
        })
      })

      return _cases;
    }
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
  methods: {
    addHeart(id) {
       this.caseList.forEach(_case => {
          if (_case.id == id) {
            _case.likeNum ++
          }
       })
    }
  }
}
</script>


