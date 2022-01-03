const mongoose = require('mongoose');
const Schema = mongoose.Schema


const bankSchema = new Schema({
    name: {type: String, required: true},
    banknum: {type: String, required:true},
    bank: {type: String, required: true}
})

const BankModels = mongoose.model('bank', bankSchema)

module.exports = BankModels