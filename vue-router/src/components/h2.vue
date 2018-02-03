<template>
   <div class="hello">
       <h1>{{msg}}</h1>
        <p>{{$route.params.username}}</p>
   </div>
</template>
<script>
export default {
  name:"h2",
  data () {
      return {
          msg:'子页面222222'
      }
  }
}
</script>
<style scoped>
    .hello{
        /* color: red; */
    }
</style>

