const CommunityModels = require('../models/community')
const DonateModels = require('../models/donateform')


class DonateController {

    static createNewDonations(req, res){
        const {name, contact, email, address, nominal} = req.body
        
        const newDonate = new DonateModels({
            name,
            contact,
            email,
            address,
            nominal
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
        DonationModels.find()
        .then((result)=>{
        res.status(200).json({message:"success", result})
        }).catch((err)=>{
            res.status(500).json({error:err})
        })
    }



    static getDonateById(req, res){
        DonationModels.findById(req.params.id)
        .then((result)=>{
            res.status(200).json({message:"success", result})
        }).catch((error)=>{
            res.status(500).json({error:error})
        })
    }


    static updateDonate(req, res){
        CommunityModels.findById(req.params.id)
        .then((result)=>{
            const {name, contact, email, address, nominal} = req.body

            const newCommunity = {
                name: name || result.name,
                contact: contact || result.contact,
                email: email || result.email,
                address: address || result.address,
                nominal: nominal || result.nominal
            }

            CommunityModels.findByIdAndUpdate(req.params.id, newCommunity, {new:true})
            .then((newCommuntiy)=>{
                res.status(200).json({message:"success", newCommunity})
            }).catch((error)=>{
                res.status(500).json({error:error})
            })
        }).catch((error)=>{
            res.status(500).json({error:error})
        })
    }


    static deleteDonate(req, res){
        CommunityModels.findByIdAndDelete(req.params.id)
        .exec((community)=>{
            res.status(200).json({message:"item dihapus"})
        }).catch((err)=>{
            res.status(500).json({error:error})
        })
    }
}

module.exports = DonateController