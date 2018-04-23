const mongoose = require('mongoose')
const validate = require('mongoose-validator');
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
    email : {
        type : String,
        unique : true,
        lowercase : true,
        trim : true,
        required : [true,'email cannot be empty'],
        validate : [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'email is not valid']
    },
    password : {
        type : String,
        trim : true,
        minlength : [6,'Password must be at least 6 characters'],
        required : [true,'Password cannot be empty']
        
    },
    name : {
        type : String,
        trim : true ,
        required : [true,'name cannot be empty']
    }
},{
    timestamps: true
})

userSchema.pre('save', function(next) {                                                                                                                                        
    if(this.password) {                                                                                                                                                        
        var salt = bcrypt.genSaltSync(10)                                                                                                                                     
        this.password  = bcrypt.hashSync(this.password, salt)                                                                                                                
    }                                                                                                                                                                          
    next()                                                                                                                                                                     
}) 



let User = mongoose.model('Users', userSchema)

module.exports = User
