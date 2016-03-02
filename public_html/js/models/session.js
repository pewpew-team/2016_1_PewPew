define(function(require) {
    var Backbone = require('backbone'),
        event = require('event'),
        jQuery = require('jquery');

    var Session = Backbone.Model.extend({
        defaults: {
            'isAuth': false,
            'token': ''
        },
        initialize: function () {
            this.setActive();
        },
        login: function(login, password) {
            var handleSuccess = function (msg) {
                if (msg['Token']) {
                    this.set('token', msg['Token']);
                    this.set('isAuth', true);
                    event.trigger('login');
                }
            };
            jQuery.ajax({
                method: 'POST',
                url: '/login',
                data: {
                    'login': login,
                    'password': password
                },
                success: handleSuccess.bind(this),
                error: function () {
                    event.trigger('invalidLoginPassword', 'Invalid login or password');
                }
            });
        },
        logout: function() {
            var handleSuccess = function () {
                    this.set('token', '');
                    this.set('isAuth', false);
                    event.trigger('logout');
            };
            jQuery.ajax({
                method: 'POST',
                url: '/logout',
                success: handleSuccess.bind(this),
                error: function () {
                    event.trigger('invalidLogout');
                }
            });
        },
        register: function(login, password, email) {
            var handleSuccess = function () {
                if (msg['Token']) {
                    this.set('token', msg['Token']);
                    this.set('isAuth', true);
                    event.trigger('login');
                }
            };
            jQuery.ajax({
                method: 'POST',
                url: '/register',
                success: handleSuccess.bind(this),
                data: {
                    'login': login,
                    'password': password,
                    'email': email
                },
                error: function () {
                    event.trigger('invalidLoginPassword');
                }
            });
        },
        setActive: function () {
            var setHeader = function (request) {
                if (this.get('isAuth')) {
                    request.setRequestHeader('Token', this.get('token'));
                }
            };
            jQuery.ajax({
                beforeSend: setHeader.bind(this)
            });
        },
        disable: function () {
            jQuery.ajax({
                beforeSend: function () {

                }
            });
        }
    });

    return new Session();
});