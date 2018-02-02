<template>
   <div class="hello">
       <h1>{{msg}}</h1>
       <router-link to="/">首页</router-link>
       <router-link to="h1">h1</router-link>
       <router-link to="h2">h2</router-link>
       <router-view class="aaa"></router-view>
   </div>
</template>
<script>
export default {
  name:"hi",
  data () {
      return {
          msg:'这是我做的第一个单页应用'
      }
  }
}
</script>
<style scoped>
    .hello{
        color: red;
    }
</style>

