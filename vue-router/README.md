# vue-router

> A Vue.js project

> 什么是vue-router

```
由于Vue在开发时对路由支持的不足，后来官方补充了vue-router插件，它在Vue的生态环境中非常重要，在实际开发中只要编写一个页面就会操作vue-router。要学习vue-router就要先知道这里的路由是什么？这里的路由并不是指我们平时所说的硬件路由器，这里的路由就是SPA（单页应用）的路径管理器。再通俗的说，vue-router就是我们WebApp的链接路径管理系统。

```

#### 安装vue-router

---

```	
npm install vue-router --save-dev
```

如果你在使用之前安装了vue-cii脚手架的话，可以在安装脚手架过程中 **vue init webpack yourProject ** 会询问你是否需要安装vue-router

#### 解读router/index.js文件

---

我们用vue-cli生产了我们的项目结构，你可以在src/router/index.js文件，这个文件就是路由的核心文件

```
import Vue from 'vue'   //引入Vue
import Router from 'vue-router'  //引入vue-router
import Hello from '@/components/Hello'  //引入根目录下的Hello.vue组件

Vue.use(Router)  //Vue全局使用Router

export default new Router({
  routes: [              //配置路由，这里是个数组
    {                    //每一个链接都是一个对象
      path: '/',         //链接路径
      name: 'Hello',     //路由名称，
      component: Hello   //对应的组件模板
    }
  ]
})
```

#### router-link制作导航

---

现在通过在地址栏改变字符串地址，已经可以实现页面内容的变化了。这并不满足需求，我们需要的是在页面上有个像样的导航链接，我们只要点击就可以实现页面内容的变化。制作链接需要<router-link>标签，我们先来看一下它的语法。

```
router-link to="/">[显示字段]</router-link>
```

- **to：**是我们的导航路径，要填写的是你在router/index.js文件里配置的path值，如果要导航到默认首页，只需要写成  to=”/”  ，
- **[显示字段] ：**就是我们要显示给用户的导航名称，比如首页  新闻页。

#### vue-router配置子路由

---

主页面加入<router-view>标签，给子模板提供插入位置，在Index.js下注册子路径

```
export default new Router({
  routes: [             
    {                    
      path: '/',        
      name: 'Hello',     
      component: Hello   
    },{
      path:'/hi',
      component:Hi,
      children:[
        {path:'/',component:Hi},
        {path:'hi1',component:Hi1},
        {path:'hi2',component:Hi2},
      ]
    }
  ]
})
```

#### vue-router如何参数传递

___

> 一、用name传递参数

在路由文件src/router/index.js里配置name属性。

```
routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    }
 ]
```

模板里(src/App.vue)用**$route.name**的形势接收，比如直接在模板中显示：

```
<p>{{ $route.name}}</p>
```

> 二、通过<router-link> 标签中的to传参

也许你也会觉的上边的传参很不正规，也不方便，其实我们多数传参是不用name进行传参的，我们用<router-link>标签中的to属性进行传参，需要您注意的是这里的to要进行一个绑定，写成:to。先来看一下这种传参方法的基本语法：

```
<router-link :to="{name:xxx,params:{key:value}}">valueString</router-link>
```



这里的to前边是带冒号的，然后后边跟的是一个对象形势的字符串.

- name：就是我们在路由配置文件中起的name值。
- params：就是我们要传的参数，它也是对象形势，在对象里可以传递多个值。

路由文件index.js需要配置如下

```
 {path:'/hi1',name:'hi1',component:Hi1},
```

最后在跳转目标文件接收形式如下

```
{{$route.params.username}}
```





#### 单页面多路由区域操作

---

实际需求是这样的，在一个页面里我们有2个以上<router-view>区域，我们通过配置路由的js文件，来操作这些区域的内容。例如我们在src/App.vue里加上两个<router-view>标签。我们用vue-cli建立了新的项目，并打开了src目录下的App.vue文件，在<router-view>下面新写了两行<router-view>标签,并加入了些CSS样式。

```
<router-view ></router-view>
<router-view name="left" style="float:left;width:50%;background-color:#ccc;height:300px;"></router-view>
<router-view name="right" style="float:right;width:50%;background-color:#c0c;height:300px;"></router-view>
```

现在的页面中有了三个<router-view>标签，也就是说我们需要在路由里配置这三个区域，配置主要是在components字段里进行。

```
	 path: '/Hi',
      components: {
        default:Hello,
        left:Hi2,
        right:Hi1
      }
```

最后在App.vue中配置我们的<router-link>就可以了

```
<router-link to="/">首页</router-link> | 
<router-link to="/hi">Hi页面</router-link> |
```

#### vue-router 利用url传递参数

---

在实际开发也是有很多用URL传值的需求，比如我们在新闻列表中有很多新闻标题整齐的排列，我们需要点击每个新闻标题打开不同的新闻内容，这时在跳转路由时跟上新闻编号就十分实用。

> :冒号的形式传递参数

1.在配置文件里以冒号的形式设置参数。我们在/src/router/index.js文件里配置路由。

```
{
    path:'/params/:newsId/:newsTitle',
     component:Params
}
```

2.在src/components目录下建立我们params.vue组件，也可以说是页面。我们在页面里输出了url传递的的新闻ID和新闻标题。

```
 <p>新闻ID：{{ $route.params.newsId}}</p>
 <p>新闻标题：{{ $route.params.newsTitle}}</p>
```

3.在App.vue文件里加入我们的<router-view>标签。这时候我们可以直接利用url传值了。

```
<router-link to="/params/198/jspang website is very good">params</router-link> |
```



#### 正则表达式在URL传值中的应用

---

上边的例子，我们传递了新闻编号，现在需求升级了，我们希望我们传递的新闻ID只能是数字的形式，这时候我们就需要在传递时有个基本的类型判断，vue是支持正则的。

加入正则需要在路由配置文件里（/src/router/index.js）以圆括号的形式加入。

```
path:'/params/:newsId(\\d+)/:newsTitle',
```

加入了正则，我们再传递数字之外的其他参数，params.vue组件就没有办法接收到。



#### vue-router 的重定向-redirect

---

开发中有时候我们虽然设置的路径不一致，但是我们希望跳转到同一个页面，或者说是打开同一个组件。这时候我们就用到了路由的重新定向redirect参数。

**redirect基本重定向**

我们只要在路由配置文件中（/src/router/index.js）把原来的component换成redirect参数就可以了。我们来看一个简单的配置。

```
export default new Router({
  routes: [
    {
      path: '/',
      component: Hello
    },{
      path:'/params/:newsId(\\d+)/:newsTitle',
      component:Params
    },{
      path:'/goback',
      redirect:'/'
    }

  ]
})
```

这里我们设置了goback路由，但是它并没有配置任何component（组件），而是直接redirect到path:’/’下了，这就是一个简单的重新定向。

**重定向时传递参数**

我们已经学会了通过url来传递参数，那我们重定向时如果也需要传递参数怎么办？其实vue也已经为我们设置好了，我们只需要在ridirect后边的参数里复制重定向路径的path参数就可以了。可能你看的有点晕，我们来看一段代码：

```
{
  path:'/params/:newsId(\\d+)/:newsTitle',
  component:Params
},{
  path:'/goParams/:newsId(\\d+)/:newsTitle',
  redirect:'/params/:newsId(\\d+)/:newsTitle'
}
```

已经有了一个params路由配置，我们在设置一个goParams的路由重定向，并传递了参数。这时候我们的路由参数就可以传递给params.vue组件了。参数接收方法和正常的路由接收方法一样。





#### alias别名的使用

---

使用alias别名的形式，我们也可以实现类似重定向的效果。



1.首先我们在路由配置文件里（/src/router/index.js），给上节课的Home路径起一个别名，xxx。

```
{
    path: '/hi1',
    component: Hi1,
    alias:'/xxx'
 }
```

2.配置我们的<router-link>，起过别名之后，可以直接使用<router-link>标签里的to属性，进行重新定向。

```
<router-link to="/xxx">xxx</router-link>
```

### redirect和alias的区别

- redirect：仔细观察URL，redirect是直接改变了url的值，把url变成了真实的path路径。
- alias：URL路径没有别改变，这种情况更友好，让用户知道自己访问的路径，只是改变了<router-view>中的内容。



#### 路由的过渡动画

---

**<transition>标签**

想让路由有过渡动画，需要在<router-view>标签的外部添加<transition>标签，标签还需要一个name属性。

```
<transition name="fade">
  <router-view ></router-view>
</transition>
```

**css过渡类名：**

组件过渡过程中，会有四个CSS类名进行切换，这四个类名与transition的name属性有关，比如name=”fade”,会有如下四个CSS类名：

1. fade-enter:进入过渡的开始状态，元素被插入时生效，只应用一帧后立刻删除。
2. fade-enter-active:进入过渡的结束状态，元素被插入时就生效，在过渡过程完成后移除。
3. fade-leave:离开过渡的开始状态，元素被删除时触发，只应用一帧后立刻删除。
4. fade-leave-active:离开过渡的结束状态，元素被删除时生效，离开过渡完成后被删除。

从上面四个类名可以看出，fade-enter-active和fade-leave-active在整个进入或离开过程中都有效，所以CSS的transition属性在这两个类下进行设置。

那我们就在App.vue页面里加入四种CSS样式效果，并利用CSS3的transition属性控制动画的具体效果。代码如下：

```
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
```



上边的代码设置了改变透明度的动画过渡效果，但是默认的mode模式in-out模式，这并不是我们想要的。下面我们学一下mode模式。

**过渡模式mode：**

- in-out:新元素先进入过渡，完成之后当前元素过渡离开。
- out-in:当前元素先进行过渡离开，离开完成后新元素过渡进入。




#### mode的设置和404页面的处理

---

 **mode的两个值**

1. histroy:当你使用 history 模式时，URL 就像正常的 url，例如 http://jsapng.com/lms/，也好看！
2. hash:默认’hash’值，但是hash看起来就像无意义的字符排列，不太好看也不符合我们一般的网址浏览习惯。

**404页面的设置：**

用户会经常输错页面，当用户输错页面时，我们希望给他一个友好的提示，为此美工都会设计一个漂亮的页面，这个页面就是我们常说的404页面。vue-router也为我们提供了这样的机制.

1.设置我们的路由配置文件（/src/router/index.js）：

```
{
   path:'*',
   component:Error
}
```

这里的path:’*’就是找不到页面时的配置，component是我们新建的一个Error.vue的文件。

2.新建404页面：

在/src/components/文件夹下新建一个Error.vue的文件。简单输入一些有关错误页面的内容。

```
<template>
    <div>
        <h2>{{ msg }}</h2>
    </div>
</template>
<script>
export default {
  data () {
    return {
      msg: 'Error:404'
    }
  }
}
</script>
```

3.我们在用<router-link>瞎写一个标签的路径。

```
 <router-link to="/bbbbbb">我是瞎写的</router-link> |
```



#### 路由中的钩子

组件从进入到销毁有很多的钩子函数，同样在路由中也设置了钩子函数。路由的钩子选项可以写在路由配置文件中，也可以写在我们的组件模板中。

**路由配置文件中的钩子函数**

我们可以直接在路由配置文件（/src/router/index.js）中写钩子函数。但是在路由文件中我们只能写一个beforeEnter,就是在进入此路由配置时。先来看一段具体的代码：

```
{
      path:'/params/:newsId(\\d+)/:newsTitle',
      component:Params,
      beforeEnter:(to,from,next)=>{
        console.log('我进入了params模板');
        console.log(to);
        console.log(from);
        next();
},
```

我们在params路由里配置了bdforeEnter得钩子函数，函数我们采用了ES6的箭头函数，需要传递三个参数。我们并在箭头函数中打印了to和from函数。具体打印内容可以在控制台查看object。

**写在模板中的钩子函数**

在配置文件中的钩子函数，只有一个钩子-beforeEnter，如果我们写在模板中就可以有两个钩子函数可以使用：

- beforeRouteEnter：在路由进入前的钩子函数。
- beforeRouteLeave：在路由离开前的钩子函数。

```
export default {
  name: 'params',
  data () {
    return {
      msg: 'params page'
    }
  },
  beforeRouteEnter:(to,from,next)=>{
    console.log("准备进入路由模板");
    next();
  },
  beforeRouteLeave: (to, from, next) => {
    console.log("准备离开路由模板");
    next();
  }
}
</script>
```

这是我们写在params.vue模板里的路由钩子函数。它可以监控到路由的进入和路由的离开，也可以轻易的读出to和from的值。














## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
