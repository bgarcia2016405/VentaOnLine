'use strict'

const carModel = require("../models/car.model");
const productModel = require("../models/product.model");

function addProduct(req,res){
    var validation = req.user.sub;
    var params = req.body;

    productModel.findOne({name: {$regex:params.producto, $options: 'i'}}).exec((err,productFound)=>{
        if(err) return res.status(404).send({report: 'Error find product'});
        if(!productFound) return res.status(404).send({report: 'Product dont exist'});
        if(productFound.stok < params.cantidad) return res.status(404).send({report: 'theres not enough product'});
        
        var price= productFound.price;
    carModel.findOneAndUpdate({user:validation},
        { $push: { products: {
            productsID: productFound._id,
            amount: params.cantidad,
            subTotal: price * params.cantidad
        }}},{new:true},(err,carFound)=>{
            if(err) return res.status(404).send({report: 'Error agregate product'});

            if(!carFound) return res.status(404).send({report: 'Car dont exist'});

              var stok=productFound.stok;
              var sold=productFound.sold;
              var total=carFound.total;
              var subTotal=price * params.cantidad;
              var integer = parseInt(params.cantidad, 10);

                productModel.findByIdAndUpdate(params.producto,{stok:stok-params.cantidad,sold:sold+integer},(err,productUpdate)=>{
                })
                carModel.findOneAndUpdate({user:validation},{total:total+subTotal},{new:true},(err,uptadated)=>{
                    return res.status(200).send(uptadated)    
                })  
            })
    })
}


module.exports = {
    addProduct
}