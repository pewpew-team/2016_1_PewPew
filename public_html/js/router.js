define(function (require) {
    var Backbone = require('backbone'),
        session = require('models/session'),
        game = require('game/main'),
        views = {
            main: require('views/main'),
            game: require('views/game'),
            login: require('views/login'),
            scoreboard: require('views/scoreboard'),
            register: require('views/register'),
            gameMenu: require('views/gameMenu'),
            changeUserData: require('views/changeUserData'),
            error: require('views/error')
        };


    var Router = Backbone.Router.extend({
        routes: {
            ':query': 'displayView',
            '*default': 'displayMain'
        },
        initialize: function () {
            this.currentView = views['main'];
            this.listenTo(session, 'login', function () { this.navigate('#gameMenu', {trigger: true})}.bind(this));
            this.listenTo(views['gameMenu'], 'startTraining', this.startTraining);
            this.listenTo(views['gameMenu'], 'startTimeAttack', this.startTimeAttack);
        },
        displayView: function () {
            var view = views[Backbone.history.getFragment()];
            if (view) {
                if (view.loginRequired && !session.isLoggedIn()) {
                    this.navigate('#login', {trigger: true});
                } else {
                    view.show();
                }
            } else {
                this.navigate('#error', {trigger: true});
            }
        },
        displayMain: function () {
            var mainView = views['main'];
            mainView.show();
        },
        startTraining: function() {
            var view = views['game'];
            this.navigate('#training', {trigger: false});
            view.show();
            game['training'].init();
            game['training'].run();
        },
        startTimeAttack: function() {
            var view = views['game'];
            this.navigate('#timeAttack', {trigger: false});
            view.show();
            game['timeAttack'].init();
            game['timeAttack'].run();
        }
    });

    return new Router();
});
