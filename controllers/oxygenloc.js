const OxygensModels = require('../models/ambulanceloc')
const cloudinary = require('../utils/cloudinary')

class OxygensController {


    static searchOxygen(req, res){
        OxygensModels.find({'$text':{'$search': req.query.search}})
        .then((result)=>{
            res.status(200).json({result:result})
        }).catch((err)=>{
            res.status(500).json({error:err})
        })
    }


    static createNewOxygen(req, res){
    if(req.file){
            cloudinary.uploader.uploader
            .then((result)=>{
                const {name, location, contact, operationalTime, price} = req.body;

                const newOxy = new OxygensModels({
                    name,
                    location,
                    contact,
                    operationalTime,
                    price,
                    picture:result?.secure_url,
                    cloudinary:result?.public_id
                });

                newOxy.save()
                .then((newOxy)=>{
                    res.status(200).json({message:"success", newOxy})
                }).catch((error)=>{
                    res.status(500).json({error:error})
                });
            }).catch((error)=>{
                res.status(500).json({error:error})
            })
        }
        const {name, location, contact, operationalTime, price} = req.body;

                const newOxy = new OxygensModels({
                    name,
                    location,
                    contact,
                    operationalTime,
                    price
                });

                newOxy.save()
                .then((newOxy)=>{
                    res.status(200).json({message:"success", newOxy})
                }).catch((error)=>{
                    res.status(500).json({error:error})
                });
    }



    static getOxygen(req, res){
       
       OxygensModels.find()
       .then((result)=>{
           res.status(200).json({message:"success", result})
       }).catch((error)=>{
           res.status(500).json({error:error});
       })
     }


     static getOxygenbyId(req, res){
         OxygensModels.findById(req.params.id)
         .then((result)=>{
             res.status(200).json({message:"success", result})
         }).catch((error)=>{
             res.status(500).json({error:error})
         })
     }


     static updateOxygen(req, res){
         OxygensModels.findById(req.params.id)
         .then((oxygens)=>{
             if(req.file){
                 cloudinary.uploader.destroy(oxygens.cloudinary_id)
                 cloudinary.uploader.upload(req.file.path)
                 .then((result)=>{
                     const updatedOxy = {
                         name: req.body.name || oxygens.name,
                         location: req.body.location || oxygens.location,
                         contact: req.body.contact || oxygens.contact,
                         operationalTime: req.body.operationalTime || oxygens.operationalTime,
                         price: req.body.price || oxygens.price,
                         picture: result?.secure_url,
                         cloudinary_id: result?.public_id
                     }


                     OxygensModels.findByIdAndUpdate(req.params.id, updatedOxy, {new:true})
                     .then((updated)=>{
                         res.status(200).json({message:"success", updated})
                     }).catch((error)=>{
                         res.status(500).json({error:error})
                     })
                 }).catch((error)=>{
                     res.status(500).json({error:error})
                 })
             }
             const updatedOxy = {
                name: req.body.name || oxygens.name,
                location: req.body.location || oxygens.location,
                contact: req.body.contact || oxygens.contact,
                operationalTime: req.body.operationalTime || oxygens.operationalTime,
                price: req.body.price || oxygens.price
            }


            OxygensModels.findByIdAndUpdate(req.params.id, updatedOxy, {new:true})
            .then((updated)=>{
                res.status(200).json({message:"success", updated})
            }).catch((error)=>{
                res.status(500).json({error:error})
            })
         })
     }


     static deleteOxygen(req, res){
         OxygensModels.findByIdAndDelete(req.params.id)
         .exec((err, oxygen)=>{
             if(oxygen){
                 cloudinary.uploader.destroy(oxygen.cloudinary_id)
                 res.status(200).json({message:"success"})
             }
             res.status(500).json({message:"item tidak ditemukan"})
         })
     }
}


module.exports = OxygensController