var express = require('express');
var router = express.Router();

//Controllers
var dashboard = require('../controller/dashboard');

//Routes
//Dashboard
router.route('/').get(dashboard.getIndexView);

module.exports = router;
