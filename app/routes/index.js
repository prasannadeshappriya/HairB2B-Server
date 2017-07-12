var express = require('express');
var passport = require('../middleware/passport');
var router = express.Router();

//Controllers
var dashboard = require('../controller/dashboard');

//Routes

//Dashboard
router.route('/').get(dashboard.getIndexView);

//Testing Purposes
router.post(
    "/test",
    passport.authenticate('jwt', {session :false}),
    function (req,res) {
        dashboard.test(req,res);
    }
);

module.exports = router;
