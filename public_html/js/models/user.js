define(function (require) {
    var Backbone = require('backbone'),
        $ = require('jquery');

    var User = Backbone.Model.extend({
        defaults: {
            'login': 'Guest',
            'email': ''
        },
        urlRoot: '/user',
        changeData: function(login, email) {
            if ( this.validateLoginEmail(login, email) ) {
                this.set({
                    'login': login,
                    'email': email
                });
                this.save({
                    success: function () {
                        this.trigger('updated');
                    }.bind(this),
                    error: function () {
                        this.trigger('errorOnUpdate', 'Ошибка сервера');
                    }.bind(this)
                });
            }
        },
        changePassword: function (oldPass, newPass1, newPass2) {
            if ( this.validatePass(oldPass, newPass1, newPass2) ) {
                this.set('password', newPass1);
                this.save({
                    success: function () {
                        this.trigger('updated');
                    }.bind(this),
                    error: function () {
                        this.trigger('errorOnUpdate', 'Ошибка сервера');
                    }.bind(this)
                });
            }
        },
        validateLoginEmail: function(login, email) {
            if ( !(login && email) ) {
                this.trigger('invalidLoginEmail', 'All fields required');
                return false;
            }
            return true;
        },
        validatePass: function(oldPass, newPass1, newPass2) {
            if ( !(oldPass && newPass1 && newPass2) ) {
                this.trigger('invalidPassword', 'All fields required');
                return false;
            }
            if ( newPass1 !== newPass2 ) {
                this.trigger('invalidPassword', 'Passwords must match');
                return false;
            }
            return true;
        },
        clear: function() {
          if (this.has('login')) {
            this.set('login', 'Guest');
          }
          if (this.has('email')) {
            this.set('email', '');
          }
          if (this.has('id')) {
            this.set('id', '');
          }
        }
    });

    return new User();
});
