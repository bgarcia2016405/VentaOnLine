'use strict'

const bcrypt = require("bcrypt-nodejs");
const jwt = require('../service/jwt');
const useroModel = require('../models/user.model');
const userModel = require("../models/user.model");
const admin = 'administrador';
const user = 'usuario'

function Login(req,res){
    var params = req.body;
    userModel.findOne({ user : params.usuario }, (err, userFound)=>{
        if (err) return res.status(404).send({ report: 'Error at Login'});

        if (userFound){
            bcrypt.compare(params.password, userFound.password, (err,Valid)=>{

                if(err) return res.status(404).send({ report : 'Error in password'});

                
                if(Valid) {

                    return res.status(200).send({ token: jwt.createToken(userFound)});
                
                }else {

                    return res.status(404).send({ report: 'The user its not valid'})
                    
                }
            })
        }
    })
}


module.exports = {
    Login
}