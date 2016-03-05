define(function (require) {
    var tmpl = require('tmpl/register'),
        baseView = require('views/baseView'),
        session = require('models/session'),
        event = require('event'),
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
            if (this.validate(email, login, password1, password2)) {
                session.register(login, password1, email);
            }
        },
        initialize: function () {
            this.render();
            this.listenTo(event, 'invalidLoginPassword', this.showErrorMessage);
        },
        validate: function (email, login, password1, password2) {
            if ( !(email && login && password1 && password2) ) {
                event.trigger('invalidLoginPassword', 'All fields required');
                return false;
            }
            if (password1 !== password2) {
                event.trigger('invalidLoginPassword', 'Passwords must match');
                return false;
            }
            return true;
        },
        showErrorMessage: function (message) {
            //TODO
        }
    });

    return new View();
});