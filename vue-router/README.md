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
