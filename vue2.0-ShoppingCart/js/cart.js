var vm = new Vue({
    el: "#app",
    data: {
        cart: ''
    },
    filters: {

    },
    mounted: function() {
        this.cartView();
    },
    methods: {
        cartView: function() {
            this.$http.get('./data/cartData.json', { 'id': 123 }).then(function(res) {

            })
        }
    }
})