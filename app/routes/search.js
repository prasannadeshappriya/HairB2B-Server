/**
 * Created by prasanna on 7/5/17.
 */
var express = require('express');
var router = express.Router();

//Controllers
var search = require('../controller/search');

//User Auth routes
router.route('/simplesearch').get(search.getSimpleSearchResults);

module.exports = router;