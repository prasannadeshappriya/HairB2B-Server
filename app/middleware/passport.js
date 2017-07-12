/**
 * Created by prasanna_d on 7/12/2017.
 */
var passport = require("passport");
var passportJWT = require("passport-jwt");

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var config = require('../../config/config');
var models = require('../../db/models');

var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = config.secret;

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    console.log('Request Received', jwt_payload);
    models.user.findOne({
        where: {
            email: jwt_payload.email
        }
    }).then(function(user){
        if (user) {
            next(null, user);
        } else {
            next(null, false);
        }
    }).catch(function(err){
        console.log('Error occured: ', err);
        return res.json({error : "Server error occurred", status : "fail"});
    });
});

passport.use(strategy);
module.exports = passport;