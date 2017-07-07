var express = require('express');
var router = express.Router();

//Controllers
var dashboard = require('../controller/dashboard');

//Routes
//Dashboard
router.route('/').get(dashboard.getIndexView);

//Testing Purposes
router.route('/test').post(dashboard.test);

module.exports = router;
