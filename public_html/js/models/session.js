define(function(require) {
    var Backbone = require('backbone'),
        $ = require('jquery'),
        _ = require('underscore');

    var Session = Backbone.Model.extend({
        defaults: {
            'isAuth': false
        },
        login: function(login, password) {
            $.ajax({
                method: 'POST',
                url: '/session',
                data: JSON.stringify({
                    'login': login,
                    'password': password
                }),
                contentType: 'application/json',
                success: function () {
                    this.trigger('login');
                    this.isAuth = true;
                }.bind(this),
                error: function () {
                    this.trigger('invalidLoginPassword', 'Invalid login or password');
                    this.trigger('login'); // dev
                }.bind(this)
            });
        },
        logout: function() {
            $.ajax({
                method: 'DELETE',
                url: '/session',
                contentType: 'application/json',
                success: function() {
                    window.location.hash = 'main';
                    this.isAuth = false;
                }.bind(this),
                error: function () {
                    this.trigger('invalidLogout');
                }.bind(this)
            });
        },
        register: function(login, password, email) {
            $.ajax({
                method: 'POST',
                url: '/user',
                data: JSON.stringify({
                    'login': login,
                    'password': password,
                    'email': email
                }),
                contentType: 'application/json',
                success: function () {
                    this.trigger('login');
                }.bind(this),
                error: function () {
                    this.trigger('invalidLoginPassword');
                }.bind(this)
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