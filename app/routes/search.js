/**
 * Created by prasanna on 7/5/17.
 */
const express = require('express');
const router = express.Router();

//Controllers
const search = require('../controller/search');

//User Auth routes
router.route('/simplesearch').get(search.getSimpleSearchResults);
router.route('/dynamicsearch').get(search.getDynamicSearchResults);

module.exports = router;