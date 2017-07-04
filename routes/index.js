var express = require('express');
var router = express.Router();

//Controllers
var dashboard = require('../controller/dashboard');
var login = require('../controller/login');

//Routes
//Dashboard
router.route('/').get(dashboard.getIndexView);

//Login
router.route('/test').post(login.test);

module.exports = router;
