/**
 * Created by prasanna on 7/23/17.
 */
var models = require('../../db/models');

module.exports = {
    getSimpleSearchResults: function (req, res) {
        var skill_id = req.query.skillid;
        var type_id = req.query.typeid;

        var user_jobtypes = [];

        if(skill_id==='all' && type_id==='all'){
            models.user_jobtype.findAll().
            then(function(user_job_types){
                user_jobtypes = user_job_types;
                models.stylist.findAll().
                then(function(stylists){
                    var users = [];
                    for(var i=0; i<stylists.length; i++){
                        models.users.findAll({
                            where: {
                                id: stylists[i].dataValues.user_id
                            }
                        }).then(function(arrUsers){
                            users.push(arrUsers);
                        }).catch(function(err){
                            console.log('Error occurred: ', err);
                            return res.status(504).json({error : "Server error occurred"});
                        });
                    }
                    setTimeout(function () {
                        return res.status(200).json({
                            users: users,
                            stylists: stylists,
                            user_types: user_job_types
                        });
                    },250);
                }).catch(function(err){
                    console.log('Error occurred: ', err);
                    return res.status(504).json({error : "Server error occurred"});
                });
            }).catch(function(err){
                console.log('Error occurred: ', err);
                return res.status(504).json({error : "Server error occurred"});
            });
        }else if(skill_id==='all' && typeof type_id!=='undefined'){
            models.user_jobtype.findAll({
                where: {
                    job_id: type_id
                }
            }).then(function(user_jobtypes){
                var stylists = [];
                for(var i=0; i<user_jobtypes.length; i++){
                    models.stylist.findAll({
                        where: {
                            id: user_jobtypes[i].dataValues.user_id
                        }
                    }).then(function(arrStylists){
                        stylists.push(arrStylists);
                    }).catch(function(err){
                        console.log('Error occurred: ', err);
                        return res.status(504).json({error : "Server error occurred"});
                    });
                }
                setTimeout(function () {
                    var users = [];
                    for(var i=0; i<stylists.length; i++){
                        models.users.findAll({
                            where: {
                                id: stylists[i][0].dataValues.user_id
                            }
                        }).then(function(arrUsers){
                            users.push(arrUsers);
                        }).catch(function(err){
                            console.log('Error occurred: ', err);
                            return res.status(504).json({error : "Server error occurred"});
                        });
                    }
                    setTimeout(function () {
                        return res.status(200).json({
                            users: users,
                            stylists: stylists,
                            user_types: user_jobtypes
                        });
                    },250);
                },250);
            }).catch(function(err){
                console.log('Error occurred: ', err);
                return res.status(504).json({error : "Server error occurred"});
            });
        }else if(typeof skill_id!=='undefined' && type_id==='all'){
            models.user_skill.findAll({
                where: {
                    skill_id: skill_id
                }
            }).then(function(user_skill){
                var stylists = [];
                var user_jobtypes_arr = [];
                for(var i=0; i<user_skill.length; i++){
                    models.stylist.findAll({
                        where: {
                            id: user_skill[i].dataValues.user_id
                        }
                    }).then(function(arrStylists){
                        stylists.push(arrStylists);
                    }).catch(function(err){
                        console.log('Error occurred: ', err);
                        return res.status(504).json({error : "Server error occurred"});
                    });
                }
                for(var j=0; j<user_skill.length; j++){
                    models.user_jobtype.findAll({
                        where: {
                            user_id: user_skill[j].dataValues.user_id
                        }
                    }).then(function(user_jobtype){
                        user_jobtypes_arr.push(user_jobtype);
                    }).catch(function(err){
                        console.log('Error occurred: ', err);
                        return res.status(504).json({error : "Server error occurred"});
                    });
                }
                setTimeout(function () {
                    var users = [];
                    console.log(stylists);
                    for(var i=0; i<stylists.length; i++){
                        try {
                            models.users.findAll({
                                where: {
                                    id: stylists[i][0].dataValues.user_id
                                }
                            }).then(function (arrUsers) {
                                users.push(arrUsers);
                            }).catch(function (err) {
                                console.log('Error occurred: ', err);
                                return res.status(504).json({error: "Server error occurred"});
                            });
                        }catch (err){
                            console.log('Error occurred: ', err);
                        }
                    }
                    setTimeout(function () {
                        return res.status(200).json({
                            users: users,
                            stylists: stylists,
                            user_types: user_jobtypes_arr
                        });
                    },250);
                },300);
            }).catch(function(err){
                console.log('Error occurred: ', err);
                return res.status(504).json({error : "Server error occurred"});
            });
        }else if(typeof skill_id!=='undefined' && typeof type_id!=='undefined'){
            models.user_skill.findAll({
                where: {
                    skill_id: skill_id
                }
            }).then(function(user_skill){
                var stylists = [];
                var user_jobtypes_arr = [];
                for(var j=0; j<user_skill.length; j++){
                    models.user_jobtype.findAll({
                        where: {
                            user_id: user_skill[j].dataValues.user_id,
                            job_id: type_id
                        }
                    }).then(function(user_jobtype){
                        user_jobtypes_arr.push(user_jobtype);
                    }).catch(function(err){
                        console.log('Error occurred: ', err);
                        return res.status(504).json({error : "Server error occurred"});
                    });
                }
                setTimeout(function () {
                    for(var i=0; i<user_jobtypes_arr.length; i++){
                        try {
                            models.stylist.findAll({
                                where: {
                                    id: user_jobtypes_arr[0][i].dataValues.user_id
                                }
                            }).then(function (arrStylists) {
                                stylists.push(arrStylists);
                            }).catch(function (err) {
                                console.log('Error occurred: ', err);
                                return res.status(504).json({error: "Server error occurred"});
                            });
                        }catch (err){
                            console.log('Error on getting query data');
                        }
                    }
                    setTimeout(function () {
                        var users = [];
                        for(var i=0; i<stylists.length; i++){
                            models.users.findAll({
                                where: {
                                    id: stylists[0][i].dataValues.user_id
                                }
                            }).then(function(arrUsers){
                                users.push(arrUsers);
                            }).catch(function(err){
                                console.log('Error occurred: ', err);
                                return res.status(504).json({error : "Server error occurred"});
                            });
                        }
                        setTimeout(function () {
                            return res.status(200).json({
                                users: users,
                                stylists: stylists,
                                user_types: user_jobtypes_arr
                            });
                        },250);
                    },300);
                },250);
            }).catch(function(err){
                console.log('Error occurred: ', err);
                return res.status(504).json({error : "Server error occurred"});
            });
        }else{
            return res.status(504).json({error : "Parameters are required"});
        }
    }
};