<template>
   <div class="hello">
       <h1>{{msg}}</h1>
       <p>{{$route.params.id}}</p>
       
   </div>
</template>
<script>
export default {
  name:"hi",
  data () {
      return {
          msg:'子页面11111'
      }
  }
}
</script>
<style scoped>
    .hello{
        color: red;
    }
</style>

