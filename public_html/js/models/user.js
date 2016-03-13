define(function (require) {
    var Backbone = require('backbone'),
        $ = require('jquery');

    var User = Backbone.Model.extend({
        defaults: {
            'login': 'Guest',
            'email': '',
            '_id': ''
        },
        urlRoot: function () {
            return '/user/' + this.get('_id');
        },
        changeData: function(login, email) {
            if ( this.validateLoginEmail(login, email) ) {
                $.ajax({
                    method: 'PUT',
                    url: '/user/'+this.get('_id'),
                    data: JSON.stringify({
                        'login': login,
                        'email': email
                    }),
                    contentType: 'application/json',
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
                $.ajax({
                    method: 'PUT',
                    url: '/user/'+this.get('_id'),
                    data: JSON.stringify({
                        'password': newPass1
                    }),
                    contentType: 'application/json',
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
            this.set('login', 'Guest')
          }
          if (this.has('email')) {
            this.set('email', '')
          }
          if (this.has('_id')) {
            this.set('_id', '')
          }
        }
    });

    return new User();
});
