define(function(require) {
    var Backbone = require('backbone'),
        event = require('event'),
        jQuery = require('jquery');

    var Session = Backbone.Model.extend({
        defaults: {
            'isAuth': false
        },
        initialize: function() {
            jQuery.ajax({
               beforeSend: function() {

               }
            });
        },
        login: function(login, password) {
            jQuery.ajax({
                method: 'POST',
                url: '/session',
                data: {
                    'login': login,
                    'password': password
                },
                contentType: 'application/json: charset=utf-8',
                success: function () {
                    event.trigger('login');
                },
                error: function () {
                    event.trigger('invalidLoginPassword', 'Invalid login or password');
                }
            });
        },
        logout: function() {
            jQuery.ajax({
                method: 'DELETE',
                url: '/session',
                success: function() {
                    event.trigger('navigate', 'main');
                },
                contentType: 'application/json: charset=utf-8',
                error: function () {
                    event.trigger('invalidLogout');
                }
            });
        },
        register: function(login, password, email) {
            jQuery.ajax({
                method: 'POST',
                url: '/user',
                success: function () {
                    event.trigger('login');
                },
                contentType: 'application/json: charset=utf-8',
                data: {
                    'login': login,
                    'password': password,
                    'email': email
                },
                error: function () {
                    event.trigger('invalidLoginPassword');
                }
            });
        }
    });

    return new Session();
});