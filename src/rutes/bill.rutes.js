'use strict'

const express = require("express");
const billModel = require("../controller/bill.controller");
var authenticated = require("../middlewares/authenticated");

var api = express.Router();

api.post('/buyCar', authenticated.ensureAuth, billModel.buy);

api.get('/showUserBills/:userID', authenticated.ensureAuth, billModel.showUserBill);

api.get('/showProducBills/:billID', authenticated.ensureAuth, billModel.showProductsBill)



module.exports = api;