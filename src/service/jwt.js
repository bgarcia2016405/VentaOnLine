'use strict'

var jwt = require("jwt-simple");
var moment = require("moment");
var secret = '@bhgg18_OnLineMark';

exports.createToken = function (user){
    var payload = {
        sub: user._id,
        user: user.user,
        role: user.role,
        iat: moment().unix(),
        exp: moment().day(10, 'days').unix()
    }

    return jwt.encode(payload, secret);

}