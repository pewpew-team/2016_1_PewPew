define(function (require) {
    var tmpl = require('tmpl/login'),
        baseView = require('views/baseView'),
        event = require('event'),
        session = require('models/session');


    var View = baseView.extend({
        template: tmpl,
        events: {
            'click #sign-in': function(e) {
                e.preventDefault();
                var login = this.$el.find('#login-input').value;
                var password = this.$el.find('#password-input').value;
                if (this.validate(login, password)) {
                    session.login(login, password);
                }
            }
        },
        initialize: function () {
            this.render();
            this.listenTo(event, 'invalidLoginPassword', this.showErrorMessage);
        },
        showErrorMessage: function (message) {
            // TODO
        },
        validate: function (login, password) {
            if ( !(login && password) ) {
                event.trigger('invalidLoginPassword', 'All fields required');
                return false;
            }
            return true;
        }
    });

    return new View();
});