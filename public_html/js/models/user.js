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
                this.save({
                    'login': login,
                    'email': email
                },{
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
                this.save('password', newPass1,
                {
                    success: function () {
                        this.trigger('updated');
                    }.bind(this),
                    error: function () {
                        this.trigger('errorOnUpdate', 'Ошибка сервера');
                    }.bind(this)
                });
            }
        },
        register: function(login, password, email) {
            this.save({
                'login': login,
                'password': password,
                'email': email
            },{
                success: function (model, response) {
                    this.set('id', response._id);
                    this.fetch();
                    this.trigger('login');
                }.bind(this),
                error: function (model, response) {
                    this.trigger('invalidLoginPassword', 'Invalid data');
                }.bind(this),
                method: 'post'
            });
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
