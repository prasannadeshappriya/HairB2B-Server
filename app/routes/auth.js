/**
 * Created by prasanna on 7/5/17.
 */
var express = require('express');
var router = express.Router();
var passport = require('../middleware/passport');

//Controllers
var login = require('../controller/auth/login');
var register = require('../controller/auth/register');

//User Auth routes
router.route('/register').post(register.register);

//Login
router.route('/login').post(login.login);

//Verify Email Address
router.route('/verify').get(register.verify);
router.post(
    "/getVerifyStatus",
    passport.authenticate('jwt', {session :false}),
    function (req,res) {
        register.getVerifyStatus(req,res);
    }
);

module.exports = router;