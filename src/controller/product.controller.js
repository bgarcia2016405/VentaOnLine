'use strinct'

const productModel = require("../models/product.model");
const admin = 'Administrador';

function add(req,res){
    var params = req.body;
    var categoryID = req.params.categoryID;
    var ProductModel = new productModel();
    var validation = req.user.role;

    if (validation != admin) return res.status(404).send({report: 'You are not admin'})

        if(params.nombre && params.stok){
            productModel.findOne({ name: params.nombre}).exec((err,productFound)=>{

                if(err) return res.status(404).send({report: 'Error in find product'});

                if(productFound){
                    return res.status(404).send({report: 'Product exist'})
                }else{
                    ProductModel.name = params.nombre;
                    ProductModel.category = categoryID;
                    ProductModel.stok = params.stok;
                    ProductModel.save((err,productSave)=>{
                        if(err) return res.status(404).send({report: 'Error in save product'});

                        if(!productSave) return res.status(402).send({report: 'unsaved product'});

                        return res.status(200).send(productSave);

                    })
                }

            })
        }
}


function show(req,res){
    var productID = req.params.productID;
    var validation = req.user.role;

    if(validation != admin) return res.status(404).send({report: 'You are not admin'});

    productModel.findById(productID,(err,productFound)=>{
        if(err) return res.status(404).send({mensaje: 'Error in find product'});

        if(!productFound) return res.status(402).send({report: 'Product not exist'});

        return res.status(200).send({productFound})
    }).populate('category')
}

function showAll(req,res){
    var validation = req.user.role;

    if(validation != admin) return res.status(404).send({report: 'You are not admin'});

    productModel.find((err,productsFound)=>{
        if(err) return res.status(404).send({report:'Error in found products'});

        return res.status(200).send(productsFound);
    }).populate('category')
}

module.exports = {
    add,
    show,
    showAll
}