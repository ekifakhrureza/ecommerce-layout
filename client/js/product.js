Vue.component('product-component', {
    template: `
    <div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Add Product</h5>
                            <button id="close" type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                       
                        <div class="modal-body">
                                <div class="form-group">
                                    <label for="recipient-name" class="col-form-label" required>Name:</label>
                                    <input v-model="product_name" name="product_name" type="text" class="form-control" placeholder="Input Name" 
                                    id="product_name" v-validate="'required'"
                                    v-bind:class="{'form-control': true, 'error': errors.has('product_name') }">
                                </div>
                                <div class="control">
                                    <span v-show="errors.has('product_name')" class="text-danger">{{ errors.first('product_name') }}</span>
                                </div>
                                <div class="form-group">
                                    <label for="recipient-name" class="col-form-label" required>Price:</label>
                                    <input v-model="price" name="price" type="text" class="form-control" id="price" placeholder="Input Number Only. e.g. 50000" 
                                    v-validate="'required'"
                                    v-bind:class="{'form-control': true, 'error': errors.has('price') }">
                                </div>
                                <div class="control">
                                    <span v-show="errors.has('price')" class="text-danger">{{ errors.first('price') }}</span>
                                </div>
                                <div class="form-group">
                                    <label for="message-text" class="col-form-label" required>Stock:</label>
                                    <input v-model="stock" name="stock" type="text" class="form-control" id="stock" placeholder="Input Number Only. e.g. 7"
                                    v-validate="'required'"
                                    v-bind:class="{'form-control': true, 'error': errors.has('stock') }">
                                </div>
                                <div class="control">
                                    <span v-show="errors.has('stock')" class="text-danger">{{ errors.first('stock') }}</span>
                                </div>
                                <div class="form-group">
                                    <label for="message-text" class="col-form-label" required>Image:</label>
                                    <input type="file" v-model="link" class="form-control" name="link" accept="image/*" @change="handleUploadPicture">
                                </div>
                                
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" @click="add()">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
`,

    props: ['productslist'],
    data: function () {
        return {}
    },
    methods: {
        add() {
            let formData = new FormData()
            formData.append('product_name', this.product_name)
            formData.append('price', this.price)
            formData.append('link', this.link)
            formData.append('stock', this.stock)

            axios.post('http://localhost:3000/products/add', formData, {
                headers: {
                    'Content-type': 'multipart/form-data',
                    token: localStorage.getItem('token')
                }
            }).then((response) => {
                
                this.productslist.push(response.data.data)
                document.getElementById('close').click()
                alert('Data Entered successfully')
            }).catch((err => {
                console.log('masuk error ' + err);
            }))
        },
        handleUploadPicture: function (event) {
            this.link = event.target.files[0]
        },


    }

})