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
        //var pament_email = req.body.payment_email;
        var price_job_types = req.body.price_job_types;

        addProfileData(
            user_id,
            description,
            function (callback, stylist_id) {
                if(callback){
                    var user_skill_obj = [];
                    var job_type_obj = [];
                    for(var i=0; i<skills.length; i++) {
                        user_skill_obj.push({user_id: stylist_id, skill_id: skills[i]});
                    }
                    for(var j=0; j<job_type.length; j++) {
                        job_type_obj.push({user_id: stylist_id, job_id: job_type[j], price: price_job_types[j]});
                    }
                    setTimeout(function() {
                        models.user_skill.bulkCreate(user_skill_obj).then(function (done) {
                            console.log('Skill insert success for user: ' + user_id + ' [Items: ' + i + ']');
                        }).catch(function (err) {
                            console.log('Error occurred while inserting skills data [user_skill]: ', err);
                        });
                        models.user_jobtype.bulkCreate(job_type_obj).then(function (done) {
                            console.log('Jobtype insert success for user: ' + user_id + ' [Items: ' + j + ']');
                        }).catch(function (err) {
                            console.log('Error occurred while inserting Jobtype data [Jobtype]: ', err);
                        });
                    },1000);
                    setTimeout(function() {
                        models.user_role.bulkCreate([
                            {user_id: user_id, role_id: 1}
                        ]).then(function (done) {
                            return res.status(200).send("Profile Created");
                        }).catch(function (err) {
                            console.log('Error occurred: ', err);
                            return res.status(504).send("Server Error");
                        });
                    }, 1200);
                }else{
                    return res.status(504).send("Server Error");
                }
            }
        );


    },

    getProfileStatus : function (req, res) {
        var user_id = req.user.id;
        models.user_role.findAll({
            where: {
                user_id: user_id
            }
        }).then(function(user_role){
            //No match for given email address
            if(user_role===null || user_role.length===0){
                return res.status(404).json({error : "Profile Not found"});
            }
            return res.status(200).json({error : "Profile for user: " + user_id});
        }).catch(function(err){
            console.log('Error occurred: ', err);
            return res.status(504).json({error : "Server error occurred"});
        });
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
                return res.status(404).json({error : "Profile Not found"});
            }
            models.stylist.findOne(
                {where: {user_id: user_id}}
            ).then(function (stylist) {
                return res.status(200).json(
                    {description: stylist.dataValues.description}
                );
            }).catch(function(err){
                console.log('Error occurred: ', err);
                return res.status(504).json({error : "Server error occurred"});
            });
        }).catch(function(err){
            console.log('Error occurred: ', err);
            return res.status(504).json({error : "Server error occurred"});
        });
    }
};