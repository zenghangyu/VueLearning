##vuex



**vuex**是一个专门为vue.js设计的集中式**状态**管理架构。状态？我把它理解为在data中的属性需要共享给其他vue组件使用的部分，就叫做状态。简单的说就是**data中需要共用的属性**。比如：我们有几个页面要显示用户名称和用户等级，或者显示用户的地理位置。如果我们不把这些属性设置为状态，那每个页面遇到后，都会到服务器进行查找计算，返回后再显示。在中大型项目中会有很多共用的数据

#### 状态对象赋值给内部对象



**一、通过computed的计算属性直接赋值**

computed属性可以在输出前，对data中的值进行改变，我们就利用这种特性把store.js中的state值赋值给我们模板中的data值。

```
computed:{
    count(){
        return this.$store.state.count;
    }
}
```

这里需要注意的是return this.$    store.state.count这一句，一定要写  this，要不你会找不到$store的。这种写法很好理解，但是写起来是比较麻烦的

**二、通过mapState的对象来赋值**

我们首先要用import引入mapState。

```
import {mapState} from 'vuex';
```

然后还在computed计算属性里写如下代码：

```
computed:mapState({
        count:state=>state.count
 })
```

这里我们使用ES6的箭头函数来给count赋值。

**三、通过mapState的数组来赋值**

```
computed:mapState(["count"])
```

#### Mutations修改状态

**$store.commit( )**

Vuex提供了commit方法来修改状态，我们粘贴出第一节课的代码内容，简单回顾一下，我们在button上的修改方法。

```
<button @click="$store.commit('add')">+</button>
<button @click="$store.commit('reduce')">-</button>
```

store.js文件：

```
const mutations={
    add(state){
        state.count++;
    },
    reduce(state){
        state.count--;
    }
}
```

**传值：**

这只是一个最简单的修改状态的操作，在实际项目中我们常常需要在修改状态时传值。比如上边的例子，是我们每次只加1，而现在我们要通过所传的值进行相加。其实我们只需要在Mutations里再加上一个参数，并在commit的时候传递就就可以了。我们来看具体代码：

```
const mutations={
    add(state,n){
        state.count+=n;
    },
    reduce(state){
        state.count--;
    }
}
```

**模板获取Mutations方法**

实际开发中我们也不喜欢看到$store.commit( )这样的方法出现，我们希望跟调用模板里的方法一样调用。

例如：@click=”reduce”   就和没引用vuex插件一样。

要达到这种写法，只需要简单的两部就可以了：

1.在模板count.vue里用import 引入我们的mapMutations：

```
	import { mapState,mapMutations } from 'vuex';
```

2.在模板的<script>标签里添加methods属性，并加入mapMutations

```
methods:mapMutations([
        'add','reduce'
]),
```

通过上边两部，我们已经可以在模板中直接使用我们的reduce或者add方法了，就像下面这样。

```
<button @click="reduce">-</button>
```

#### getters计算过滤操作

getters从表面是获得的意思，可以把他看作在获取数据之前进行的一种再编辑,相当于**对数据的一个过滤和加工**。你可以把它看作**store.js的计算属性。**

**getters基本用法：**

比如我们现在要对store.js文件中的count进行一个计算属性的操作，就是在它输出前，给它加上100.

我们首先要在store.js里用const声明我们的getters属性。

```
const getters = {
    count:function(state){
        return state.count +=100;
    }
}
```

写好了gettters之后，我们还需要在Vuex.Store()里引入，由于之前我们已经引入了state盒mutations，所以引入里有三个引入属性。代码如下，

```
export default new Vuex.Store({
    state,mutations,getters
})
```

在store.js里的配置算是完成了，我们需要到模板页对computed进行配置。在vue 的构造器里边只能有一个computed属性，如果你写多个，只有最后一个computed属性可用，所以要对上节课写的computed属性进行一个改造。改造时我们使用ES6中的展开运算符”…”。

```
computed:{
    ...mapState(["count"]),
    count(){
        return this.$store.getters.count;
    }
},
```

需要注意的是，你写了这个配置后，在每次count 的值发生变化的时候，都会进行加100的操作。

**用mapGetters简化模板写法：**

我们都知道state和mutations都有map的引用方法把我们模板中的编码进行简化，我们的getters也是有的，我们来看一下代码。

首先用import引入我们的mapGetters

```
import { mapState,mapMutations,mapGetters } from 'vuex';
```

在computed属性中加入mapGetters

```
...mapGetters(["count"])
```

---





#### actions异步修改状态

actions和之前讲的Mutations功能基本一样，不同点是，**actions是异步的改变state状态**，而Mutations是同步改变状态。

**在store.js中声明actions**

actions是可以调用Mutations里的方法的，我们还是继续在上节课的代码基础上进行学习，在actions里调用add和reduce两个方法。

```
const actions ={
    addAction(context){
        context.commit('add',10)
    },
    reduceAction({commit}){
        commit('reduce')
    }
}
```

在actions里写了两个方法addAction和reduceAction，在方法体里，我们都用commit调用了Mutations里边的方法。细心的小伙伴会发现这两个方法传递的参数也不一样。

- context：上下文对象，这里你可以理解称store本身。
- {commit}：直接把commit对象传递过来，可以让方法体逻辑和代码更清晰明了。

**模板中的使用**

我们需要在count.vue模板中编写代码，让actions生效。我们先复制两个以前有的按钮，并改成我们的actions里的方法名，分别是：addAction和reduceAction。

```
<p>
  <button @click="addAction">+</button>
  <button @click="reduceAction">-</button>
</p>
```

改造一下我们的methods方法，首先还是用扩展运算符把mapMutations和mapActions加入`

```
methods:{
    ...mapMutations([  
        'add','reduce'
    ]),
    ...mapActions(['addAction','reduceAction'])
},
```

你还要记得用import把我们的mapActions引入才可以使用。

**增加异步检验**

我们现在看的效果和我们用Mutations作的一模一样，肯定有的小伙伴会好奇，那actions有什么用，我们为了演示actions的异步功能，我们增加一个计时器（setTimeOut）延迟执行。在addAction里使用setTimeOut进行延迟执行。

```
setTimeOut(()=>{context.commit(reduce)},3000);
console.log('我比reduce提前执行');
```

我们可以看到在控制台先打印出了‘我比reduce提前执行’这句话。

#### module模块组

随着项目的复杂性增加，我们共享的状态越来越多，这时候我们就需要把我们状态的各种操作进行一个分组，分组后再进行按组编写。module：状态管理器的模块组操作。

**声明模块组：**

在vuex/store.js中声明模块组，我们还是用我们的const常量的方法声明模块组。代码如下：

```
const moduleA={
    state,mutations,getters,actions
}
```

声明好后，我们需要修改原来 Vuex.Stroe里的值：

```
export default new Vuex.Store({
    modules:{a:moduleA}
})
```

**在模板中使用**

现在我们要在模板中使用count状态，要用插值的形式写入。

```
<h3>{{$store.state.a.count}}</h3>
```

如果想用简单的方法引入，还是要在我们的计算属性中rutrun我们的状态。写法如下：

```
computed:{
    count(){
        return this.$store.state.a.count;
    }
},
```

