const mongoose = require('mongoose')


const Schema = mongoose.Schema



const userSchema = new Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    role: {type:String, required:false, default:"user"},
    cloudinaryId: {type: String}
}, {timestamps:true});

const UsersModels = mongoose.model('user', userSchema)

module.exports = UsersModels