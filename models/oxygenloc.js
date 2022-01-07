
const mongoose = require('mongoose')
const Schema = mongoose.Schema


const oxygenSchema = new Schema({
    name:{type:String, required:true},
    location:{type:String, required:true, minLength:10},
    contact:{type:String, required:true},
    operationalTime:{type:String, required:true},
    price:{type:String, required:true},
    picture: {type: String, required:true},
    cloudinaryId: String
}, {timestamps:true})

 oxygenSchema.index({'$**': 'text'})
 const OxygensModels = mongoose.model('oxygen', oxygenSchema)

 module.exports = OxygensModels