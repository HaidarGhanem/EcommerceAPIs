const mongoose = require ('mongoose')

const Schema = mongoose.Schema
const Userschema = new Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    phoneNumber : {
        type : String,
        required : true
    },
    history : {
        type : String
    }
})

module.exports = mongoose.model('Users', Userschema)