const mongoose = require('mongoose')
const Schema = mongoose.Schema

const saleSchema = new Schema ({
    header: {
        type: String,
        default: ""
    },
    text: {
        type: String,
        default: ""
    },
})

module.exports = mongoose.model('Sale', saleSchema)