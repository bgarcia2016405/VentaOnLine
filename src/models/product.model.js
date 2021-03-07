'use strict'

const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var productSchema = Schema({
    name:String,
    category: {type: Schema.Types.ObjectId, ref:'Category'},
    stok:Number,
    price:Number,
    sold:Number
})

module.exports = mongoose.model('Product', productSchema);