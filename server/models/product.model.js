const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const productSchema = new Schema({
    name : {
        type : String,
        required : [true,'name cannot be empty'],
    },
    price : {
        type : Number,
        required : [true,'price cannot be empty'],
    },
    stock : {
        type : Number,
        required : [true,'stock cannot be empty'],
    },
    link: {
       type : String, 
       required : [true,'link cannot be empty'],
    },
},{
    timestamps: true
})



let Todo = mongoose.model('Products', productSchema)

module.exports = Todo
