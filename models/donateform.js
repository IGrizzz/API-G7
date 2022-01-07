const mongoose = require('mongoose')

const Schema = mongoose.Schema

const donateSchema = new Schema({
    name:{type: String, required:true},
    contact: {type: String, required:true},
    email:{type: String, required:true},
    address:{type: String, required:true},
})


const DonateModels = mongoose.model('donate', donateSchema)