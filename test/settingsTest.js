/**
 * Created by prasanna_d on 7/25/2017.
 */
const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const app = require('../app');

//Chai configurations
chai.config.includeStack = true;
const asserts = chai.assert;

//Import controller to test functions
const settingController = require('../app/controller/settings');

// describe('Sample test method', function(){
//     it("should return string", function () {
//         asserts.equal(settingController.print(), "NodeJS_SEREVER");
//     })
// });
const models = require('../db/models');

describe('Change password [Incorrect user credentials]', function(){
    it("should return 401 respond", async function () {
        models.user.findOne = sinon.stub().returns({status: 'fuck'});
        let a = await settingController.print();
        console.log(a);
        console.log('Test function is completed');
    })
});