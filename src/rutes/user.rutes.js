'use strict'

const express = require("express");
const userController = require("../controller/user.controller");
var authentication = require("../middlewares/authenticated");

var api = express.Router();

api.post('/Login', userController.Login);

api.post('/add', authentication.ensureAuth, userController.add);

api.post('/createUser', userController.createUser);

api.put('/editRole/:userID', authentication.ensureAuth, userController.editRole);

api.put('/editUser/:userID', authentication.ensureAuth, userController.edit);

api.delete('/deleteUser/:userID', authentication.ensureAuth, userController.drop);

api.put('/editSameUser', authentication.ensureAuth, userController.editSameUser);

api.delete('/dropSameUser', authentication.ensureAuth, userController.dropSameUser);

module.exports = api;