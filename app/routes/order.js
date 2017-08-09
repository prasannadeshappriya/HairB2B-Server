/**
 * Created by prasanna_d on 7/19/2017.
 */
const express = require('express');
const router = express.Router();
const passport = require('../middleware/passport');

//Controllers
let order = require('../controller/order');

router.get(
    "/getJobTypes",
    passport.authenticate('jwt', {session :false}),
    function (req,res) {
        order.getJobTypes(req,res);
    }
);

module.exports = router;