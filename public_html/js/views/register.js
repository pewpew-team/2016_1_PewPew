define(function (require) {
    var tmpl = require('tmpl/register'),
        baseView = require('views/baseView'),
        session = require('models/session'),
        user = require('models/user'),
        _ = require('underscore');


    var View = baseView.extend({
        template: tmpl,
        events: {
            'click #sign-up': 'handleSignUp'
        },
        handleSignUp: function (e) {
            e.preventDefault();
            var login = document.getElementById('login-input').value,
                password1 = document.getElementById('password-input').value,
                password2 = document.getElementById('repeat-password-input').value,
                email = document.getElementById('email-input').value;
            if (user.validateRegistration(email, login, password1, password2)) {
                user.register(login, password1, email);
            }
        },
        initialize: function () {
            this.render();
            this.listenTo(user, 'invalidLoginPassword', this.showErrorMessage);
        },
        showErrorMessage: function (message) {
            console.log(message);
            document.getElementById('form__alert').textContent = message;
        },
        hide: function() {
            document.getElementById('form__alert').textContent = '';
            baseView.prototype.hide.call(this);
        }
    });

    return new View();
});
