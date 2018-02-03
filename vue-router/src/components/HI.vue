<template>
   <div class="hello">
       <h1>{{msg}}</h1>
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

