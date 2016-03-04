define(['views/main', 'views/game', 'views/login', 'views/scoreboard', 'views/register', 'views/gameMenu'],
    function () {
        var Backbone = require('backbone'),
            session = require('models/session'),
            views = {
                main: require('views/main'),
                game: require('views/game'),
                login: require('views/login'),
                scoreboard: require('views/scoreboard'),
                register: require('views/register'),
                gameMenu: require('views/gameMenu')
            };


        var Router = Backbone.Router.extend({
            routes: {
                'main': 'displayView',
                'login': 'displayView',
                'register': 'displayView',
                'scoreboard': 'displayView',
                '*default': 'defaultAction'
            },
            initialize: function () {
                this.currentView = require('views/main');
                var event = require('event');
                this.listenTo(event, 'navigate', this.changeRoute);
                this.listenTo(event, 'login', this.toGameScreen);
                this.listenTo(event, 'startTraining', this.startTraining);
            },
            displayView: function () {
                var fragmentName = Backbone.history.getFragment();
                var view = views[fragmentName];
                this.currentView.hide();
                view.show();
                this.currentView = view;
            },
            defaultAction: function () {
                var mainView = views['main'];
                mainView.show();
                this.currentView = mainView;
            },
            changeRoute: function (route) {
                this.navigate(route, {trigger: true});
            },
            toGameScreen: function() {
                var view = views['gameMenu'];
                this.navigate('game', {trigger: false});
                this.currentView.hide();
                view.show();
                this.currentView = view;
            },
            startTraining: function() {
                var view = views['game'];
                this.currentView.hide();
                view.show();
                this.currentView = view;
            }
        });

        return new Router();
    }
);