define(function(require) {
    var Backbone = require('backbone'),
        $ = require('jquery'),
        _ = require('underscore'),
        user = require('models/user');

    var Session = Backbone.Model.extend({
        defaults: {
            'isAuth': false,
        },
        urlRoot: '/session',
        initialize: function() {
            this.fetch({
              success: function(model, response) {
                this.set('isAuth', true);
                user.set('id', response.id);
              }.bind(this),
              error: function(model, response) {
                this.set('isAuth', false);
              }.bind(this)
            });
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
                success: function (data) {
                    user.set('id', data.id);
                    user.fetch();
                    this.set('isAuth', true);
                    this.trigger('login');
                }.bind(this),
                error: function () {
                    this.trigger('invalidLoginPassword', 'Invalid login or password');
                }.bind(this)
            });
        },
        logout: function() {
            this.destroy({
                success: function() {
                    window.location.hash = 'main';
                    this.set('isAuth', false);
                    user.clear();
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
                success: function (data) {
                    this.set('isAuth', true);
                    user.set('id', data.id);
                    user.fetch();
                    this.trigger('login');
                }.bind(this),
                error: function () {
                    this.trigger('invalidLoginPassword', 'Invalid data');
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
        },
        isLoggedIn: function() {
            return true;//this.get('isAuth');
        }
    });

    return new Session();
});
