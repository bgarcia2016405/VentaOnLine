'use strict'

const express = require("express");
const productModel = require("../controller/product.controller");
var authenticated = require("../middlewares/authenticated");


var api = express.Router();

api.post('/addProduct/:categoryID', authenticated.ensureAuth, productModel.add);

api.get('/show/:productID', authenticated.ensureAuth, productModel.show);

api.get('/showAllProduct', authenticated.ensureAuth, productModel.showAll);

module.exports = api;
