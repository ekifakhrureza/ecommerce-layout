Vue.use(VeeValidate);
$(document).on('click.bs.dropdown.data-api', '.dropdown-menu', function (e) {
    e.stopPropagation();
});
const instance = axios.create({
    baseURL: 'http://localhost:3000',
    headers: { 'token': localStorage.getItem('token') }
});

new Vue({
    el: '#app',
    data: {
        carts: [],
        totalQty: 0,
        errormessage: '',
        checkToken: localStorage.getItem('token'),
        email: '',
        password: '',
        products: [],
        checkTokenName: localStorage.getItem('name'),
        checkTokenUser: localStorage.getItem('username'),
    },
    methods: {
        addChart(product) {

            var counter = 0
            this.carts.forEach(element => {


                if (element.id === product._id) {
                    counter++
                    element.qty = element.qty + 1
                    element.price += element.price
                }

            });
            if (counter === 0) {
                let obj = {}
                obj.id = product._id
                obj.name = product.name
                obj.price = product.price
                obj.qty = 1

                this.carts.push(obj)
            }

            this.totalQty += 1

        },
        addQty(cart) {
            this.carts.forEach(element => {
                this.products.forEach(dataPrd => {
                    if (cart.id === element.id) {
                        if (element.id === dataPrd._id) {
                            element.qty = element.qty + 1
                            element.price += dataPrd.price
                            this.totalQty++
                        }
                    }


                });


            });
        },
        minQty(cart) {
            this.carts.forEach(element => {

                this.products.forEach(dataPrd => {
                    if (cart.id === element.id) {
                        if (element.id === dataPrd._id && cart.qty > 1) {
                            element.qty = element.qty - 1
                            element.price -= dataPrd.price
                            this.totalQty--
                        }
                    }

                });

            });
        },
        removeCart(cart) {
            var getIndex = 0
            this.carts.forEach(element => {
                if (cart.id === element.id) {

                    this.carts.splice(getIndex, 1)
                    this.totalQty = this.totalQty - cart.qty
                }
                getIndex++

            });
        },

        logout() {
            localStorage.removeItem('id');
            localStorage.removeItem('token');
            localStorage.removeItem('name')
            window.location.href = 'index.html'
            this.checkToken = null

        },

        buyproduct() {

            axios.post('http://localhost:3000/products/add', {
                name: 'a',
                price: 10
            })
                .then((data) => {
   
                })
                .catch(err => {
                    console.log('assssdddda');
                })
        },

        remove(id) {
            let confirmation = confirm(`Are you sure delete this product?`)
            if (confirmation) {
                instance.delete(`/products/delete/${id}`, {

                })
                    .then((response) => {
                        let productlist = this.products.filter(list=>
                            list._id !=`${id}`      
                        )
                        this.products = productlist
       
                    })
            }
        },
        register() {
            let email = this.email
            let name = this.name
            let password = this.password
            axios.post('http://localhost:3000/users/register', {
                email: email,
                name: name,
                password: password

            })
                .then((data) => {
                    
                    if (data.status === 202) {

                        alert('Email Already Exist')
                    }
                    else {
                        console.log(data.data.token)
                        
                        localStorage.setItem('name', data.data.name)
                        localStorage.setItem('token', data.data.token)
                        localStorage.setItem('username', data.data.email)
                        window.location.href = 'index.html'
                    }

                })
                .catch(err => {

                })
        },

        login() {


            let email = this.email;
            let password = this.password;

            axios.post('http://localhost:3000/users/login', {
                email: email,
                password: password
            })
                .then((data) => {

                    if (data.status === 202) {
                        alert('Wrong email/password')
                    }
                    else {
                        localStorage.setItem('name', data.data.name)
                        localStorage.setItem('token', data.data.token)
                        localStorage.setItem('username', data.data.email)
                        window.location.href = 'index.html';
                    }


                })
                .catch(err => {
                    alert('Connection problem')
                    console.log(err);
                })
        },
        

    },

    created() {

        this.token = localStorage.getItem('token');
        axios.get('http://localhost:3000/products', {
            headers: { token: this.token }
        })
            .then((response) => {
                response.data.data.forEach(element => {
                    this.products.push(element)
                })
            })
            .catch(err => {
                console.log(err);

            })

    }


});