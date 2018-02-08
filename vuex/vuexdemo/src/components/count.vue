<template>
    <div>
        <h2>{{msg}}</h2>
        <hr/>
        <h3>{{$store.state.moduleA.count}}</h3>
        <!-- <p>{{moduleA.count}}</p> -->
        <!-- <div>
            <button @click="add(1)">+</button>
            <button @click="reduce">-</button>
        </div> -->
        <!-- <p>
            <button @click="addAction">+</button>
            <button @click="reduceAction">-</button>
        </p> -->
    </div>
</template>
<script>
    import store from '@/vuex/store';
    import { mapState , mapMutations , mapGetters , mapActions  } from 'vuex'
    export default{
        data(){
            return{
                msg:'Hello Vuex',

            }
        },
        store
        ,
       computed:{
        //    ...mapState(["count"]),
        //    ...mapGetters(["count"])
        //    count(){
        //         return this.$store.getters.count;
        //     }
            
            count(){
                return '这是第一种方法将状态对象赋值给内部对象:'+this.$store.state.moduleA.count;
            }
        }
        // mapState({
        //         count:state=>state.count
        // })
        // {
            
           
        // }
        ,
        // methods:{
        //     ...mapMutations([
        //     'add','reduce'
        //     ]),
        //    ...mapActions(['addAction','reduceAction'])
        // }
    }
</script>