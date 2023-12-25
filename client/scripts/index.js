import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.7.8/dist/vue.esm.browser.js'

const app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        data: [],
        data_keys:[],
        cart_items: [],
        cart_counter: 0,
        cart_sum: 0,
        showAllItems: false,
        isModalVisible: false,
    },
    methods: {
        async getMenu(){
            await axios
                .get('/api/getMenu')
                .then(response => {
                    console.log(response.data)
                    this.data = response.data
                    Object.keys(this.data).forEach(key => {
                        this.data_keys.push(key)
                    })
                })
        },
        addToCart(item){
            this.cart_items.push(item)
            this.cart_counter++
            this.cart_sum = Number(this.cart_sum) + Number(item.цена)
        },
        delFromCart(item){
            console.log(this.cart_items)
            this.cart_counter--
            this.cart_sum = Number(this.cart_sum) - Number(item.цена)
            this.cart_items.splice(this.cart_items.indexOf(item), 1)
        },
        toggleShowAllItems() {
            this.showAllItems = !this.showAllItems;
        },
        pay(){
            this.showModalWindowPay()
            //this.cart_items = []
            //this.cart_counter = 0
            //this.cart_sum = 0
        },
        showModalWindowPay(){
            this.isModalVisible = true
        },
        payAccept() {
            // Логика подтверждения оплаты
            this.cart_items = []
            this.cart_counter = 0
            this.cart_sum = 0
            alert('Оплата подтверждена!');
            this.isModalVisible = false
          }
    },
    mounted() {
        this.getMenu()
    }
})