<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div>
        <router-link to="/">首页</router-link>
        <router-link to="/Hi">Hi</router-link>
        <router-link to="/gohome">gohome</router-link>
        <router-link to="/alias">alias</router-link>
        <router-link to="/zenghy">zenghyalias</router-link>
        <router-link to="/params/198/zenghy website is very good">params</router-link> |
        <router-link to="/goparams/200/这是经过重定向传递过来的参数">goparams</router-link> |
        <router-link :to="{name:'h1',params:{id:123}}">h1</router-link>
        <router-link :to="{name:'h2',params:{username:'zenghy',id:15914205917}}">h2</router-link>
    </div>
   <!-- <p>{{ $route.name}}</p> -->
    <transition name="fade" mode="out-in">
    <router-view ></router-view>
  </transition>
    <router-view name='left ' style="float:left;background:red;width:300px;"></router-view>
    <router-view name='right ' style="float:left;background:blue;width:300px;"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.fade-enter {
  opacity:0;
}
.fade-leave{
  opacity:1;
}
.fade-enter-active{
  transition:opacity .5s;
}
.fade-leave-active{
  opacity:0;
  transition:opacity .5s;
}
</style>
