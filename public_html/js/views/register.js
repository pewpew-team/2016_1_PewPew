define(function (require) {
    var tmpl = require('tmpl/register'),
        baseView = require('views/baseView'),
        session = require('models/session'),
        _ = require('underscore');


    var View = baseView.extend({
        template: tmpl,
        events: {
            'click #sign-up': 'handleSignUp'
        },
        handleSignUp: function (e) {
            e.preventDefault();
            var login = document.getElementById('login-input').value;
            var password1 = document.getElementById('password-input').value;
            var password2 = document.getElementById('repeat-password-input').value;
            var email = document.getElementById('email-input').value;
            if (session.validateRegistration(email, login, password1, password2)) {
                session.register(login, password1, email);
            }
        },
        initialize: function () {
            this.render();
            this.listenTo(session, 'invalidLoginPassword', this.showErrorMessage);
        },
        showErrorMessage: function (message) {
            document.getElementById('form__alert').textContent = message;
        },
        hide: function() {
            document.getElementById('form__alert').textContent = '';
            baseView.prototype.hide.call(this);
        }
    });

    return new View();
});