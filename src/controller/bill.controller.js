'use strict'

const carModel = require("../models/car.model");
const billModel = require("../models/bill.model");

function buy(req,res){
    var validation = req.user.sub;
    var BillModel = new billModel(); 
    carModel.findOneAndUpdate({user:validation},{$pull:{products:{}}},(err,carFound)=>{
        BillModel.user = carFound.user;
        BillModel.products = carFound.products;
        
        BillModel.save((err,billSave)=>{

            return res.status(200).send(billSave)
        })
    })
}

module.exports = {
    buy
}