/**
 * Created by prasanna_d on 7/19/2017.
 */
var express = require('express');
var router = express.Router();
var passport = require('../middleware/passport');

//Controllers
var profile = require('../controller/profile');

router.get(
    "/getProfile",
    passport.authenticate('jwt', {session :false}),
    function (req,res) {
        profile.getProfile(req,res);
    }
);

//Check weather user has a profile or not
router.get(
    "/getProfileStatus",
    passport.authenticate('jwt', {session :false}),
    function (req,res) {
        profile.getProfileStatus(req,res);
    }
);

router.post(
    "/createProfile",
    passport.authenticate('jwt', {session :false}),
    function (req,res) {
        profile.createProfile(req,res);
    }
);

module.exports = router;