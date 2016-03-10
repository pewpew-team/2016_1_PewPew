define(function(require) {
    var Backbone = require('backbone'),
        jQuery = require('jquery'),
        _ = require('underscore');

    var Session = Backbone.Model.extend({
        defaults: {
            'isAuth': false
        },
        login: function(login, password) {
            var self = this;
            jQuery.ajax({
                method: 'POST',
                url: '/session',
                data: JSON.stringify({
                    'login': login,
                    'password': password
                }),
                contentType: 'application/json',
                success: function () {
                    self.trigger('login');
                    self.isAuth = true;
                },
                error: function () {
                    self.trigger('invalidLoginPassword', 'Invalid login or password');
                    self.trigger('login'); // dev
                }
            });
        },
        logout: function() {
            var self = this;
            jQuery.ajax({
                method: 'DELETE',
                url: '/session',
                contentType: 'application/json',
                success: function() {
                    window.location.hash = 'main';
                    self.isAuth = false;
                },
                error: function () {
                    self.trigger('invalidLogout');
                }
            });
        },
        register: function(login, password, email) {
            var self = this;
            jQuery.ajax({
                method: 'POST',
                url: '/user',
                data: JSON.stringify({
                    'login': login,
                    'password': password,
                    'email': email
                }),
                contentType: 'application/json',
                success: function () {
                    self.trigger('login');
                },
                error: function () {
                    self.trigger('invalidLoginPassword');
                }
            });
        },
        validateLogin: function (login, password1) {
            if ( !(login && password1) ) {
                this.trigger('invalidLoginPassword', 'All fields required');
                return false;
            }
            return true;
        },
        validateRegistration: function (email, login, password1, password2) {
        if ( !(email && login && password1 && password2) ) {
            this.trigger('invalidLoginPassword', 'All fields required');
            return false;
        }
        if (password1 !== password2) {
            this.trigger('invalidLoginPassword', 'Passwords must match');
            return false;
        }
        return true;
    }
    });

    return new Session();
});