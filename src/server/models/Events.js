const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventSchema = new Schema ({
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
    img: {
        type: String,
        default: ""
    },
    fromTime: {
        type: Date,
        default: new Date
    },
    toTime: {
        type: Date,
        default: new Date
    }
})

module.exports = mongoose.model('Event', eventSchema)