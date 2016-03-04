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
                var login = document.getElementById('login-input').value;
                var password = document.getElementById('password-input').value;
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
        },
        show: function () {
            $('#page').html(this.el);
            this.$el.show();
            this.$el.find('#main').click(function(e) {
                e.preventDefault();
                event.trigger('navigate', 'main');
            })
        }
    });

    return new View();
});