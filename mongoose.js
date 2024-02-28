const mongoose = require("mongoose")
mongoose.set('strictQuery',false)
const mongoDB = mongoose.connect('mongodb://127.0.0.1:27017/apidata')





console.log("db is up")

module.exports = mongoDB