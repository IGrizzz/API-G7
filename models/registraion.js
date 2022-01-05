const mongoose = require('mongoose')


const Schema = mongoose.Schema



const regisSchema = new Schema({
    namaInstansi:{type:String, required:true},
    kepemilikan:{type:String, required:true},
    alamat:{type:String, required:true},
    nomorTelepon: {type: Number, required:true},
    email:{type: String, required:true},
    doc: {type:String, required:true},
    cloudinaryId: {type: String, required:true}
}, {timestamps:true});

const RegisModels = mongoose.model('registration', regisSchema)

module.exports = RegisModels