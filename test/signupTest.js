/**
 * Created by prasanna_d on 7/26/2017.
 */
const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

//Chai configurations
chai.use(chaiHttp);
chai.config.includeStack = true;
const asserts = chai.assert;
const should = chai.should();
const expect = chai.expect;

//Import server and other modules
const app = require('../app');
const models = require('../db/models');

//Import controller to test functions
const signup = require('../app/controller/auth/register');

describe('Sign up with', function() {

    it("correct information will create a account and return 201", async function () {
        //User inputs [All validations done at the front-end]
        let first_name = 'Prasanna';
        let last_name = 'Deshappriya';
        let email = 'prasannadeshappriya@gmail.com';
        let password = '12345678';

        //Stub database call and return dummy data
        models.user.findOrCreate = sinon.stub().returns([
            {user : {firstname : first_name,
                     last_name : last_name,
                     email : email,
                     password : password}},
            true
        ]);

        //Create a fake request data to call change password function
        let req = {body: {email: email, password: password, firstname: first_name, lastname: last_name}};

        //Create a fake response object to hold the test response
        let status = sinon.stub().returnsThis();
        let json = sinon.spy();
        let res = {
            status: status, json: json
        };

        //Call the function with parameters
        await signup.register(req, res);

        //Testing results
        asserts.equal(status.called, true);                             //Set the status correctly
        asserts.equal((models.user.findOrCreate).calledOnce, true);     //Check weather database query only called once
        asserts.equal(status.calledWith(201), true);                    //Check status is set with 200
        asserts.equal(json.called, true);                               //Check weather json is called
        //get the response arguments
        let jsonResponse = json.args[0][0];                             //Get the response object
        //Check all the parameters at the response
        expect(jsonResponse).to.have.property('status');
        expect(jsonResponse).to.have.property('userid');
        expect(jsonResponse).to.have.property('firstname');
        expect(jsonResponse).to.have.property('lastname');
        expect(jsonResponse).to.have.property('verified');
        expect(jsonResponse).to.have.property('token');
        expect(jsonResponse).to.have.property('email');
    });

    it("email which is already taken will return 400", async function () {
        //User inputs [All validations done at the front-end]
        let first_name = 'Prasanna';
        let last_name = 'Deshappriya';
        let email = 'prasannadeshappriya@gmail.com';
        let password = '12345678';

        //Stub database call and return dummy data
        models.user.findOrCreate = sinon.stub().returns([
            {user : {firstname : first_name,
                last_name : last_name,
                email : email,
                password : password}},
            false
        ]);

        //Create a fake request data to call change password function
        let req = {body: {email: email, password: password, firstname: first_name, lastname: last_name}};

        //Create a fake response object to hold the test response
        let status = sinon.stub().returnsThis();
        let json = sinon.spy();
        let res = {
            status: status, json: json
        };

        //Call the function with parameters
        await signup.register(req, res);

        //Testing results
        asserts.equal(status.called, true);                             //Set the status correctly
        asserts.equal((models.user.findOrCreate).calledOnce, true);     //Check weather database query only called once
        asserts.equal(status.calledWith(400), true);                    //Check status is set with 200
        asserts.equal(json.called, true);                               //Check weather json is called
        //get the response arguments
        let jsonResponse = json.args[0][0];                             //Get the response object
        //Check all the parameters at the response
        expect(jsonResponse).to.have.property('error');
        expect(jsonResponse).to.have.property('status');
    });
});
