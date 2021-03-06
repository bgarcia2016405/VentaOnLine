'use strict'

const mongoose = require("mongoose");
const app = require('./app');
const userModel = require('./src/models/user.model');
const categoryModel = require('./src/models/category.model');
const bcrypt = require("bcrypt-nodejs");

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/VentaOnline' , {useNewUrlParser:true, useUnifiedTopology: true}).then(()=>{
    var user = 'ADMIN';
    var password = '123456';
    var role = 'Administrador';
    var defaul = 'Default';
    var User = new userModel();
    var Category = new categoryModel();

    User.user = user;
    User.role = role;

    categoryModel.find({name:defaul},(err,categoryFound)=>{
        if(err) return console.log("category request error");

        if(categoryFound && categoryFound.length >= 1) return console.log('Category alredy exists');

        Category.name = defaul;

        Category.save((err,categorySave)=>{
            if (err) return console.log("save category request error");

            if(categorySave){
                return console.log(categorySave);
            }else{
                return console.log("not save category");
            }
        })

    })

    userModel.find({ user:User.user}).exec((err,userFound)=>{
        if(userFound && userFound.length >= 1) return console.log('The user already exists');

        bcrypt.hash(password, null, null, (err, encryptedPassword)=>{
            if(err) return console.log("password request error")

            User.password = encryptedPassword;

            User.save((err, userSave)=>{
                if(err) return console.log("save user request error")

                if(userSave){
                    return console.log(userSave);
                }else{
                    return console.log("not save the user")
                }
            })
        })
    })

    app.listen(3000, function(){
        console.log('Server Run')
    })
}).catch(err => console.log(err))