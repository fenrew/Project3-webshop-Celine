const mongoose = require('mongoose')
const Schema = mongoose.Schema

const purchaseSchema = new Schema({
    date: Date,
    userEpost: {
        type: String,
        default: ""
    },
    userRef:{
        type: String,
        default: "",
    },
    userInformation: Object,
    items: Array,
    totalPrice: Number,
    charged: {
        type: Boolean,
        default: false
    },
})

module.exports = mongoose.model('Purchase', purchaseSchema)