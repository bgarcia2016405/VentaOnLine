'use strict'

const bcrypt = require("bcrypt-nodejs");
const jwt = require('../service/jwt');
const userModel = require("../models/user.model");
const carModel = require("../models/car.model");
const admin = 'Administrador';
const user = 'Cliente'

function Login(req,res){
    var params = req.body;
    var CarModel = new carModel();
  
     userModel.findOne({ user : params.usuario }, (err, userFound)=>{
         if (err) return res.status(404).send({ report: 'Error at Login'});

         if(!userFound) return res.status(404).send({ report: 'user dosent exist'});

         if (userFound){

            carModel.find({user:userFound._id},(err,carFound)=>{
                if(err) return res.status(404).send('Error find car');

                if(carFound.length == 0){
                    CarModel.user = userFound._id;
                    CarModel.total = 0;
                    CarModel.save();
                }
                
                bcrypt.compare(params.password, userFound.password, (err,Valid)=>{

                    if(err) return res.status(404).send({ report : 'Error in password'});
    
                     if(Valid) {
    
                         return res.status(200).send({ token: jwt.createToken(userFound)});
                    
                     }else {
    
                        return res.status(404).send({ report: 'The user its not valid'})
                        
                     }
                 })
            })
        }
     })
}

function add(req,res){
   var params = req.body;
   var UserModel = new userModel();
   var validation = req.user.role;
   if (validation == admin){
    if(params.usuario && params.password && params.rol){
        userModel.findOne({ user : params.usuario }).exec((err,userFound)=>{
            if (err) return res.status(404).send({ report: 'Error in find user'})
    
            if (userFound){
                    return res.status(200).send({report: 'User exist'})
            }else{
                    UserModel.user = params.usuario;
                    UserModel.role = params.rol
                    bcrypt.hash(params.password, null, null, (err, encryptedPassword)=>{
                        if (err) return res.status(200).send({report: 'password request error'});
                           
                            UserModel.password = encryptedPassword;
                            
                            UserModel.save((err, userSave)=>{
                                if(err) return res.status(404).send({report: 'Error in save user'});

                                if(!userSave) return res.status(402).send({report: 'unsaved user'})

                                return res.status(200).send(userSave)
                            })
                           
                    })

                }

        })

     }

    }else{

        return res.status(404).send({report: 'You are not admin'})

    }
    
}

function createUser(req,res){
    var params = req.body;
    var UserModel = new userModel();

    delete params.rol

    if(params.usuario && params.password){
        userModel.findOne({ user : params.usuario}).exec((err,userFound)=>{

            if(err) return res.status(404).send({report: 'Error in find user'});

            if(userFound){
                return res.status(202).send({report: 'User exist'});
            
            }else{
                UserModel.user = params.usuario;
                UserModel.role = user;
                bcrypt.hash(params.password, null, null, (err, encryptedPassword)=>{

                    if(err) return res.status(404).send({report: 'password request error'});

                    if(!encryptedPassword) return res.status(202).send({report: 'password dont encrypted'})

                    UserModel.password = encryptedPassword;

                    UserModel.save((err, userSave)=>{
                        if(err) return res.status(404).send({report: 'user resquest error'});

                        if(!userSave) return res.status(202).send({report: 'user dont save'});

                        return res.status(200).send(userSave)
                    })
                })
            }

        })
    }else{
        return res.status(404).send({report: 'unfilled data'})
    }
}


function editRole(req,res){
    var params = req.body;
    var validation = req.user.role;
    var userID = req.params.userID;

    if(validation == admin){

        userModel.findOneAndUpdate({_id : userID,role : user},{role:params.rol},{ new: true, useFindAndModify:false },(err,userUpdate)=>{
        
            if(err) return res.status(404).send({report: 'Error in update user'})

            if(!userUpdate) return res.status(404).send({report: 'user is admin'})

            return res.status(200).send(userUpdate);
        })

    }else{
        return res.status(404).send({report:'You are not admin'})
    }
    

}

function edit(req,res){
    var params = req.body;
    var validation = req.user.role;
    var userID = req.params.userID;

    if(validation == admin){
        userModel.findOneAndUpdate({_id:userID, role:user},{user:params.Usuario},{ new: true, useFindAndModify: false},(err,userFound)=>{
            
            if(err) return res.status(404).send({report: 'Error in update user'})

            
            if(!userFound) return res.status(404).send({report: 'user is admin'})

            return res.status(200).send(userFound);                                             
        })                                                                             
    }else{
        return res.status(404).send({return:'You are not admin'})
    }
}

function drop(req,res){
    var userID = req.params.userID;
    var validation = req.user.role;

    if(validation == admin){
        userModel.findByIdAndDelete(userID, (err, userDeleted)=>{

            if(err) return res.status(404).send({report: 'Error in delete user'});

            if(!userDeleted) return res.status(404).send({report: 'user is a admin'});

            return res.status(200).send(userDeleted);

        });

    }else{
        return res.status(404).send({return:'You are not admin'})
    }

}

module.exports = {
    Login,
    add,
    editRole,
    edit,
    drop,
    createUser
}