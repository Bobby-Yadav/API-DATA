const mongoose = require('mongoose')

const data = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
         
    },
    price: {
        type: String,
        required: true,
         
    },
    description: {
        type: String,
        required: true,
    },
    category:{
        type:String
    },
    image:{
        type:String
    },
    sold:{
        type:Boolean

    },
    dateOfSale:{
        type:Date
    }
}, {timestamps: true})


const apiModelData = mongoose.model('data', data)

module.exports = apiModelData