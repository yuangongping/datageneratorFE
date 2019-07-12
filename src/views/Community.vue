<template>
    <div class="community">
        <Modal
            title=""
            v-model="downloadFlag"
            ok-text=''
            cancel-text=''
            :closable="false">
            <img src="./../assets/images/gif.gif" width="100px">
        </Modal>
    </div>
</template>
<style lang="scss">
.community{
  display: flex;
  margin: 2% 16% 2% 16%;
  padding: 20px;
  box-shadow: 0 10px 30px 0 rgba(0,0,0,.1);
  
}
</style>
<script>
import {  Modal } from 'iview';
export default {
    data(){
        return {
            downloadFlag: true,
        }
    },
    components: {
        Modal
    },
    // created() {
    //     this.getData();
    // },
    methods:{
        // getData(){
        //     // 向后端发起请求
        //     const data = ''  
        // }
    },
   
    
}
</script>


