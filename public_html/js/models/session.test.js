define(function (require) {
    QUnit.module("models/session");

    QUnit.test("Session - экземпляр Backbone.Model", function () {
        var Backbone = require('backbone');
        var session = require('models/session');

        QUnit.ok(session instanceof Backbone.Model, 'Session is instance of Backbone.Model');

    });

    QUnit.test("Session.login()", function () {
        var Backbone = require('backbone'),
            session = require('models/session'),
            xhr = sinon.useFakeXMLHttpRequest(),
            requests = [];

        xhr.onCreate = function (request) {
            requests.push(request);
        };

        var login = '',
            password = '';
        var loginEvent = false,
            invalidLoginEvent = false;

        session.on('login', function() {
            loginEvent = true;
        });
        session.on('invalidLoginPassword', function() {
            invalidLoginEvent = true;
        });
        session.login(login, password);
        QUnit.ok(1 === requests.length);
        requests[0].respond(
            400,
            { "Content-Type": "application/json" },
            '{ "error": "invalid data" }'
            );
        QUnit.ok(!session.isLoggedIn());

        login = 'validLogin';
        password = 'validPassword';
        session.login(login, password);
        QUnit.ok(2 === requests.length);
        requests[1].respond(
            200,
            { "Content-Type": "application/json" },
            '{ "id": "idMock" }'
            );
        QUnit.ok(session.isLoggedIn());

        QUnit.ok(loginEvent, 'Login event did not fire in 1000 ms.');
        QUnit.ok(invalidLoginEvent, 'InvalidLogin event did not fire in 1000 ms.');

    });

    QUnit.test("Session.logout()", function () {
        var Backbone = require('backbone'),
            session = require('models/session'),
            xhr = sinon.useFakeXMLHttpRequest(),
            requests = [];

        xhr.onCreate = function (request) {
            requests.push(request);
        };

        session.set('isAuth', true); // Set to login

        var invalidLogoutEvent = false;

        session.on('invalidLogout', function() {
            invalidLogoutEvent = true;
        });
        session.logout();
        QUnit.ok(requests.length === 1);
        requests[0].respond(200);

        session.set('isAuth', true); // Set to login

        session.logout();
        QUnit.ok(requests.length === 2);
        requests[1].respond(401);
        QUnit.ok(session.isLoggedIn());
        QUnit.ok(invalidLogoutEvent, 'InvalidLogout event did not fire');
    });


    QUnit.test("Session.validateLogin()", function () {
        var Backbone = require('backbone'),
            session = require('models/session');


        var login = '',
            password = '';

        var isValid = session.validateLogin(login, password);
        QUnit.ok(!isValid);

        login = 'login';
        password = 'password';

        isValid = session.validateLogin(login, password);
        QUnit.ok(isValid);

    });


});
