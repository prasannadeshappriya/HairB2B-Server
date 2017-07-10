/**
 * Created by prasanna_d on 7/4/2017.
 */
var passhash = require('password-hash');
var models = require('../../../db/models');

module.exports = {
    register : function (req, res) {
        var first_name= req.body.firstname;
        var last_name= req.body.lastname;
        var email= req.body.email;
        var password = req.body.password;

        password = passhash.generate(password);
        models.user.findOrCreate({
            where: {
                email: email
            },
            defaults: {
                firstname: first_name,
                lastname: last_name,
                email: email,
                password: password}
        }).spread(function(user, created){
            if(created){
                return res.json({status : "success"});
            }
            return res.json({error : "User already exist", status : "fail"});
        }).catch(function(err){
            console.log('Error occured: ', err);
            return res.json({error : "Server error occurred", status : "fail"});
        });
    }
};


