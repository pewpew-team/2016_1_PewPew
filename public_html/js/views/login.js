define(
    ['tmpl/login', 'views/baseView', 'models/user'],
    function (tmpl, baseView, user) {
        var View = baseView.extend({
            template: tmpl,
            events: {
                'click #sign-in': function(e) {
                    e.preventDefault();
                    var login = this.$el.find('#login-input').value;
                    var password = this.$el.find('#password-input').value;
                    user.authorize(login, password);
                }
            }
        });

        return new View();
    }
);