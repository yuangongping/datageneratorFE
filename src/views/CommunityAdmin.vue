<template>
    <div class="community">
        <div class="menu">
            <Menu  mode="horizontal"  @on-select="toSelect" active-name="case" >
            <MenuItem name="case_admin" >
                <Icon type="ios-briefcase" />
                案例
            </MenuItem>
            <MenuItem name="suggestion_admin"  > 
                <Icon type="ios-chatbubbles" />
                意见            
            </MenuItem>
            <MenuItem name="visual"  > 
              <Icon type="ios-create" />
              记录            
            </MenuItem>
            </Menu>
            <router-view class="router-view"/>  
        </div> 
    </div> 

</template>
<style lang="scss">

</style>
<script>
import { Icon, MenuItem, Menu } from 'iview';
export default {
  data(){
      return {
        name:"case",
      }
    },
  components: {
    Icon, MenuItem, Menu
  },

  methods: {
    // 切换案例、意见
    toSelect(name) {
      this.$router.push(name)
    }
  } 

}
</script>
