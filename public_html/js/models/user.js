define(
    ['backbone'],
    function(Backbone) {
        var User = Backbone.Model.extend({
            default: {
                'token' : '',
                'username' : 'Guest',
                'password': ''
            },
            authorize: function(login, password) {
                // TODO
            },
            registerNew: function(login, password1, password2, email) {
                // TODO
            }
        });

        return new User();
    }
)