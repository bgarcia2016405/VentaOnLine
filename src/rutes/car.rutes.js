'use strict'

const express = require("express");
const carController = require("../controller/car.controller");
const authenticated = require("../middlewares/authenticated");

var api = express.Router();

api.post('/addProductCar', authenticated.ensureAuth, carController.addProduct);

module.exports = api;