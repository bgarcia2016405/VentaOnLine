'use strict'

const carModel = require("../models/car.model");
const productModel = require("../models/product.model");
const { param } = require("../rutes/car.rutes");

function addProduct(req,res){
    var validation = req.user.sub;
    var params = req.body;

    productModel.findById(params.producto).exec((err,productFound)=>{
        var price= productFound.price;
    carModel.findOneAndUpdate({user:validation},
        { $push: { products: {
            productsID: params.producto,
            amount: params.cantidad,
            subTotal: price * params.cantidad
        }}},{new:true},(err,carFound)=>{
            if(err) return res.status(404).send({report: 'Error agregate product'});

           
              var stok=productFound.stok;
              var sold=productFound.sold
                productModel.findByIdAndUpdate(params.producto,{stok:stok-params.cantidad,sold:sold+params.cantidad},(err,HOLAEFA)=>{

                    

                })
                return res.status(200).send(carFound)    
            })
            
        
    })
}


module.exports = {
    addProduct
}