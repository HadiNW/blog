require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')

const mongoose = require('mongoose')
const router = require('./routes/')
// +process.env.NODE_ENV||''
// mongoose.connect('mongodb://localhost/blog-app', {
//     useNewUrlParser: true
// })
const mongodUri = `mongodb://${process.env.MLAB_USER}:${process.env.MLAB_PASSWORD}@ds211724.mlab.com:11724/blog`
mongoose.connect(mongodUri, {
    useNewUrlParser: true
})
    .then(_ => {
        console.log('mongodb started')
    })
    .catch(err => {
        console.log(err)
    })


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/', router)

app.listen(3000, () => {
    console.log('server started on port 3000')
})


module.exports = app