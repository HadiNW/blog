const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        default: ''
    },

    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    image: {
        type: String,
        default: null
    }
}, {
    timestamps: true
})

const Article = mongoose.model('Article', articleSchema)

module.exports = Article