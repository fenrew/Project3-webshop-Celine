const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema ({
    name: String,
    price: {
        type: Number,
        required: true,
    },
    stock: Boolean,
    quantity: {
        type: Number,
        default: 1,
    },
    image: String,
    info: String
})

module.exports = mongoose.model('Shop', userSchema)