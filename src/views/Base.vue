<template>
    <div class="container">
        <div class="baseComponent">
            <span>基础组件</span>
        </div>
        <!-- <Select v-model="dataTypeToAdd">
            <Option :value="dataType" v-for="dataType in Object.keys(DATA_TYPES)" :key=dataType> {{ DATA_TYPES[dataType].alias }} </Option>
        </Select> -->
    </div>
    
</template>
<style lang="scss" scoped>
.container {
    background: #fff;
    box-shadow: 0 1px 4px rgba(48,128,254,.1);
}
.baseComponent{
    border: 1px solid snow;
}
</style>

<script>
// 导入所有已经注册的组件
// import { SexConfig, NameConfig, CounterConfig,
//          NumberConfig, IdentificationNumberConfig, Str2NumberConfig,
//          StrSpliceConfig, StringSegmenteConfig ,RandomChoiceConfig,
//          TextConfig, TimeConfig,  ProvinceConfig, 
//          CityConfig, DistrictConfig, DistrictCodeConfig } from '@/components/datatypesconfig/index.js';

import { DATA_TYPES } from '@/datatypes/index.js';

export default {
    data(){
        return {

        }
    },
    mounted() {
    },
    methods: {
    
    }
    
}
</script>

