/**
 * Created by prasanna_d on 7/19/2017.
 */
var models = require('../../db/models');

module.exports = {
    getProfile : function (req, res) {
        var user_id = req.user.id;
        models.user_role.findAll({
            where: {
                user_id: user_id
            }
        }).then(function(user_role){
            console.log(user_role);
            //No match for given email address
            if(user_role===null || user_role.length===0){
                return res.status(404).json({error : "Profile Not found"});
            }
            console.log(user_role.length);
            return res.json({error : "found", status : "fail"});
            //Check the password with the hashed password
            // if(hashPass.verify(password,user.password)) {
            //     var token = jwt.sign({email : user.email}, config.secret,{
            //         expiresIn: 60*60*24   //Token expire in 24 Hours
            //     });
            //     var varify_status=0;
            //     if(user.verify){varify_status = 1;}
            //     return res.json({
            //         error: "Login Success",
            //         status: "success",
            //         firstname: user.firstname,
            //         lastname: user.lastname,
            //         verified: varify_status,
            //         token: token,
            //         email: email
            //     });
            // }
            // //Unauthorized access
            // return res.json({error : "Username or password is invalid", status : "fail"});
        }).catch(function(err){
            console.log('Error occured: ', err);
            return res.json({error : "Server error occurred", status : "fail"});
        });
    }
};