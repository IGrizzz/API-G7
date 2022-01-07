const mongoose = require('mongoose')

const Schema = mongoose.Schema

const donateSchema = new Schema({
    name:{type: String, required:true},
    contact: {type: String, required:true},
    email:{type: String, required:true},
<<<<<<< HEAD
    address:{type: String, required:true},
=======
    address:{type: String, required:true}
>>>>>>> d1693e76b25d1d42e59a36e7500226646b3d2c57
})


const DonateModels = mongoose.model('donate', donateSchema)