///models for vaccine locations

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const vaccineSchema = new Schema({
    name:{type:String, required:true},
    location:{type:String, required:true, minLength:10},
    date:{type:Date, required:true},
    time:{type:String, required:true},
    registlink:{type:String, required:true},
    description:{type:String, required:true, maxLength:300},
    contact:{type:String, required:true},
    tags: [String],
    picture: {type: String, required:true},
    cloudinaryId: String
}, {timestamps:true})

 vaccineSchema.index({'$**': 'text'})
 const VaccineModels = mongoose.model('vaccine', vaccineSchema)

 module.exports = VaccineModels