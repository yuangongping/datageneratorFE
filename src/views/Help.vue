
<template>
  <div class="help">
    <div class="header">
        <h3>文档简介</h3>
        <p class='text'>本文档解释了您想要了解的有关模拟数据生成系统的信息：包括功能介绍、常见问题。</p>    
    </div>
<<<<<<< HEAD
    <div class="action">
        <span class="title">功能介绍</span>
        <p>基础组件：该系统提供常见的基础配置功能，包括姓名、性别、省份、城市、身份证、字符串操作、时间等组件。</p>
        <p>快捷配置：在基础组件的基础上，配置了常用的快捷示例，包括完整示例：人口信息表、航班信息表等；拼接字段示例：详细地址、电子邮箱、联系电话等。</p>
        <p>预览：提供预览已选择的字段数据生成样例，默认10条。</p>
        <p>导出：提供数据下载功能，支持自定义数据量（最多支持10万条）、导出文件类型以及自定义文件名。</p>
    </div>
    <div class="detail">
        <span class="title">常见问题</span>
        <li class="questions">如何添加字段？</li>
        <p>直接点击基础组件或快捷配置下的对应字段按钮，即可添加。</p>
        <li class="questions">什么是独立字段？</li>
        <p>独立字段就是生成的字段值与其他任何字段值没有关系，是独立的一列。如性别。</p>
        <li class="questions">什么是值相关？</li>
        <p>值相关就是某字段的值需要根据其他字段的值筛选对应的结果，例如想要生成某个省下的某些市的名字，那么城市字段就需要与省份相关联。</p>
        <li class="questions">唯一按钮的作用？</li>
        <p>唯一按钮默认关闭，打开时表示该字段生成的值不重复。</p>
        <li class="questions">显示按钮的作用？</li>
        <p>显示按钮默认打开，打开时表示在生成结果中显示该字段，反之不显示该字段。某些字段可能只是过渡字段，其他字段需要关联该字段生成数据，而该字段值并不需要，即可关闭该按钮。</p>
        <li class="questions">怎么改变字段顺序？</li>
        <p>点击显示按钮后的上下箭头即可上下移动字段。</p>
        <li class="questions">怎么删除字段？</li>
        <p>点击字段最后面的X箭头即可删除该字段。</p>
        <li class="questions">关联字段应该怎么填？</li>
        <img src="../assets/images/relate.png"  />
        <li class="questions">什么是数字表达式？怎么填写？</li>
        <p>数字表达式就是某些字段的值需要通过数据运算生成时，填写的表达式。</p>
        <p>数字表达式的填写只能是${DATA}或${RELATE}，其中${RELATE}代表的是关联字段的值，${DATA}代表的是本字段的值，运算关系可以任意选择。例如图中数字表达式为Y=X^2， Z=X+Y。</p>
        <img src="../assets/images/express.png" />
=======
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
        <p>提供数据下载功能，支持自定义数据量（最多支持10万条）、导出文件类型以及自定义文件名。</p>
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
        <p>数字表达式即字段的值需通过表达式运算生成时，填写的表达式。</p>
        <p>图中表达式的填写只能是${DATA}或${RELATE}，其中${RELATE}代表关联字段的值，${DATA}代表本字段的值，运算关系可以任意选择。例如图中数字表达式为Y=X^2， Z=X+Y。</p>
        <img src="../assets/images/express.png" alt="" width="90%" style="margin-left:30px;">
        
      </div>
>>>>>>> d1951981ca2a164d3d0207bacf870b6acc9e2bed
    </div>
 </div>

</template>




<style lang="scss">
.help {
  padding: 0 20px;
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
