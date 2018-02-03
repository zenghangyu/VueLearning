<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div>
        <router-link to="/">首页</router-link>
        <router-link to="/hi">Hi</router-link>
        <router-link :to="{name:'h1',params:{id:123}}">h1</router-link>
        <router-link :to="{name:'h2',params:{username:'zenghy',id:15914205917}}">h2</router-link>
    </div>
   <p>{{ $route.name}}</p>
    <router-view ></router-view>
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
</style>
