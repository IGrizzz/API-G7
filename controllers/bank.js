const BankModels = require('../models/bank')



class BankController {

    static createNewBank(req, res){
        const {name, banknum, bank} = req.body;

        const newBank = new BankModels({
            name,
            banknum,
            bank
        })

        newBank
        .save()
        .then((result)=>{
            res.status(200).json({message:"success", result})
        }).catch((error)=>{
            res.status(500).json({error:error})
        })
        
           
        }


    
    static getBank(req, res){
        BankModels.find()
        .then((result)=>{
            res.status(200).json({message:"Success", result})
        }).catch((error)=>{
            res.status(500).json({error:error})
        })
    }


    static  getbBankById (req, res){
        BankModels.findById(req.params.id)
        .then((result)=>{
            res.status(200).json({message:"success", result})
        }).catch((error)=>{
            res.status(500).json({error:error})
        })
    }


    static updateBank(req, res){
        BankModels.findById(req.params.id)
        .then((banks)=>{

            const newBank = {
                name: req.body.name || banks.name,
                banknum: req.body.banknum || banks.banknum,
                bank: req.body.bank || banks.bank
            }

            BankModels.findByIdAndUpdate(req.params.id, newBank, {new: true})
            .then((result)=>{
                res.status(200).json({message:"success", results})
            }).catch((error)=>{
                res.status(500).json({error:error})
            })
        }).catch((error)=>{
            res.status(500).json({error:error})
        })
    }
    

    static deleteBank(req, res){
        BankModels.findByIdAndDelete(req.params.id)
        .exec((err, bank)=>{
            if(bank){
                cloudinary.uploader.destroy(bank.cloudinary_id)
                res.status(200).json({message:"item dihapus"})
                return;
            }
            res.status(500).json({message:"item tidak ada"})
        })
    }



    
}

module.exports = BankController