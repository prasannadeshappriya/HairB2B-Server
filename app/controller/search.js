/**
 * Created by prasanna on 7/23/17.
 */
const models = require('../../db/models');

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
    },

    getDynamicSearchResults : async function (req,res) {
        let jobtype = req.query.jobtype;
        let skilltype = req.query.skilltype;

        jobtype = jobtype.split(',');
        let jobtypeArr = [];
        let i=0;
        for(i=0; i<(jobtype.length); i++){
            jobtypeArr.push(parseInt(jobtype[i])+1);
        }

        skilltype = skilltype.split(',');
        let skilltypeArr = [];
        for(i=0; i<(skilltype.length); i++){
            skilltypeArr.push(parseInt(skilltype[i])+1);
        }
        console.log('----------------fijnasioinie9824832482344-------------');
        console.log(skilltype);
        console.log('-----------------------------');

        let user_results_skills = await dynamicSearchSkills(skilltype);
        let user_results_types = await dynamicSearchTypes(jobtypeArr);
        console.log('-----------------------------');
        console.log(user_results_skills);
        console.log('-----------------------------');
        console.log('-----------------------------');
        console.log(user_results_types);
        console.log('-----------------------------');
        return res.status(200).json({status: 'success'})
    }
};

async function dynamicSearchSkills(skillArr) {
    try {
        console.log('------fker------');
        console.log(skillArr);
        skillArr = [0,1];
        console.log('------------');
        let user_skill = await models.user_skill.findAll({
            attributes: [[models.sequelize.fn('DISTINCT', models.sequelize.col('user_id')), 'user_id'], 'skill_id'],
            where: {
                skill_id: {$in: skillArr}
            }
        });
        let i;
        let user_id = [];
        let tmp = [];
        for(i=0; i<user_skill.length; i++){
            let user_id_i = user_skill[i].dataValues.user_id;
            let user_skill_i = [];
            for(j=0; j<user_skill.length; j++){
                if(user_id_i===user_skill[j].dataValues.user_id &&
                    skillArr.indexOf(user_skill[i].dataValues.skill_id)!==-1){
                    user_skill_i.push(user_skill[j].dataValues.skill_id);
                }
            }

            if (skillArr.length === user_skill_i.length
                && skillArr.every(function(u, i) {
                    return is(u, user_skill_i[i]);
                })
            ) {
                if(user_id.length>0){
                    let con = true;
                    for (k=0; k<user_id.length; k++){
                        if(user_id.indexOf(user_id_i)!==-1){
                            con = false;
                            break;
                        }
                    }
                    if(con){
                        user_id.push(user_id_i);
                        tmp.push(user_skill_i);
                    }
                }else{
                    user_id.push(user_id_i);
                    tmp.push(user_skill_i);
                }
            }
        }
        return user_id;
    }catch (err){
        console.log('Error occoured: ' + err);
        return [];
    }
}

async function dynamicSearchTypes(jobtype) {
    console.log('------fkeasdasdasdadr------');
    console.log(jobtype);
    console.log('------------');
    try {
        let user_types = await models.user_jobtype.findAll({
            attributes: [[models.sequelize.fn('DISTINCT', models.sequelize.col('user_id')), 'user_id'], 'job_id', 'price'],
            where: {
                job_id: {$in: jobtype}
            }
        });
        let i;
        let user_id = [];
        let tmp = [];
        for(i=0; i<user_types.length; i++){
            let user_id_i = user_types[i].dataValues.user_id;
            let user_type_i = [];
            for(j=0; j<user_types.length; j++){
                if(user_id_i===user_types[j].dataValues.user_id &&
                    jobtype.indexOf(user_types[i].dataValues.job_id)!==-1){
                    user_type_i.push(user_types[j].dataValues.job_id);
                }
            }

            if (jobtype.length === user_type_i.length
                && jobtype.every(function(u, i) {
                    return is(u, user_type_i[i]);
                })
            ) {
                if(user_id.length>0){
                    let con = true;
                    for (k=0; k<user_id.length; k++){
                        if(user_id.indexOf(user_id_i)!==-1){
                            con = false;
                            break;
                        }
                    }
                    if(con){
                        user_id.push(user_id_i);
                        tmp.push(user_type_i);
                    }
                }else{
                    user_id.push(user_id_i);
                    tmp.push(user_type_i);
                }
            }
        }
        return user_id;
    }catch (err){
        console.log('Error occoured: ' + err);
        return [];
    }
}

function is(a, b) {
    return a === b && (a !== 0 || 1 / a === 1 / b) // false for +0 vs -0
        || a !== a && b !== b; // true for NaN vs NaN
}