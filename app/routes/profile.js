/**
 * Created by prasanna_d on 7/19/2017.
 */
var express = require('express');
var router = express.Router();
var passport = require('../middleware/passport');

//Controllers
var profile = require('../controller/profile');
var settings = require('../controller/settings');

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

router.post(
    "/changePassword",
    passport.authenticate('jwt', {session :false}),
    function (req,res) {
        settings.changePassword(req,res);
    }
);

router.get(
    "/getAccountAndSettings",
    passport.authenticate('jwt', {session :false}),
    function (req,res) {
        settings.getAccountAndSettings(req,res);
    }
);

router.get(
    "/getProfileForEdit",
    passport.authenticate('jwt', {session :false}),
    function (req,res) {
        settings.getProfileForEdit(req,res);
    }
);

router.post(
    "/updateProfile",
    passport.authenticate('jwt', {session :false}),
    function (req,res) {
        settings.updateProfile(req,res);
    }
);

router.post(
    "/updateProfileSkillsTypes",
    passport.authenticate('jwt', {session :false}),
    function (req,res) {
        settings.updateProfileSkillsTypes(req,res);
    }
);

router.route('/getProfilePublic').get(profile.getProfilePublic);

module.exports = router;