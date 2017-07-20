/**
 * Created by prasanna_d on 7/19/2017.
 */
var models = require('../../db/models');

function addProfileData(user_id,description,callback) {
    models.stylist.findOrCreate({
        where: {
            user_id: user_id
        },
        defaults: {
            user_id: user_id,
            description: description,
            rates: 0.0,
            order_completion: 0.0
        }
    }).spread(function(stylist, created){
        if(created){
            console.log('Stylist profile created for user_id: ' + user_id);
            return callback(true,stylist.id);
        }else {
            console.log('Stylist profile already exist for user_id: ' + user_id);
            return callback(false, 0);
        }
    }).catch(function(err){
        console.log('Error occurred: ', err);
        return callback(false, 0);
    });
}

module.exports = {
    createProfile : function (req, res) {
        var user_id = req.user.id;
        var description = req.body.description;
        var skills = req.body.skills;
        var job_type = req.body.job_types;
        var pament_email = req.body.payment_email;
        var price_job_types = req.body.price_job_types;

        addProfileData(
            user_id,
            description,
            function (callback, stylist_id) {
                if(callback){
                    var i=-1;
                    var j=-1;
                    for(i=0; i<skills.length; i++) {
                        models.user_skill.bulkCreate([
                            {user_id: stylist_id, skill_id: skills[i]}
                        ]).then(function (done) {
                            console.log('Skill insert success for user: ' + user_id + ' [Items: ' + i + ']');
                        }).catch(function (err) {
                            console.log('Error occurred while inserting skills data [user_skill]: ', err);
                        });
                    }
                    for(j=0; j<job_type.length; j++) {
                        models.user_jobtype.bulkCreate([
                            {user_id: stylist_id, job_id: skills[j], price: price_job_types[j]}
                        ]).then(function (done) {
                            console.log('Jobtype insert success for user: ' + user_id + ' [Items: ' + j + ']');
                        }).catch(function (err) {
                            console.log('Error occurred while inserting skills data [user_skill]: ', err);
                        });
                    }
                    setTimeout(function() {
                        models.user_role.bulkCreate([
                            {user_id: user_id, role_id: 1}
                        ]).then(function (done) {
                            console.log('Skill insert success for user: ' + user_id + ' [Items: ' + i + ']');
                            return res.status(200).send("Profile Created");
                        }).catch(function (err) {
                            console.log('Error occurred while inserting skills data [user_skill]: ', err);
                            return res.status(504).send("Server Error");
                        });
                    }, 1000);
                }else{
                    return res.status(504).send("Server Error");
                }
            }
        );


    },

    getProfile : function (req, res) {
        var user_id = req.user.id;
        console.log(user_id);
        models.user_role.findAll({
            where: {
                user_id: user_id
            }
        }).then(function(user_role){
            //No match for given email address
            if(user_role===null || user_role.length===0){
                console.log('i am now here');
                return res.status(404).json({error : "Profile Not found"});
            }
            return res.status(200).json({error : "found", status : "fail"});
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