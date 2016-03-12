define(function (require) {
    var tmpl = require('tmpl/changeUserData'),
        baseView = require('views/baseView'),
        user = require('models/user'),
        _ = require('underscore');


    var View = baseView.extend({
        template: tmpl,
        loginRequired: true,
        events: {
            'click #change-data': 'handleChange'
        },
        handleChange: function (e) {
            e.preventDefault();
            var login = document.getElementById('login-input').value;
            var email = document.getElementById('email-input').value;
            user.changeData(login, email);
        },
        initialize: function () {
            this.render();
            this.listenTo(user, 'errorOnUpdate', this.showErrorMessage);
            console.log(user.get('id'));
        },
        show: function() {
            baseView.prototype.show.call(this);
            user.fetch({
                success: function() {
                    document.getElementById('email-input').value = user.get('email');
                    document.getElementById('login-input').value = user.get('login');
                },
                error: function() {
                    this.showErrorMessage('Невозможно загрузить данные')
                }.bind(this)
            });
        },
        showErrorMessage: function (message) {
            document.getElementById('form__alert').textContent = message;
        }
    });

    return new View();
});
