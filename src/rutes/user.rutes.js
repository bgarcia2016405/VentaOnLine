'use strict'

const express = require("express");
const userController = require("../controller/user.controller");
var authentication = require("../middlewares/authenticated");

var api = express.Router();

api.post('/Login', userController.Login);

module.exports = api;