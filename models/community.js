const mongoose = require('mongoose')

const Schema = mongoose.Schema


const CommunitySchema = new Schema({
    namaKomunitas:{type: String, required:true},
    lokasi: {type:String, required:true},
    email: {type: String, required:true},
    contact:{type: String, required:true},
    bank:{type: String, required:true},
    picture:{type: String, require:true},
    cloudinary_id:{type: String, require:true}
})  

CommunitySchema.index({'$**': 'text'})
const CommunityModels = mongoose.model('community', CommunitySchema)


module.exports = CommunityModels