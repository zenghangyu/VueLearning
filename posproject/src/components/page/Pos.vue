
<template>
  <div class="pos">
    <div>
        <el-row >
            <el-col :span='7' style="height:100%">
              <el-tabs style="width: 100%"  >
                    <el-tab-pane label="点餐" >
                        <el-table :data="tableData" border style="width: 100%" >
                            <el-table-column prop="goodsName" label="商品"  ></el-table-column>
                            <el-table-column prop="count" label="量" width="50"></el-table-column>
                            <el-table-column prop="price" label="金额" width="70"></el-table-column>
                            <el-table-column  label="操作" width="100" fixed="right">
                                <template scope="scope">
                                    <el-button type="text" size="small" @click="delSingleGoods(scope.row)">删除</el-button>
                                    <el-button type="text" size="small"  @click="addOrderList(scope.row)">增加</el-button>
                                </template>
                            </el-table-column>
                      </el-table>
                        <div><small>总数：{{totalCount}}</small> <small>总价：￥{{totalMoney}}元</small></div>
                      <div class="div-btn">
                        <el-button type="warning" >挂单</el-button>
                        <el-button type="danger" @click="delAllGoods" >删除</el-button>
                        <el-button type="success" @click="checkout" >结账</el-button>
                      </div>
                    </el-tab-pane>
                    <el-tab-pane label="挂单">
                    挂单
                    </el-tab-pane>
                    <el-tab-pane label="外卖">
                    外卖
                  </el-tab-pane>
              </el-tabs>
            </el-col>
            <!--商品展示-->
            <el-col :span="17">
                 <div class="title">常用商品</div>
                <div class="often-goods-list">
                    <ul class="cookList">
                        <li v-for="goods in oftenGoods" @click="addOrderList(goods)">
                            <!-- <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span> -->
                            <span class="foodName">{{goods.goodsName}}</span>
                            <p class="foodPrice">￥{{goods.price}}元</p>
                        </li>
                    </ul>
                </div>
              <div class="goods-type">
                  
                  <el-tabs>
                      <el-tab-pane label="汉堡">
                           <div class="often-goods">
                            
                              <div class="often-goods-list">
                                  <ul class="cookList">
                                    <li v-for="goods in type0Goods" @click="addOrderList(goods)"> 
                                        <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                                        <span class="foodName">{{goods.goodsName}}</span>
                                        <p class="foodPrice">￥{{goods.price}}元</p>
                                    </li>
                                  </ul>
                              </div>
                          </div>
                      </el-tab-pane>
                    <el-tab-pane label="小食">
                        <ul class="cookList">
                            <li v-for="goods in type1Goods" @click="addOrderList(goods)">
                                <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                                <span class="foodName">{{goods.goodsName}}</span>
                                <p class="foodPrice">￥{{goods.price}}元</p>
                            </li>
                        </ul>
                    </el-tab-pane>
                      <el-tab-pane label="饮料">
                            <ul class="cookList">
                                <li v-for="goods in type2Goods" @click="addOrderList(goods)">
                                    <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                                    <span class="foodName">{{goods.goodsName}}</span>
                                    <p class="foodPrice">￥{{goods.price}}元</p>
                                </li>
                            </ul>
                      </el-tab-pane>
                      <el-tab-pane label="套餐">
                          <ul class = "cookList">
                                <li v-for="goods in type3Goods" @click="addOrderList(goods)">
                                    <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                                    <span class="foodName">{{goods.goodsName}}</span>
                                    <p class="foodPrice">￥{{goods.price}}元</p>
                                </li>
                            </ul>
                      </el-tab-pane>

                  </el-tabs>
              </div>
            </el-col>
        </el-row>
    </div>
  </div>

  
</template>
 
<script>
import axios from 'axios'
export default {
  name: 'Pos',
  data () {
    return { 
        tableData: [],
       oftenGoods:{},
       type0Goods:{},
       type1Goods:{},
       type2Goods:{},
       type3Goods:{},
       loadingFlag:false,
       totalCount:0,
       totalMoney:0
    }
  },    
  beforeCreate(){
         

  },
  created:function(){
       const loading = this.$loading({
                lock: true,
                text: '加载中',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)',
                target: document.querySelector('body')
            });
      axios.get('http://jspang.com/DemoApi/oftenGoods.php')
      .then(response=>{
         console.log(response);
         this.oftenGoods=response.data;
      })
      .catch(error=>{
          console.log(error);
          alert('网络错误，不能访问');
      })
        //读取分类商品列表
      axios.get('http://jspang.com/DemoApi/typeGoods.php')
      .then(response=>{
         console.log(response);
         //this.oftenGoods=response.data;
         this.type0Goods=response.data[0];
         this.type1Goods=response.data[1];
         this.type2Goods=response.data[2];
         this.type3Goods=response.data[3];

      })
      .catch(error=>{
          console.log(error);
          alert('网络错误，不能访问');
      })
        loading.close();
  },
    mounted:function(){
            var orderHeight=document.body.clientHeight;
            document.getElementById("order-list").style.height=orderHeight+'px';
    },
    updated(){
    },
    methods:{
        addOrderList(goods){
            //商品是否存在订单列表
            let isHave=false;
            for(let i =0;i<this.tableData.length;i++){
                if(this.tableData[i].goodsId==goods.goodsId){
                    isHave=true;
                }
            }
            //根据判断的值编写业务逻辑
            if(isHave){
                // 改变列表中商品数量
                let arr = this.tableData.filter(o => o.goodsId==goods.goodsId)
                arr[0].count++;
            }else{
                let newGoods={
                    goodsId:goods.goodsId,
                    goodsName:goods.goodsName,
                    price:goods.price,
                    count:1
                };
                this.tableData.push(newGoods);
            }
           this.getAllMoney();
        },

        //删除单个商品
        delSingleGoods(goods){
            console.log(goods);
            this.tableData=this.tableData.filter(o => o.goodsId !=goods.goodsId);
            this.getAllMoney();

        },
        //汇总数量和金额
        getAllMoney(){
            this.totalCount=0;
            this.totalMoney=0;
            if(this.tableData){
                    this.tableData.forEach((element) => {
                this.totalCount+=element.count;
                this.totalMoney=this.totalMoney+(element.price*element.count);   
            });
            }
            
        },
        //删除所有商品
        delAllGoods() {
            this.tableData = [];
            this.totalCount = 0;
            this.totalMoney = 0;
        },
        // 结账
        checkout() {
            if (this.totalCount!=0) {
                this.tableData = [];
                this.totalCount = 0;
                this.totalMoney = 0;
                this.$message({
                    message: '结账成功，感谢你又为店里出了一份力!',
                    type: 'success'
                });

            }else{
                this.$message.error('不能空结。老板了解你急切的心情！');
            }

        }
    }
    
  
}
</script>
<style scoped>
    *{
        font-family: '微软雅黑';
    }
  .div-btn{
    margin: 10px auto;
  }
  ul li{
    list-style: none;
  }
 .title{
       height: 20px;
       border-bottom:1px solid #D3DCE6;
       background-color: #F9FAFC;
       padding:10px;
   }
   .often-goods-list ul li{
      list-style: none;
      float:left;
      border:1px solid #E5E9F2;
      padding:10px;
      margin:5px;
      background-color:#fff;
   }
  .o-price{
      color:#58B7FF; 
   }
   .cookList{
       
    overflow:  hidden;

   }
   .cookList li{
       list-style: none;
       width:30%;
       border:1px solid #E5E9F2;
       height: auot;
       overflow: hidden;
       background-color:#fff;
       padding: 2px;
       float:left;
       margin: 2px;
      cursor: pointer;
   }
   .cookList li span{
       
        display: block;
        float:left;
   }
   .foodImg{
       width: 40%;
   }
   .foodName{
       font-size: 14px;
       padding-left: 10px;
       color:brown;

   }
   .foodPrice{
       font-size: 12px;
       padding-left: 10px;
       padding-top:10px;
       text-align: left;
       text-indent: 1em;
   }
</style>
