'use strict'

const { update } = require("../models/category.model");
const categoryModel = require("../models/category.model");
const productModel = require("../models/product.model");
const admin = 'Administrador';

function add(req,res){
    var params = req.body;
    var CategoryModel = new categoryModel();
    var validation = req.user.role;

    if(validation == admin){
        if(params.nombre){
            categoryModel.findOne({ name: params.nombre }).exec((err,categoryFound)=>{
                if(err) return res.status(404).send({report: 'Error in find category'});

                if(categoryFound){
                    return res.status(404).send({report: 'Category exist'});
                }else{
                    CategoryModel.name = params.nombre;

                    CategoryModel.save((err, categorySave)=>{
                        if(err) return res.status(404).send({report: 'Error in save category'});

                        if(!categorySave) return res.status(402).send({report: 'unsaved category'});

                        return res.status(200).send(categorySave);
                    })
                }
            })
        }
    }else{
        return res.status(404).send({report: 'You are not admin'})
    }
}

function showAll(req,res){
    var validation = req.user.role;

    if(validation == admin){
        categoryModel.find((err,categoryFound)=>{

            if(err) return res.status(404).send({report: 'Error find categories'});

            if(!categoryFound) return res.status(402).send({report: 'categories not exist'})
            
            return res.status(200).send(categoryFound);

        })
    }else{
        return res.status(404).send({report: 'You are not admin'})
    }
    
}

function edit(req,res){
    var categoryID = req.params.categoryID;
    var validation = req.user.role;
    var params = req.body

    if(validation == admin){
        categoryModel.findByIdAndUpdate(categoryID,{name:params.nombre},{ new: true, useFindAndModify:false}, (err,categoryUpdate)=>{

            if(err) return res.status(404).send({report: 'Erro in update category'});

            if(!categoryUpdate) return res.status(404).send({report: 'category not exist'});

            return res.status(200).send(categoryUpdate);
        })
    }else{
        return res.status(404).send({report: 'You are not admin'})
    }

    
}

function drop(req,res){
    var defaul = 'Default';
    var Category = new categoryModel();
    var categoryID = req.params.categoryID;
    var validation = req.user.role;
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
    if(validation != admin) return res.status(404).send({report: 'You are not admin'})
    categoryModel.findOne({name:"Default"},(err,defaultFound)=>{
        categoryModel.findByIdAndDelete(categoryID,(err,categoryDelete)=>{
            if(err) return res.status(404).send({report:'Error in delete category'});
            productModel.find({category:categoryID}).exec((err,productFound)=>{
                productFound.forEach((newCategory)=>{
                    productModel.findByIdAndUpdate(newCategory._id,{category:defaultFound},(err,elim)=>{
                    })
                })
            })
            return res.status(200).send(categoryDelete)
            
        })
    })
}


module.exports = {
    add,
    showAll,
    edit,
    drop
}