'use strict'

const express = require("express");
const productModel = require("../controller/product.controller");
var authenticated = require("../middlewares/authenticated");


var api = express.Router();

api.post('/addProduct/:categoryID', authenticated.ensureAuth, productModel.add);

api.get('/show/:productID', authenticated.ensureAuth, productModel.show);

api.get('/showAllProduct', authenticated.ensureAuth, productModel.showAll);

api.put('/editProduct/:productID', authenticated.ensureAuth, productModel.edit);

api.delete('/dropProduct/:productID', authenticated.ensureAuth, productModel.drop);

api.get('/productSoldOut', authenticated.ensureAuth, productModel.productsSoldOut);

api.get('/productsMostSold', authenticated.ensureAuth, productModel.productsMostSold);

api.get('/findProductName', authenticated.ensureAuth, productModel.productName);

api.get('/findProductCategory', authenticated.ensureAuth, productModel.productCategory);

module.exports = api;
