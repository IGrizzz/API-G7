const AmbulancesModels = require('../models/ambulanceloc')
const cloudinary = require('../utils/cloudinary')



class AmbulancesController {




    static searchAmbulance(req, res){
        AmbulancesModels.find({'$text':{'$search':req.query.search}})
        .then((result)=>{
            res.status(200).json({result:result})
        }).catch((err)=>{
            res.status(500).json({err:err})
        })                
    }


    static createNewAmbulance(req, res){
    if(req.file){
            cloudinary.uploader.upload(req.file.path)
            .then((result)=>{
                const {name, location, contact, tags, operationalTime, price} = req.body;
                const newAmbulance = new AmbulancesModels({
                    name,
                    location,
                    contact,
                    operationalTime,
                    price,
                    tags,
                    picture:result?.secure_url,
                    cloudinary_id:result?.pubic_id
                });

                newAmbulance
                .save()
                .then((newAmbulance) =>{
                    res.status(201).json(newAmbulance)
                })
                .catch((err)=>{
                    res.status(500).json({err:err})
                })


            }).catch((err)=>{
                res.status(500).json({err:err})
            })
        }
        const {name, location, contact, tags, operationalTime, price} = req.body;
        const newAmbulance = new AmbulancesModels({
            name,
            location,
            contact,
            operationalTime,
            price,
            tags
        });

        newAmbulance
        .save()
        .then((newAmbulance) =>{
            res.status(201).json(newAmbulance)
        })
        .catch((err)=>{
            res.status(500).json({err:err})
        })

        
    }



    static getAmbulance(req, res){
       
      AmbulancesModels.find()
      .then((result)=>{
          res.status(200).send({message:"sucess", result})
      }).catch((error)=>{
          res.status(500).send(error)
      })
     }


     static getAmbulancebyId(req, res){
        AmbulancesModels.findByID(req.params.id)
        .then((result)=>{
            res.status(200).send({message:"success", result})
        }).catch((error)=>{
            res.status(500).send(error)
        })
     }


     static updateAmbulance(req, res){
        AmbulancesModels.findById(req.params.id)
        .then((ambulances)=>{
            if(req.file){
                cloudinary.uploader.destroy(ambulances.cloudinary_id);
                cloudinary.uploader.upload(req.file.path)
                .then((result) =>{
                    // const body = req.body;
                    const newData = {
                        name: req.body.name || ambulances.name,
                        location : req.body.location || ambulances.location,
                        contact: req.body.contact || ambulances.contact,
                        operationalTime: req.body.operationalTime || ambulances.operationalTime,
                        price: req.body.price || ambulances.price,
                        picture: result?.secure_url,
                        cloudinary_id: result?.public_id
                    }



                    AmbulancesModels.findByIdAndUpdate(req.params.id, newData, {new:true})
                    .then((result)=>{
                        res.json({message:"Berhasil", result})
                    }).catch((err)=>{
                        res.json({error:err})
                    })

                }).catch((error)=>{
                    res.status(500).json({err:error})
                })
            }
            const newData = {
                name: req.body.name || ambulances.name,
                location : req.body.location || ambulances.location,
                contact: req.body.contact || ambulances.contact,
                operationalTime: req.body.operationalTime || ambulances.operationalTime,
                price: req.body.price || ambulances.price,
            }



            AmbulancesModels.findByIdAndUpdate(req.params.id, newData, {new:true})
            .then((result)=>{
                res.json({message:"Berhasil", result})
            }).catch((err)=>{
                res.json({error:err})
            })
            

        }).catch((error) =>{
            res.status(500).json({err:error})
        })


         
     }

     static deleteAmbulance(req, res){
         AmbulancesModels.findByIdAndDelete(req.params.id)
         .exec((err, ambulance)=>{
             if(ambulance){
                 cloudinary.uploader.destroy(ambulance.cloudinary_id)
                 res.status(200).json({message:"item dihapus"})
             }res.status(500).json({message:"item tidak ada"});
         }
         )
    }
}


module.exports = AmbulancesController