const VaccineModels = require('../models/vaccineloc')

class VaccineController {



    static async searchVaccine(req, res){
        VaccineModels.find({'$text':{'$search':req.query.dsearch}})
        .limit(10)
        .then((result)=>{
            res.status(200).json({result:result})
        }).catch((err)=>{
            res.status(500).json({error:err})
        })
    }


    static async createNewVaccine(req, res){
        cloudinary.uploader.upload(req.file.path)
        .then((result)=>{
            const {name, location, date, time,  registlink, description, contact } = req.body

            const newVac = new VaccineModels({
                name,
                location,
                date,
                time,
                registlink,
                description,
                contact,
                picture:result?.secure_url,
                cloudinary_id:result?.public_id
            })

            newVac
            .save()
            .then((newVac)=>{
                res.status(200).json({message:"success", newVac})
            }).catch((error)=>{
                res.status(500).json({error:error})
            })
        }).catch((error)=>{
            res.status(500).json({error:error})
        })
    }



    static async getVaccine(req, res){
       VaccineModels.find()
       .then((result)=>{
           res.status(200).json({message:"success", result})
       }).catch((error)=>{
           res.status(500).json({error:error})
       })

     }


     static async getVaccineById(req, res){
         VaccineModels.findById(req.params.id)
         .then((result)=>{
             res.status(200).json({message:"success", result})
         }).catch((error)=>{
             res.status(500).json({error:error})
         })
        }


     static async updateVaccine(req, res){
         VaccineModels.findById(req.params.id)
         .then((vaccine)=>{
            if(req.file){
                cloudinary.uploader.destroy(vaccine.cloudinary_id)
                cloudinary.uploader.upload(req.file.path)
                .then((result)=>{
                    const newVac = {
                        name: req.body.name || vaccine.name,
                        location: req.body.location || vaccine.location,
                        date: req.body.date || vaccine.date,
                        time: req.body.time || vaccine.time,
                        registlink: req.body.registlink || vaccine.registlink,
                        description: req.body.description || vaccine.description,
                        contact: req.body.contact || vaccine.contact,
                        picture:result?.secure_url,
                        cloudinary_id: result?.cloudinary_id
                    }

                    VaccineModels.findByIdAndUpdate(req.params.id, newVac, {new:true})
                    .then((updated)=>{
                        res.status(200).json({message:"success", updated})
                    }).catch((error)=>{
                        res.status(500).json({error:error})
                    })

                }).catch((error)=>{
                    res.status(500).json({error:error})
                })
            }

         }).catch((error)=>{
             res.status(500).json({error:error})
         })
     }


     static async deleteVaccine(req, res){
         VaccineModels.findByIdAndDelete(req.params.id)
         .exec((err, vaccine)=>{
             if(vaccine){
                 cloudinary.uploader.destroy(vaccine.cloudinary_id)
                 res.status(200).json({message:"item terhapus"})
             }
             res.status(500).json({message:"item tidak ditemukan"})
         })
     }
}


module.exports = VaccineController