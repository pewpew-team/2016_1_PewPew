define(
    ['backbone','jquery', 'event'],
    function(Backbone, $, event) {
        var User = Backbone.Model.extend({
            default: {
                'token' : '',
                'username' : 'Guest',
                'password': '',
                'endPoint': 'localhost',
                'port': 8080
            },
            authorize: function(login, password) {
                if(login.length === 0 && password.length == 0) {
                    event.trigger('invalidLoginPassword');
                } else {
                    this.set('username', login);
                    this.set('password', password);
                    this.sendLoginData();
                    this.set('password','');
                }
            },
            registerNew: function(login, password1, password2) {

            },
            sendLoginData: function () {
                $.ajax({
                    method: 'POST',
                    url: '/login',
                    data: {'login': this.get('username'),
                        'password': this.get('password')},
                    success: function (msg) {
                        if (msg['AuthToken']) {
                            this.set('token', msg['AuthToken']);
                            event.trigger('startGame');
                        }
                    },
                    error: function () {
                        event.trigger('invalidLoginPassword');
                    }
                });
            }
        });

        return new User();
    }
)