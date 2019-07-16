<template>
    <div class="case">
      <div class="filter">
        <div v-if="filterFlag">
           <!-- <span>为您提供相关结果26161616个</span> -->
          <a @click="filterFlag=false"><Icon type="ios-funnel-outline" />筛选工具</a>
        </div>
        <div v-else>
          <Select v-model="filter" class="select">
            <Option value="查看所有" >查看所有</Option>
            <Option value="仅看自己" >仅看自己</Option>
          </Select>
          <a @click="filterFlag=true"><Icon type="ios-arrow-up" />收起工具</a>
        </div>
      </div>

      <div
        class="case-item" 
        v-for="caseItem in caseList" 
        :key="caseItem.id"
        >
        <div class="content">
          <div class="title">
            {{ caseItem.name }}
          </div>

          <div class="fields-data">
            <div class="flex-row">
              <span class="fields" v-for="field in caseItem.fields"
                :key="field.fieldName"
              >
                {{ field.fieldName }}
              </span>
            </div>

            <div class="flex-row">
              <span v-for="(value, name) in caseItem.data"
                :key="name"
              >
                {{ value }}
              </span>
            </div>
          </div>

          <div class="share-meta">
            <div>
              来自 <span class="sharer">{{ caseItem.sharer }}</span>
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
.filter{
  span{
    margin-right: 10%;
  }
  .select{
    width: 100px;
    border: 0px solid red;
  }
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
          text-align: center;
        }

        .fields {
          background-color: #f2f2f2;
          border-bottom: none;
          font-weight: 700;
        }
      }

      .share-meta {
        display: flex;
        flex-direction: row;
        color: #888;

        div {
          margin-right: 20px;
        }

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
}
</style>
<script>
import { Generator } from '@/generator/index';
import { Icon, Button, Select, Option  } from 'iview';
export default { 
  data() {
    return {
      filterFlag: false,
      filter: '查看所有',
      caseList: [],
    }
  },
  components: {
    Icon,
    Button,
    Select,
    Option 
  },
  filters: {
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
  mounted() {
    const data = [{
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
        shareTime: '2019-07-14 11:58:20'
      }];
    this.caseList = this.parseCases(data);
  },
  methods: {
    addHeart(id) {
       this.caseList.forEach(_case => {
          if (_case.id == id) {
            _case.likeNum ++
          }
       })
    },
    parseCases(caseData) {
      const _cases = []
      caseData.forEach(_case => {
        const fields = [];
        const configs = JSON.parse(_case.config);
        const generator = new Generator(configs, 1);

        configs.forEach(config => {
          if (config.__display) {
            fields.push({
              fieldName: config.fieldName,
            })
          }
        })

        let data = {};
        try {
          data = generator.generate()[0]
        } catch (e) {
          console.log(e);
        }
        _cases.push({
          id:_case.id,
          sharer: _case.sharer,
          name: _case.name,
          shareTime: _case.shareTime,
          likeNum: _case.likeNum,
          quoteNum: _case.quoteNum,
          fields: fields,
          data: data,
        })
      })

      return _cases;
    }
  }
}
</script>


