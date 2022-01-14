const CommunityModels = require('../models/community')


class CommunityController {



    static searchCommunity (req, res){
        CommunityModels.find({'$text':{'$search':req.query.search}})
        .then((result)=>{
            res.status(200).json({resut})
        }).catch((err)=>{
            res.status(500).jsons({error:error})
        })
    }

    static createNewCommunity(req, res){
    if(req.file){

        cloudinary.uploader.upload(req.file.path)
        .then((result)=>{
            const {namaKomunitas, lokasi, email, contact, bank} = req.body

            const newCommunity = new CommunityModels({
                namaKomunitas,
                lokasi,
                email,
                contact,
                bank,
                picture:result?.secure_url,
                cloudinary_id:result?.public_id
            })

            newCommunity.save()
            .then((newCommunity)=>{
                res.status(200).json({message:"Community Created", newCommunity})
            }).catch((err)=>{
                res.json(500).json({error:err})
            })
        }).catch((err)=>{
            res.status(500).json({error:err})
        })
        }
        const {namaKomunitas, lokasi, email, contact, bank} = req.body

            const newCommunity = new CommunityModels({
                namaKomunitas,
                lokasi,
                email,
                contact,
                bank
            })

            newCommunity.save()
            .then((newCommunity)=>{
                res.status(200).json({message:"Community Created", newCommunity})
            }).catch((err)=>{
                res.json(500).json({error:err})
            })

    }


    static getCommunity (req, res){
        CommunityModels.find()
        .then((result)=>{
            res.status(200).json({message:"Success", result})
        }).catch((error)=>{
            res.status(500).json({error:error})
        })
    }

    static getCommunityById (req, res){
        CommunityModels.findById(req.params.id)
        .then((result)=>{
            res.status(200).json({message:"success", result})
        }).catch((error)=>{
            res.status(500).json({error:error})
        })
    }


    static updateCommunity (req, res){
        CommunityModels.findById(req.params.id)
        .then((community)=>{
            if(req.file){
                cloudinary.uploader.destroy(community.cloudinary_id)
                cloudinary.uploader.upload(req.file.path)
                .then((result)=>{
                    const {namaKomunitas, lokasi, email, contact, bank} = req.body

                    const newCommunity = {
                        namaKomunitas,
                        lokasi,
                        email,
                        contact,
                        bank,
                        picture:result?.secure_url,
                        cloudinary_id:result?.public_id
                    }

                    CommunityModels.findByIdAndUpdate(req.params.id, newCommunity, {new:true})
                    .then((newCommunity)=>{
                        res.status(200).json({message:"successfully updated", newCommunity})
                    }).catch((error)=>{
                        res.status(500).json({error:error})
                    })
                }).catch((error)=>{
                    res.status(500).json({error:error})
                })
            }
            const {namaKomunitas, lokasi, email, contact, bank} = req.body

                    const newCommunity = {
                        namaKomunitas,
                        lokasi,
                        email,
                        contact,
                        bank
                    }

                    CommunityModels.findByIdAndUpdate(req.params.id, newCommunity, {new:true})
                    .then((newCommunity)=>{
                        res.status(200).json({message:"successfully updated", newCommunity})
                    }).catch((error)=>{
                        res.status(500).json({error:error})
                    })
        }).catch((error)=>{
            res.status(500).json({error:error})
        })
    }


    static deleteCommunity (req, res){
        CommunityModels.findByIdAndRemove(req.params.id)
        .exec((err, community)=>{
            if(community){
                cloudinary.uploader.destroy(community.cloudinary_id)
                res.status(200).json({message:"item deleted"})
                return;
            }res.status(500).json({message:"item tidak ditemukan"})
        })
    }
}

module.exports = CommunityController