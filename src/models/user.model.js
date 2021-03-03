'use strict'

const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = Schema({
    user:String,
    password:String,
    role:String
})

module.exports = mongoose.model('User', UserSchema);