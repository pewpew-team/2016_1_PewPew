define(function(require) {
    var baseView = require('views/baseView'),
        tmpl = require('tmpl/gameMenu'),
        session = require('models/session'),
        scoreboard = require('views/scoreboard');

    var GameMenu = baseView.extend({
        template: tmpl,
        loginRequired: true,
        events: {
            'click #logout' : 'handleLogout',
            'click #training' : 'startTraining',
            'click #time-attack' : 'startTimeAttack',
            'click #multiplayer' : 'startMultiplayer',
            'click .js-scoreboard': 'toScoreboard'
        },
        handleLogout: function(e) {
            e.preventDefault();
            session.logout();
            window.location.hash = 'main';
        },
        startTraining: function(e) {
            e.preventDefault();
            this.trigger('startTraining');
        },
        startTimeAttack: function(e) {
            e.preventDefault();
            this.trigger('startTimeAttack');
        },
        startMultiplayer: function(e) {
            e.preventDefault();
            this.trigger('startMultiplayer');
        },
        toScoreboard: function (e) {
            e.preventDefault();
            scoreboard.referrer = "#gameMenu";
            window.location.hash = "#scoreboard";
        }
    });

    return new GameMenu();
});
