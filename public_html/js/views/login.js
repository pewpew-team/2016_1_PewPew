define(function (require) {
    var tmpl = require('tmpl/login'),
        baseView = require('views/baseView'),
        session = require('models/session');


    var View = baseView.extend({
        template: tmpl,
        events: {
            'click #sign-in': 'handleSignIn'
        },
        handleSignIn: function(e) {
            e.preventDefault();
            var login = document.getElementById('login-input').value;
            var password = document.getElementById('password-input').value;
            if (session.validateLogin(login, password)) {
                session.login(login, password);
            }
        },
        initialize: function () {
            baseView.prototype.initialize.call(this);
            this.listenTo(session, 'invalidLoginPassword', this.showErrorMessage);
            this.listenTo(session, 'login', this.hideErrorMessage);
        },
        showErrorMessage: function (message) {
            document.getElementById('form__alert').textContent = message;
        },
        hideErrorMessage: function () {
            document.getElementById('form__alert').textContent = '';
        },
        show: function() {
            if (session.isLoggedIn()) {
                window.location.hash = 'gameMenu';
            } else {
                baseView.prototype.show.call(this);
            }
        }
    });

    return new View();
});
