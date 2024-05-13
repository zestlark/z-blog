const mongoose = require('mongoose')

const Blog = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: false
    }
}, { timestamps: true })

const model = mongoose.model('Blog', Blog)

module.exports = model