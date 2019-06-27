<template>
    <div>
      <el-col :span=8>
          <div class="block">
            <span class="demonstration">多选选择任意一级选项</span>
            <el-cascader
              :options="options"
              :props="{ multiple: true, checkStrictly: true }"
              clearable>
            </el-cascader>
      </div>
      </el-col>
    
    </div>
   
</template>

<style lang="scss">

</style>

<script>
export default {
  data() {
    return {
        options: [
          {
            value: 'zhinan',
            label: '指南',
          }
        ]

    }
  }
    
}
</script>


