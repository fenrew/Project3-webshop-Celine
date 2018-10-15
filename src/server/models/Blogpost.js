const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogSchema = new Schema ({
    header: {
        type: String,
        default: ""
    },
    oneliner: {
        type: String,
        default: ""
    },
    info: {
        type: String,
        default: ""
    },
    mainPicture: {
        type: String,
        default: ""
    },
    img: {
        type: String,
        default: ""
    },
    date: {
        type: Date,
        default: new Date
    }
})

module.exports = mongoose.model('Blog', blogSchema)