/**
 * Created by prasanna on 7/5/17.
 */
var express = require('express');
var router = express.Router();

//Controllers
var login = require('../controller/auth/login');
var register = require('../controller/auth/register');

//User Auth routes
router.route('/register').post(register.register);

//Login
router.route('/login').post(login.login);

module.exports = router;