
<template>
  <div class="help">
    <div class="header">
        <h3>文档简介</h3>
        <p class='text'>本文档解释了您想要了解的有关模拟数据生成系统的信息：包括功能介绍、常见问题。</p>    
    </div>
    <div class="body">
      <div class="left">
        <h6>功能介绍</h6>
        <p class="questions"> 基础配置</p>
        <p>该系统提供常见的基础配置功能，包括姓名、性别、省份、城市、身份证、字符串操作、时间等组件。</p>
        <p class="questions"> 快捷配置</p>
        <p>在基础组件的基础上，配置了常用的快捷示例，包括完整示例：人口信息表、航班信息表等；拼接字段示例：详细地址、QQ邮箱等。</p>
        <p class="questions"> 预览</p>
        <p>提供预览已选择的字段数据生成样例，默认10条。</p>
        <p class="questions"> 导出</p>
        <p>提供数据下载功能，支持自定义数据量、导出文件类型以及自定义文件名。</p>
        <br>
        <p>注：该系统对下载数据量没有明确要求,为保证用户更好的体验，建议分批次下载数据,单次下载量不超过10万条！</p>
        <router-link to="/responsibility">
          免责申明
        </router-link>
      </div>
      <div class="right">
        <h6>常见问题</h6>
        <li class="questions">独立字段与值相关含义？</li>
        <p>答：独立字段是生成的字段值与其他任何字段值没有关系，如性别；</p>
        <p>&emsp;&emsp;值相关是某字段的值需要根据其他字段的值筛选对应的结果，例如想要生成某个省下的某些市的名字，那么城市字段就需要与省份相关联。</p>

        <li class="questions">唯一、显示按钮的作用？</li>
        <p>答：唯一表示该字段生成的值不重复；&emsp;显示按钮控制生成结果是否显示该字段。如过渡字段，不需显示其值，则可关闭。</p>
           <li class="questions">如何添加字段？</li>
        <p>答：直接点击基础配置或快捷配置下的对应字段按钮，即可添加。</p>

        <li class="questions">什么是数字表达式？怎么填写？</li>
        <p>数字表达式即字段的值需通过表达式运算生成时，填写的表达式。例如年龄计算为2019减去出生年龄, 出生年龄为关联字段, 则年龄的数字表达式为2019-${RELATE}</p>
        <p>例如图中数字表达式为Y=X^2， Z=X+Y。${RELATE}代表关联字段的值，${DATA}代表本字段的值，运算关系可以任意选择。</p>
        <img src="../assets/images/express.png" alt="" width="90%" style="margin-left:30px;">
        
      </div>
    </div>
 </div>

</template>



<style lang="scss">
.help {
  line-height: 30px;
  font-size: 15px;
}

.header{
  h3{
    display: block;
    color: rgba(0,0,0,.8);
    line-height: 38px;
    text-align: center;
    font-weight: 700;
    font-size: 20px;
    margin: 0 0 20px;
  }
  p{
    display: block;
    text-align: center;
    font-weight: 400;
    color: rgba(0,0,0,.6);
    font-size: 14px;
    line-height: 10px;
  }

}
.body{
  padding: 80px 0;
  margin: 0 auto;
  display: flex;
  margin: 30px 60px 30px 60px;
  padding: 20px;
  box-shadow: 0 10px 30px 0 rgba(0,0,0,.1);
  .left{
    width: 30%;
    padding-right: 20px;
    border-right: 1px solid #f0f0f0;
    .responsibility{
      display: inline-block;
      margin-top: 20px;
    }
  }
  .right{
    padding-left: 100px;
  }
  h6{
    margin: 0 0 15px;
    color: rgba(0,0,0,.8);
    font-weight: 700;
    font-size: 18px;
    text-transform: uppercase;
  }
  p{
    text-indent:35px;
  }
}
.questions {
  font-size: 15px;
  font-weight: 700;
  color: #ee1414;
  text-indent:20px
}
</style>
