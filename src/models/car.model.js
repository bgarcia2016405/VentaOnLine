'use strict'

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var CarSchema = Schema({
    user:{type: Schema.Types.ObjectId, ref:'User'},
    products:[{
        productsID: {type: Schema.Types.ObjectId, ref:'Product'},
        amount:Number,
        subTotal:Number
    }],
    total:Number
})

module.exports = mongoose.model('Car', CarSchema);