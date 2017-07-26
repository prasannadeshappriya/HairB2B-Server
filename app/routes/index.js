const express = require('express');
const passport = require('../middleware/passport');
const router = express.Router();

//Controllers
const dashboard = require('../controller/dashboard');

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
