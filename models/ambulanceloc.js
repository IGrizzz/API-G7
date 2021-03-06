
const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')
const Schema = mongoose.Schema


const ambulanceSchema = new Schema({
    name:{type: String, required:true},
    location:{type: String, required:true},
    contact:{type: String, required:true},
    operationalTime:{type: String, required:true},
    price:{type: String, required:true},
    picture: {type: String, required:false},
    cloudinaryId: String
}, {timestamps:true})


 ambulanceSchema.index({'$**': 'text'})
 const AmbulancesModels = mongoose.model('ambulances', ambulanceSchema)

 module.exports = AmbulancesModels