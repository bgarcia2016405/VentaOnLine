'use strict'

const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

///////////////////////////////////////////////////////////////

const user_rutes = require("./src/rutes/user.rutes");
const category_rutes = require("./src/rutes/category.rutes");
const product_rutes = require("./src/rutes/product.rutes");

//////////////////////////////////////////////////////////////

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/////////////////////////////////////////////////////////////

app.use(cors());

////////////////////////////////////////////////////////////

app.use('/api', user_rutes, category_rutes, product_rutes);

/////////////////////////////////////////////////////////////

module.exports = app;
