<template>
    <div  class="container">
        <Base />
        
    </div>
</template>
<style lang="scss" scoped>

</style>

<script>
import Base from './Base.vue'
export default {
    components: {
        Base
    },
    methods: {
        test(){
            console.log('父类的方法')
        }
    }
    
}
</script>

