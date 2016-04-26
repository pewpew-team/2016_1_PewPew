define(function (require) {
    QUnit.module("models/user");

    QUnit.test("User - экземпляр Backbone.Model", function () {
        var Backbone = require('backbone');
        var user = require('models/user');


        QUnit.ok(user instanceof Backbone.Model, 'User is instance of Backbone.Model');

    });

    QUnit.test("User.changeData", function () {
        var Backbone = require('backbone'),
            user = require('models/user'),
            xhr = sinon.useFakeXMLHttpRequest(),
            requests = [],
            spyUpdated = sinon.spy();
        user.on('updated', spyUpdated);
        user.set('id', 'fakeId');
        xhr.onCreate = function (request) {
            requests.push(request);
        };

        var login = 'login',
            email = 'password';
        user.changeData(login, email);
        QUnit.ok(1 === requests.length, 'Requests happened');
        requests[0].respond(
            200,
            { "Content-Type": "application/json" },
            '{ "id": "1" }'
            );
        QUnit.ok(spyUpdated.calledOnce, 'Event fired once');

        login = '';
        email = '';
        user.changeData(login, email);
        QUnit.ok(1 === requests.length, 'Requests did not happen (invalid data)');

        var spyFailed = sinon.spy();
        user.on('errorOnUpdate', spyFailed);
        login = 'login';
        email = 'email';
        user.changeData(login, email);
        QUnit.ok(2 === requests.length, 'Requests happened');
        requests[1].respond(
                400,
                { "Content-Type": "application/json" },
                '{ "error": "invalid data" }'
        );
        QUnit.ok(spyFailed.calledOnce, 'Event fired once');
    });

    QUnit.test('User.changePassword', function() {
        var Backbone = require('backbone'),
            user = require('models/user'),
            xhr = sinon.useFakeXMLHttpRequest(),
            requests = [],
            spyUpdated = sinon.spy();
        user.on('updated', spyUpdated);
        user.set('id', 'fakeId');

        xhr.onCreate = function (request) {
            requests.push(request);
        };

        var oldPass = 'oldPass',
            newPass1 = 'newPass',
            newPass2 = 'newPass';
        user.changePassword(oldPass, newPass1, newPass2);
        QUnit.ok(1 === requests.length, 'Requests happened');
        requests[0].respond(
            200,
            { "Content-Type": "application/json" },
            '{ "id": "1" }'
            );
        QUnit.ok(spyUpdated.calledOnce, 'Event fired once');

        var spyInvalidPassword = sinon.spy();
        user.on('invalidPassword', spyInvalidPassword);
        oldPass = '';
        newPass1 = '';
        newPass2 = '';
        user.changePassword(oldPass, newPass1, newPass2);
        QUnit.ok(1 === requests.length, 'Requests did not happen');
        QUnit.ok(spyInvalidPassword.callCount === 1, 'Event fired once');

        oldPass = '';
        newPass1 = 'a';
        newPass2 = 'b';
        user.changePassword(oldPass, newPass1, newPass2);
        QUnit.ok(1 === requests.length, 'Requests did not happen');
        QUnit.ok(spyInvalidPassword.callCount === 2, 'Event fired once');

        oldPass = 'oldPass';
        newPass1 = 'newPass';
        newPass2 = 'newPass';
        spyErrorOnUpdate = sinon.spy();
        user.on('errorOnUpdate', spyErrorOnUpdate);
        user.changePassword(oldPass, newPass1, newPass2);
        QUnit.ok(2 === requests.length, 'Requests happened');
        requests[1].respond(
            400,
            { "Content-Type": "application/json" },
            '{ "error": "invalid data" }'
        );
        QUnit.ok(spyErrorOnUpdate.calledOnce, 'Event fired once');
    });

    QUnit.test("User.clear", function () {
        var Backbone = require('backbone'),
            user = require('models/user');
        user.set({
            'login': 'login',
            'email': 'email',
            'id': '1'
        });
        user.clear();
        QUnit.ok(user.get('login') === 'Guest', 'Login cleaned');
        QUnit.ok(user.get('email') === '', 'Email cleaned');
        QUnit.ok(user.get('id') === '', 'Id cleaned');
    });

    QUnit.test("User.validateRegistration()", function () {
        var Backbone = require('backbone'),
            user = require('models/user');


        var login = '',
            password1 = '',
            password2 = '',
            email = '';

        var isValid = user.validateRegistration(email, login, password1, password2);
        QUnit.ok(!isValid);

        login = 'login';
        password1 = 'qwerty';
        password2 = 'ytrewq';
        email = 'email';

        isValid = user.validateRegistration(email, login, password1, password2);
        QUnit.ok(!isValid);

        login = 'login';
        password1 = 'qwerty';
        password2 = 'qwerty';
        email = 'email';

        isValid = user.validateRegistration(email, login, password1, password2);
        QUnit.ok(isValid);

    });
});
