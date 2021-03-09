'use strict'

const express = require("express");
const billModel = require("../controller/bill.controller");
var authenticated = require("../middlewares/authenticated");

var api = express.Router();

api.post('/buyCar', authenticated.ensureAuth, billModel.buy);

module.exports = api;