var vm = new Vue({
    el: "#app",
    data: {
        cart: '',
        cartList: '',
        checkFlag: false,
        totalPrice: 0
    },

    /*
        过滤器函数总接收表达式的值 (之前的操作链的结果) 作为第一个参数。在上述例子中，capitalize 过滤器函数将会收到 message 的值作为第一个参数。
    **/
    filters: {
        formMoney: function(value) {
            return '$  ' + value.toFixed(2);
        }
    },
    mounted: function() {
        this.$nextTick(function() {
            vm.cartView();
        });
    },
    methods: {
        cartView: function() {
            var _this = this;
            this.$http.get('./data/cartData.json', { 'id': 123 }).then(function(res) {
                console.log(res.data.result);
                _this.cartList = res.data.result.list
            })
        },
        changeprice: function(value, way) {
            if (way > 0) {
                value.productQuantity++;
            } else {
                value.productQuantity <= 2 ? value.productQuantity = 1 : value.productQuantity--;

            }
        },
        selectProduct: function(item) {
            if (typeof item.checked == 'undefined') {
                this.$set(item, 'checked', true);
            } else {
                item.checked = !item.checked
            }
            this.calcTotalPrice();
        },
        checkAll: function(flag) {
            if (flag) {
                this.checkFlag = !this.checkFlag;
                var _this = this;
                this.cartList.forEach(function(item, index) {
                    if (typeof item.checked == 'undefined') {
                        _this.$set(item, 'checked', _this.checkFlag);
                    } else {
                        item.checked = _this.checkFlag;
                    }
                })
            } else {
                var _this = this;
                this.cartList.forEach(function(item, index) {
                    _this.$set(item, 'checked', false);
                    _this.checkFlag = false;

                })
            }
            this.calcTotalPrice();

        },
        calcTotalPrice: function() {
            var _this = this;
            this.totalPrice = 0;
            this.cartList.forEach(function(item, index) {
                if (item.checked) {
                    _this.totalPrice += item.productPrice * item.productQuantity;
                }
            })
        }
    }
})
Vue.filter('money', function(value, type) {
    return '$  ' + value.toFixed(2) + type;
})