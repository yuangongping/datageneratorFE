<template>
    <div>
        <Table :columns="tableHead" :data="data"></Table>
    </div>
    
</template>
<script>
import { Table } from 'iview';
export default {
    props: {
        tableHead: Array,
        data: Array
    },
    components: {
        Table 
    },
    methods: {
    }
    
}
</script>

