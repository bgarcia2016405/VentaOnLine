'use strict'

const express = require("express");
const userController = require("../controller/user.controller");
var authentication = require("../middlewares/authenticated");

var api = express.Router();

api.post('/Login', userController.Login);

api.post('/addUser', authentication.ensureAuth, userController.add);

api.put('/editRole/:userID', authentication.ensureAuth, userController.editRole);

api.put('/editUser/:userID', authentication.ensureAuth, userController.edit);

api.delete('/deleteUser/:userID', authentication.ensureAuth, userController.drop);

module.exports = api;