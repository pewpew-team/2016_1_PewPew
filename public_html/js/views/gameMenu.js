define(function(require) {
    var baseView = require('views/baseView'),
        tmpl = require('tmpl/gameMenu'),
        session = require('models/session');

    var GameMenu = baseView.extend({
        template: tmpl,
        loginRequired: true,
        events: {
            'click #logout' : 'handleLogout',
            'click #training' : 'startTraining'
        },
        handleLogout: function(e) {
            e.preventDefault();
            session.logout();
            window.location.hash = 'main';
        },
        startTraining: function(e) {
            e.preventDefault();
            this.trigger('startTraining');
        }
    });

    return new GameMenu();
});
