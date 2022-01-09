const CommunityModels = require('../models/community')
const DonateModels = require('../models/donateform')


class DonateController {

    static createNewDonations(req, res){
        const body = req.body;
        
        const newDonate = new DonateModels({
            name: body.name,
            contact: body.contact,
            email: body.email,
            address: body.address,
            nominal: body.nominal
        })

        newDonate
        .save()
        .then((result)=>{
            res.status(200).json({message:"successfully save", result})
        }).catch((error)=>{
            res.status(500).json({error:error})
        })


    }



    static getDonate(req, res){
        DonateModels.find()
        .then((result)=>{
        res.status(200).json({message:"success", result})
        }).catch((err)=>{
            res.status(500).json({error:err})
        })
    }



    static getDonateById(req, res){
        DonateModels.findById(req.params.id)
        .then((result)=>{
            res.status(200).json({message:"success", result})
        }).catch((error)=>{
            res.status(500).json({error:error})
        })
    }


    static updateDonate(req, res){
        DonateModels.findById(req.params.id)
        .then((result)=>{
            const {name, contact, email, address, nominal} = req.body

            const newDonate = {
                name: name || result.name,
                contact: contact || result.contact,
                email: email || result.email,
                address: address || result.address,
                nominal: nominal || result.nominal
            }

            DonateModels.findByIdAndUpdate(req.params.id, newDonate, {new:true})
            .then((newCommuntiy)=>{
                res.status(200).json({message:"success", newDonate})
            }).catch((error)=>{
                res.status(500).json({error:error})
            })
        }).catch((error)=>{
            res.status(500).json({error:error})
        })
    }


    static deleteDonate(req, res){
        DonateModels.findByIdAndDelete(req.params.id)
        .exec((community)=>{
            res.status(200).json({message:"item dihapus"})
        }).catch((err)=>{
            res.status(500).json({error:error})
        })
    }
}

module.exports = DonateController