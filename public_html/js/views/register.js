define(function (tmpl, baseView, user) {
    var tmpl = require('tmpl/register'),
        baseView = require('views/baseView'),
        user = require('models/user');


    var View = baseView.extend({
        template: tmpl,
        events: {
            'click #sign-up': function(e) {
                e.preventDefault();
                var login = this.$el.find('#login-input').value;
                var password1 = this.$el.find('#password-input').value;
                var password2 = this.$el.find('#repeat-password-input').value;
                user.registerNew(login, password1, password2);
            }
        }
    });

    return new View();
});