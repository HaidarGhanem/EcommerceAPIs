const mongoose = require ('mongoose')

const Schema = mongoose.Schema
const ProductSchema = new Schema({
    productname: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number
    },
    category: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    }
})

module.exports = mongoose.model('Products', ProductSchema)