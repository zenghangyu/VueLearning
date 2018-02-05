<template>
   <div>
        <h2>{{ msg }}</h2>
        <p>新闻ID：{{ $route.params.newsId}}</p>
        <p>新闻标题：{{ $route.params.newsTitle}}</p>
        <p><button @click="goback">后退</button></p>
    </div>
</template>
<script>
export default {
    name:'params',
    data () {
        return {
            msg: 'params page'
        }
    },
   beforeRouteEnter: (to, from, next) => {
        console.log('打开模板');
        // next({path:'/'}); //相当于下一步的开关  也可以修改跳转路径
        next();
    },
    beforeRouteLeave: (to, from, next) => {
        console.log('离开模板');
        next(); //相当于下一步的开关  也可以修改跳转路径
    },
    methods:{
        goback(){
        this.$router.go(-1);
        }
    }
}
</script>

