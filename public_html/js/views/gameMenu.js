define(function(require) {
    var baseView = require('views/baseView'),
        tmpl = require('tmpl/gameMenu'),
        session = require('models/session');

    var GameMenu = baseView.extend({
        template: tmpl,
        events: {
            'click #logout' : 'handleLogout',
            'click #training' : 'startTraining'
        },
        handleLogout: function(e) {
            e.preventDefault();
            session.logout();
        },
        startTraining: function(e) {
            e.preventDefault();
            this.trigger('startTraining');
        }
    });

    return new GameMenu();
});