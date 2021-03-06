'use strict'

const express = require("express");
const categoryController = require("../controller/category.controller");
var authenticated = require("../middlewares/authenticated");

var api = express.Router();

api.post('/addCategory', authenticated.ensureAuth, categoryController.add);

api.get('/showAllCategory', authenticated.ensureAuth, categoryController.showAll);

api.put('/editCategory/:categoryID', authenticated.ensureAuth, categoryController.edit);

api.delete('/deleteCategory/:categoryID', authenticated.ensureAuth, categoryController.drop);

module.exports = api;