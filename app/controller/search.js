/**
 * Created by prasanna on 7/23/17.
 */
var models = require('../../db/models');

module.exports = {
    getSimpleSearchResults: async function (req, res) {
        let skill_id = req.query.skillid;
        let type_id = req.query.typeid;

        let user_jobtypes = [];

        if (skill_id === 'all' && type_id === 'all') {
            try {
                let user_job_types = await models.user_jobtype.findAll();
                let stylists = await models.stylist.findAll();

                let users = [];
                for (let i = 0; i < stylists.length; i++) {
                    try {
                        let arrUsers = await models.user.findAll({
                            where: {
                                id: stylists[i].dataValues.user_id
                            }
                        });
                        if (arrUsers) {
                            users.push(arrUsers);
                        }
                    } catch (err) {
                        console.log('Error occurred: ', err);
                        return res.status(504).json({error: "Server error occurred"});
                    }
                }

                return res.status(200).json({
                    users: users,
                    stylists: stylists,
                    user_types: user_job_types
                });
            } catch (err) {
                console.log('Error occurred: ', err);
                return res.status(504).json({error: "Server error occurred"});
            }
        } else if (skill_id === 'all' && typeof type_id !== 'undefined') {
            try {
                let user_jobtypes = await models.user_jobtype.findAll({
                    attributes: [[models.sequelize.fn('DISTINCT', models.sequelize.col('user_id')),'user_id'], 'job_id', 'price'],
                    where: {
                        job_id: type_id
                    }
                });

                let stylists = [];
                for (let i = 0; i < user_jobtypes.length; i++) {
                    try {
                        let arrStylists = await models.stylist.findAll({
                            where: {
                                id: user_jobtypes[i].dataValues.user_id
                            }
                        });
                        if (arrStylists) {
                            stylists.push(arrStylists);
                        }
                    } catch (err) {
                        console.log('Error occurred: ', err);
                        return res.status(504).json({error: "Server error occurred"});
                    }
                }

                let users = [];
                for (let i = 0; i < stylists.length; i++) {
                    try {
                        arrUsers = await models.user.findAll({
                            where: {
                                id: stylists[i][0].dataValues.user_id
                            }
                        });
                        if (arrUsers) {
                            users.push(arrUsers);
                        }
                    } catch (err) {
                        console.log('Error occurred: ', err);
                        return res.status(504).json({error: "Server error occurred"});
                    }
                }

                return res.status(200).json({
                    users: users,
                    stylists: stylists,
                    user_types: user_jobtypes
                });
            } catch (err) {
                console.log('Error occurred: ', err);
                return res.status(504).json({error: "Server error occurred"});
            }
        } else if (typeof skill_id !== 'undefined' && type_id === 'all') {
            try {
                let user_skill = await models.user_skill.findAll({
                    attributes: [[models.sequelize.fn('DISTINCT', models.sequelize.col('user_id')),'user_id'], 'skill_id'],
                    where: {skill_id: skill_id}
                });
                let stylists = [];
                let user_jobtypes_arr = [];

                for (let i = 0; i < user_skill.length; i++) {
                    try {
                        let arrStylists = await models.stylist.findAll({
                            where: {
                                id: user_skill[i].dataValues.user_id
                            }
                        });
                        if (arrStylists) {
                            stylists.push(arrStylists);
                        }
                    } catch (err) {
                        console.log('Error occurred: ', err);
                        return res.status(504).json({error: "Server error occurred"});
                    }
                }
                for (let j = 0; j < user_skill.length; j++) {
                    try {
                        let user_jobtype = await models.user_jobtype.findAll({
                            where: {
                                user_id: user_skill[j].dataValues.user_id
                            }
                        });
                        if (user_jobtype) {
                            user_jobtypes_arr.push(user_jobtype);
                        }
                    } catch (err) {
                        console.log('Error occurred: ', err);
                        return res.status(504).json({error: "Server error occurred"});
                    }
                }

                let users = [];
                for (let i = 0; i < stylists.length; i++) {
                    try {
                        let arrUsers = await models.user.findAll({
                            where: {
                                id: stylists[i][0].dataValues.user_id
                            }
                        });
                        if (arrUsers) {
                            users.push(arrUsers);
                        }
                    } catch (err) {
                        console.log('Error occurred: ', err);
                        return res.status(504).json({error: "Server error occurred"});
                    }
                }
                return res.status(200).json({
                    users: users,
                    stylists: stylists,
                    user_types: user_jobtypes_arr
                });
            } catch (err) {
                console.log('Error occurred: ', err);
                return res.status(504).json({error: "Server error occurred"});
            }
        } else if (typeof skill_id !== 'undefined' && typeof type_id !== 'undefined') {
            try {
                let user_skill = await models.user_skill.findAll({
                    attributes: [[models.sequelize.fn('DISTINCT', models.sequelize.col('user_id')),'user_id'], 'skill_id'],
                    where: {
                        skill_id: skill_id
                    }
                });
                let stylists = [];
                let user_jobtypes_arr = [];
                for (let j = 0; j < user_skill.length; j++) {
                    try {
                        let user_jobtype = await models.user_jobtype.findAll({
                            where: {
                                user_id: user_skill[j].dataValues.user_id,
                                job_id: type_id
                            }
                        });
                        if (user_jobtype) {
                            user_jobtypes_arr.push(user_jobtype);
                        }

                    } catch (err) {
                        console.log('Error occurred: ', err);
                        return res.status(504).json({error: "Server error occurred"});
                    }
                }
                for (let i = 0; i < user_jobtypes_arr.length; i++) {
                    try {
                        let user_id;
                        if(!(typeof user_jobtypes_arr[0][i]==='undefined')){user_id=user_jobtypes_arr[0][i].dataValues.user_id;}
                        else if(!(typeof user_jobtypes_arr[i][0]==='undefined')){user_id=user_jobtypes_arr[i][0].dataValues.user_id;}
                        if (!(typeof user_id==='undefined')){
                            let arrStylists = await models.stylist.findAll({
                                where: {
                                    id: user_id
                                }
                            });

                            if (arrStylists) {
                                stylists.push(arrStylists);
                            }
                        }
                    } catch (err) {
                        console.log(err);
                        console.log('Error on getting query data');
                    }
                }
                let users = [];
                for (let i = 0; i < stylists.length; i++) {
                    let user_id;
                    if(!(typeof stylists[0][i]==='undefined')){
                        user_id = stylists[0][i].dataValues.user_id;
                    }else if(!(typeof stylists[i][0]==='undefined')){
                        user_id = stylists[i][0].dataValues.user_id;
                    }
                    try {
                        let arrUsers = await models.user.findAll({
                            where: {
                                id: user_id
                            }
                        });
                        if (arrUsers) {
                            users.push(arrUsers);
                        }
                    } catch (err) {
                        console.log('Error occurred: ', err);
                        return res.status(504).json({error: "Server error occurred"});
                    }
                }

                return res.status(200).json({
                    users: users,
                    stylists: stylists,
                    user_types: user_jobtypes_arr
                });
            }catch (err){
                console.log('Error occurred: ', err);
                return res.status(504).json({error : "Server error occurred"});
            }
        }else{
            return res.status(504).json({error : "Parameters are required"});
        }
    }
};