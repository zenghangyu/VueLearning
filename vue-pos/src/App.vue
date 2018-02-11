<template>
  <div id="app">
    <!--左侧导航-->
    
        <leftNav></leftNav>
    
    <!--操作区域-->
    <div class="main">
      <Pos></Pos>
      <!-- <router-view></router-view> -->
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import  leftNav  from '@/components/common/leftNav'
import  Pos  from '@/components/page/Pos'
export default {
  name: 'App',
  components:{
    leftNav,
    Pos
  }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
.main{
  float:left;
  width:95%; 
  background-color: #EFF2F7;
  height:100%;
  overflow: auto;
  padding-left: 20px;
  box-sizing: border-box;
}
</style>
