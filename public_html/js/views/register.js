define(function (require) {
    var tmpl = require('tmpl/register'),
        baseView = require('views/baseView'),
        session = require('models/session'),
        event = require('event'),
        _ = require('underscore');


    var View = baseView.extend({
        template: tmpl,
        events: {
            'click #sign-up': function(e) {
                e.preventDefault();
                var login = this.$el.find('#login-input').value;
                var password1 = this.$el.find('#password-input').value;
                var password2 = this.$el.find('#repeat-password-input').value;
                if (this.validate(login, password1, password2)) {
                    session.register(login, password1);
                }
            }
        },
        initialize: function () {
            this.render();
            this.listenTo(event, 'invalidLoginPassword', this.showErrorMessage);
        },
        validate: function (login, password1, password2) {
            if ( !(login && password1 && password2) ) {
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