var express = require('express');
var router = express.Router();

//Controllers
var dashboard = require('../controller/dashboard');
var login = require('../controller/auth/login');
var register = require('../controller/auth/register');

//Routes
//Dashboard
router.route('/').get(dashboard.getIndexView);

//Login
router.route('/login').post(login.login);

//Register
router.route('/register').post(register.register);
router.route('/register/isexist').get(register.isUserExist);

module.exports = router;
