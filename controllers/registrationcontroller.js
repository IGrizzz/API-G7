const { Schema } = require('mongoose')
const RegisModels = require('../models/registration')


class RegisController {


    static async createRegis(req, res){
        cloudinary.uploader.upload(req.file.path)
        .then((result)=>{
            const {namaInstansi, kepemilikan, alamat, nomorTelepon, email } = req.body

            const newRegis = new RegisModels({
                namaInstansi,
                kepemilikan,
                alamat,
                nomorTelepon,
                email,
                doc:result?.secure_url,
                cloudinary_id:result?.public_id
            })

            newRegis
            .save()
            .them((newRegis)=>{
                res.status(200).json({registration:newRegis})
            }).catch((err)=>{
                res.status(500).json({error:err})
            })


        }).catch((err)=>{
            res.status(500).json({error:err})
        })
       

    }



    static async getRegis (req, res){
        RegisModels.find()
        .then((result)=>{
            res.status(200).json({reuslt:result})
        }).catch((err)=>{
            res.status(500).json({error:err})
        })
    }



    static async getRegisById (req, res){
        RegisModels.findById(req.params.id)
        .then((result)=>{
            res.status(200).json({result:result})
        }).catch((err)=>{
            res.status(500).json({error:err})
        })
    }


    static async updateRegis (req, res){
        RegisModels.findById(req.params.id)
        .then((regis)=>{

            if(req.file){
                cloudinary.uploader.destroy(regis.cloudinary.id)
                cloudinary.uploader.upload(req.file.path)
                .then((result)=>{
                    const {namaInstansi, kepemilikan, alamat, nomorTelepon, email } = req.body

                    const updateRegis = {
                        namaInstansi: namaInstansi || regis.namaInstansi,
                        kepemilikan: kepemilikan || regis.kepemilikan,
                        alamat: alamat || regis.alamat,
                        nomorTelepon: nomorTelepon || regis.nomorTelepon,
                        email: email || regis.email,
                        doc: result?.secure_url,
                        cloudinary_id:result?.public_id
                    }


                    RegisModels.findByIdAndUpdate(req.params.id, updateRegis, {new:true})
                    .then((newRegis)=>{
                        res.status(200).json({message:"Updated", registration:mewRegis})
                    }).catch((err)=>{
                        res.status(500).json({error:err})
                    })

                }
            ).catch((err)=>{
                res.status(500).json({error:err})
            })
            

            
        }
    }).catch((err)=>{
        res.status(500).json({error:err})
    })
    }


    static async deleteRegis(req, res){
        RegisModels.findByIdAndDelete(req.params.id)
        .exec((err, regis)=>{
            if(regis){
                cloudinary.uploader.destroy(regis.cloudinary_id)
                res.status(200).json({message:"Item Dihapus"})
            }res.status(500).json({error:err})
        })
    }
}



module.exports = RegisController