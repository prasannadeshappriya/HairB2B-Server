var express = require('express');
var router = express.Router();

//Controllers
var dashboard = require('../controller/dashboard');
var login = require('../controller/auth/login');

//Routes
//Dashboard
router.route('/').get(dashboard.getIndexView);

//Login
router.route('/login').post(login.login);

module.exports = router;
