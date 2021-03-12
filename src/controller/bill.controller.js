'use strict'

const carModel = require("../models/car.model");
const billModel = require("../models/bill.model");
const productModel = require("../models/product.model");
const admin = 'Administrador';


function buy(req,res){
    var validation = req.user.sub;
    var BillModel = new billModel(); 
    carModel.findOne({user:validation},(err,carValidation)=>{
        var productList = carValidation.products;
        if(carValidation.total == 0) return res.status(404).send({report: 'Cart without products'})
        for (let i = 0; i < productList.length; i++) {
            productModel.findOne({_id:productList[i].productsID},(err,productFound)=>{
                let stok = productFound.stok;
                let amount = productList[i].amount;
                let sold = productFound.sold;
                if(stok < amount){
                    carModel.findOneAndUpdate({user:validation},{$pull:{products:{}}, total:0},(err,carFound)=>{
                    if(err) return res.status(404).send({report:'Error found car'})
                    if(carFound) return res.status(404).send({report:'product stok insufficient'});   
                    })
                }
                productModel.findByIdAndUpdate(productList[i].productsID,
                    {stok:stok-amount, sold: sold+amount}, (err,productUpdate)=>{
                        
                        carModel.findOneAndUpdate({user:validation},{$pull:{products:{}}, total:0},(err,carFound)=>{
                        BillModel.user = carFound.user;
                        BillModel.products = carFound.products;
                        BillModel.total = carFound.total;
                        
                        BillModel.save((err,billSave)=>{
                
                            return res.status(200).send(billSave)
                        })
                    })
                    });

            })
            
        }
    })
}

function showUserBill(req,res){
    var userID = req.params.userID
    var validation = req.user.sub;
    
    if(validation == admin) return res.status(400).send({report: 'You are not admin'});

    billModel.find({user:userID},(err,billFound)=>{
        if(err) return res.status(404).send({report: 'Error find bills'});

        if(billFound && billFound.length ==0) return res.status(402).send({report: 'You no have bills'});

        return res.status(200).send(billFound);
    }).populate('user products.productsID','name user')
}

function showProductsBill(req,res){
    var billID = req.params.billID;
    var validation = req.user.sub;

    if(validation == admin) return res.status(400).send({report: 'You are not admin'});

    billModel.findById(billID,(err,billFound)=>{
        if(err) return res.status(404).send({report: 'Error find bills'});

        if(!billFound) return res.status(402).send({report: 'Bill not exist'});

        return res.status(402).send(billFound);
    }).populate('products.productsID', 'name')
}



module.exports = {
    buy,
    showUserBill,
    showProductsBill,
}