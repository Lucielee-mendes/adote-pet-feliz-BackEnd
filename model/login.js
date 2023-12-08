const mongoose = require('mongoose')

const Login = mongoose.model('login', {
    email:String,
    senha:String
})

module.exports = Login