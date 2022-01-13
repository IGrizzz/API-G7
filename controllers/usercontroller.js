const UsersModels = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


class UserController {


    static async homepage(req, res){
        res.json({message:"See the code on Github : https://github.com/IGrizzz/API-G7"})
    }


    static createNewUser(req, res){

        const {instansi, email, password} = req.body
        
        UsersModels.findOne({email:email})
        .then((savedUser)=>{
            if(savedUser){
                res.status(500).send({message:"User Already Existed"})
            }


            bcrypt
            .hash(password, 12)
            .then((hashedPassword)=>{
                const newUser = new UsersModels({
                    instansi,
                    email,
                    password:hashedPassword
                });

                newUser
                .save()
                .then((newUser)=>{
                    res.status(200).json({message:"successfully create new user"})
                }).catch((error)=>{
                    res.status(500).json({error:error})

                })
            }).catch((error)=>{
                res.status(500).json({error:error})
            })

        }).catch((error)=>{
            res.status(500).json({error:error})
        })
    }


    static login(req, res){
        
            const {email, password} = req.body;

            if(!email || !password){
                res.status(422).send({message:"Please Input Email and Password"})
            }

            UsersModels.findOne({email: email})
            .select("+password")
            .then((userData)=>{
                bcrypt
                .compare(password, userData.password)
                .then((doMatch) => {
                    if(doMatch){
                        const token = jwt.sign({_id: userData.id}, process.env.JWT_SECRET);
                        
                        const {_id, name, email, role} =  userData
                res.json({
                    token,
                    user: {
                    _id,
                    name,
                    email,
                    role,
                    email}
                }
                )   
                    }else{
                        return res.status(422).json({error: "wrong password"})
                    }
                }).catch((err) => {
                    console.log(err);
                })
            }
            ).catch((err) => {
                console.log(err)
            })


       
    }
            
            

    static getUser(req, res){
        UsersModels.find()
        .then((result)=>{
            res.status(200).json({message:"success", result})
        }).catch((error)=>{
            res.status(500).json({error:error})
        })
    }


    static getUserById(req, res){
        UsersModels.findById(req.params.id)
        .then((users)=>{
            res.status(200).json({message:"successfully", users})
        }).catch((error)=>{
            res.status(500).json({error:error})
        })
    }


    static updateUser(req, res){
        UsersModels.findById(req.params.id)
        .then((users)=>{
            const {instansi, email, password} = req.body

            bcrypt
            .hash(password, 12)
            .then((hashedPassword)=>{
                const newUsers = {
                    instansi,
                    email,
                    password:hashedPassword
                }

                UsersModels.findByIdAndUpdate(req.params.id, newUsers, {new:true})
                .then((updated)=>{
                    res.status(200).json({message:"Successfully updated"})
                }).catch((error)=>{
                    res.status(500).json({error:error});
                })
              }).catch((error)=>{
                res.status(500).json({error:error})
              })
            }
        ).catch((error)=>{
            res.status(500).json({error:error})
        })
    }



    static deleteUser(req, res){
        UsersModels.findByIdAndDelete(req.params.id)
        .then((err, user)=>{
            if(user){
                cloudinary.uploader.destroy(user.cloudinary_id)
                res.status(200).json({message:"item dihapus"})
                return;
            }
            res.status(500).json({message:"item tidak ditemukan"})
        })
    }
        
}


module.exports = UserController