/**
 * Created by prasanna_d on 7/25/2017.
 */
var models = require('../../db/models');
var passhash = require('password-hash');

module.exports = {
    changePassword: function (req, res) {
        var user_id = req.user.id;
        var email = req.user.email;
        var cPassword = req.body.curPassword;
        var nPassword = req.body.newPassword;
        models.user.findAll({
            where: {
                id: user_id
            }
        }).then(function(user){
            //No match for given email address
            if(user===null || user.length===0){
                return res.status(404).json({error : "User not found!"});
            }
            if(passhash.verify(cPassword,user[0].dataValues.password)){
                var newPassword = passhash.generate(nPassword);
                models.user.update({
                        password: newPassword}, {
                        where: {
                            id: user_id,
                            email: email
                        }
                    }
                ).spread(function (status) {
                    if(status){
                        return res.status(200).json({message : "Password changed successfully"});
                    }else{
                        return res.status(504).json({error : "Server error occurred"});
                    }
                }).catch(function (err) {
                    console.log('Error occurred while processing the request: ' + err);
                    return res.send("Server Error");
                });
            }else {
                return res.status(401).json({error: "Invalid old password!"});
            }
        }).catch(function(err){
            console.log('Error occurred: ', err);
            return res.status(504).json({error : "Server error occurred"});
        });
    },
};