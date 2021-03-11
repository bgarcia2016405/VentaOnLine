'use strict'

const carModel = require("../models/car.model");
const billModel = require("../models/bill.model");
const admin = 'Administrador';


function buy(req,res){
    var validation = req.user.sub;
    var BillModel = new billModel(); 
    carModel.find({user:validation},(err,carValidation)=>{
        if(carValidation[0].total == 0) return res.status(404).send({report: 'Cart without products'})
        carModel.findOneAndUpdate({user:validation},{$pull:{products:{}}, total:0},(err,carFound)=>{
            BillModel.user = carFound.user;
            BillModel.products = carFound.products;
            BillModel.total = carFound.total;
            
            BillModel.save((err,billSave)=>{
    
                return res.status(200).send(billSave)
            })
        })
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