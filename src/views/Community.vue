<template>
    <div class="community">
      <div class="menu">
        <Menu  mode="horizontal"  @on-select="toSelect" active-name="case" >
          <MenuItem name="case" >
            <Icon type="ios-briefcase" />
            案例
          </MenuItem>
          <MenuItem name="suggestion"  > 
            <Icon type="ios-chatbubbles" />
            意见            
          </MenuItem>
        </Menu>
        <router-view class="router-view"/>  
      </div>

    </div>
</template>
<style lang="scss">

.community{
  display: flex;
  flex-direction: column;
  margin: 0 20px;
  padding: 20px;
  box-shadow: 0 10px 30px 0 rgba(0,0,0,.1);
  

  .router-view {
    padding: 10px 0 0 0;
  }
}

</style>
<script>
import { MenuItem, Menu, Icon } from 'iview';
export default {
  data(){
      return {
        name:"case"
      }
    },
  components: {
    MenuItem,
    Menu,
    Icon
  },
  methods: {
    toSelect(name) {
      this.$router.push(name)
    }
  } 

}
</script>


