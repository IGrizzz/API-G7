const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
const UsersModels = require('../models/users');


function auth (req, res, next){
    const { authorization } = req.headers;
    if(!authorization){
        res.status(401).json("Require Log in")
    }
    const token = authorization && authorization.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, payload)=>{
    if(err){
        res.status(401).json({message:"Require log in"})
    }
    const {_id} = payload;
    UsersModels.findById(_id).then((user)=> {
        req.user = user;
        next();
    })
    })
}

module.exports = auth;