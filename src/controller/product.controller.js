'use strinct'

const productModel = require("../models/product.model");
const categoryModel = require("../models/category.model");
const admin = 'Administrador';

function add(req,res){
    var params = req.body;
    var categoryID = req.params.categoryID;
    var ProductModel = new productModel();
    var validation = req.user.role;

    if (validation != admin) return res.status(404).send({report: 'You are not admin'})

        categoryModel.findById(categoryID,(err,categoryFound)=>{
            if(err) return res.status(404).sedn({report:'Error find category'});

            if (!categoryFound) return res.status(402).send({report:'Category dont exist'});

            if(params.nombre && params.stok && params.precio){
                productModel.findOne({ name: params.nombre}).exec((err,productFound)=>{
    
                    if(err) return res.status(404).send({report: 'Error in find product'});
    
                    if(productFound){
                        return res.status(404).send({report: 'Product exist'})
                    }else{
                        ProductModel.name = params.nombre;
                        ProductModel.category = categoryID;
                        ProductModel.stok = params.stok;
                        ProductModel.price = params.precio;
                        ProductModel.sold = 0;
                        ProductModel.save((err,productSave)=>{
                            if(err) return res.status(404).send({report: 'Error in save product'});
    
                            if(!productSave) return res.status(402).send({report: 'unsaved product'});
    
                            return res.status(200).send(productSave);
    
                        })
                    }
    
                })
            }else{return res.status(404).send({report:'hola'})}

        })

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

function edit(req,res){
    var validation = req.user.role;
    var params = req.body;
    var productID = req.params.productID;

    if(validation != admin ) return res.status(404).send({report: 'You are not admin'});

    categoryModel.findById(params.category,(err,categoryFound)=>{
        if(err) return res.status(404).send({report: 'Error in find category'});

        if(!categoryFound) return res.status(403).send({report: 'Category not exist'})
    })

    productModel.findByIdAndUpdate(productID,params,{new:true},(err,productUpdate)=>{
        if(err) return res.status(404).send({report: 'Erro find product'})

        if(!productUpdate) return res.status(402).send({report: 'Product dont exist'});

        return res.status(200).send(productUpdate);
    })

}

function drop(req,res){
    var validation = req.user.role;
    var productID = req.params.productID;

    if(validation != admin) return res.status(402).send({report: 'You are not admin'});

    productModel.findByIdAndDelete(productID,(err,productDrop)=>{
        if(err) return res.status(404).send({report:'Error in delete product'});

        if(!productDrop) return res.status(402).send({report: 'product dont exist'});

        return res.status(200).send(productDrop);
    })

}

module.exports = {
    add,
    show,
    showAll,
    edit,
    drop
}