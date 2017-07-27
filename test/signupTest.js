/**
 * Created by prasanna_d on 7/26/2017.
 */
const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');

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
        asserts.equal(status.calledWith(201), true);                    //Check status is set with 201
        asserts.equal(json.called, true);                               //Check weather json is called
        //get the response arguments
        let jsonResponse = json.args[0][0];                             //Get the response object
        //Check all the parameters at the response
        expect(jsonResponse).to.have.property('userid');
        expect(jsonResponse).to.have.property('firstname');
        expect(jsonResponse).to.have.property('lastname');
        expect(jsonResponse).to.have.property('verified');
        expect(jsonResponse).to.have.property('token');
        expect(jsonResponse).to.have.property('email');
    });

    it("email which is invalid will return 400", async function () {
        //User inputs [All validations done at the front-end]
        let first_name = 'Prasanna';
        let last_name = 'Deshappriya';
        let email = 'prasannadeshappriya';
        let password = '12345678';

        //Stub database call and return dummy data
        models.user.findOrCreate = sinon.stub().returns(null);

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
        asserts.equal((models.user.findOrCreate).called, false);        //Check weather database query only called once
        asserts.equal(status.calledWith(400), true);                    //Check status is set with 400
        asserts.equal(json.called, true);                               //Check weather json is called
        //get the response arguments
        let jsonResponse = json.args[0][0];                             //Get the response object
        //Check all the parameters at the response
        expect(jsonResponse).to.have.property('error');
    });

    it("email which is already taken will return 409", async function () {
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
        asserts.equal(status.calledWith(409), true);                    //Check status is set with 409
        asserts.equal(json.called, true);                               //Check weather json is called
        //get the response arguments
        let jsonResponse = json.args[0][0];                             //Get the response object
        //Check all the parameters at the response
        expect(jsonResponse).to.have.property('error');
    });

    it("valid email and click on verification link will redirect to the home page", async function () {
        //Input details
        let token = 'sample_token';

        //Stub database call and return dummy data
        models.user.update = sinon.stub().returns(true);
        jwt.decode = sinon.stub().returns({email:'prasannadeshappriya@gmail.com'});

        //Create a fake request data to call change password function
        let req = {query: {token:token}};

        //Create a fake response object to hold the test response
        let redirect = sinon.spy();
        let res = {
            redirect: redirect
        };

        //Call the function with parameters
        await signup.verify(req,res);

        //Testing results
        //Click on verification link will navigate to the homepage
        asserts.equal(redirect.calledWith('http://localhost:63342/HairB2B/#!/'), true);
        asserts.equal((models.user.update).calledOnce, true);     //Check weather database query only called once
    });

    it("valid email and click on expired verification link will return 400 respond", async function () {
        //Input details
        let token = 'sample_token';

        //Stub database call and return dummy data
        models.user.update = sinon.stub().returns(false);
        jwt.decode = sinon.stub().returns({email:'prasannadeshappriya@gmail.com'});

        //Create a fake request data to call change password function
        let req = {query: {token:token}};

        //Create a fake response object to hold the test response
        let status = sinon.stub().returnsThis();
        let json = sinon.spy();
        let res = {
            status: status, json: json
        };

        //Call the function with parameters
        await signup.verify(req,res);

        //Testing results
        asserts.equal(status.called, true);                             //Set the status correctly
        asserts.equal((models.user.update).calledOnce, true);           //Check weather database query only called once
        asserts.equal(status.calledWith(400), true);                    //Check status is set with 400
        asserts.equal(json.called, true);                               //Check weather json is called
        //get the response arguments
        let jsonResponse = json.args[0][0];                             //Get the response object
        //Check all the parameters at the response
        expect(jsonResponse).to.have.property('error');
    });

    it("invalid password will return 400", async function () {
        //User inputs [All validations done at the front-end]
        let first_name = 'Prasanna';
        let last_name = 'Deshappriya';
        let email = 'prasannadeshappriya@gmail.com';
        let password = '12345 678'; //Invalid password

        //Stub database call and return dummy data
        models.user.findOrCreate = sinon.stub().returns(null);

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
        asserts.equal((models.user.findOrCreate).called, false);        //Check weather database query not being called
        asserts.equal(status.calledWith(400), true);                    //Check status is set with 400
        asserts.equal(json.called, true);                               //Check weather json is called
        //get the response arguments
        let jsonResponse = json.args[0][0];                             //Get the response object
        //Check all the parameters at the response
        expect(jsonResponse).to.have.property('error');
    });

});
