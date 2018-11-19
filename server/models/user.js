const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {generateSalt, hashPassword, compare} = require('../helpers/helper')

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password:{
        type:  String,
        required: true
    }
})


userSchema.pre('save', function(next){
    let salt = generateSalt(10)
    let psswd = hashPassword(this.password, salt)
    this.password = psswd
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User