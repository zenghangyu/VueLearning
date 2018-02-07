<template>
    <div>
        <h2>{{msg}}</h2>
        <hr/>
        <h3>{{$store.state.count}}</h3>
        <p>{{count}}</p>
        <div>
            <button @click="add(4)">+</button>
            <button @click="reduce">-</button>
        </div>
    </div>
</template>
<script>
    import store from '@/vuex/store';
    import { mapState , mapMutations } from 'vuex'
    export default{
        data(){
            return{
                msg:'Hello Vuex',

            }
        },
        store
        ,
       computed:mapState(["count"])
        // mapState({
        //         count:state=>state.count
        // })
        // {
        //     count(){
        //         return '这是第一种方法将状态对象赋值给内部对象:'+this.$store.state.count;
        //     },
           
        // }
        ,
        methods:mapMutations([
            'add','reduce'
        ])
    }
</script>