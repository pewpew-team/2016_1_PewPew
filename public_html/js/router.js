define(['views/main', 'views/game', 'views/login', 'views/scoreboard', 'views/register', 'views/gameMenu'],
    function () {
        var Backbone = require('backbone'),
            session = require('models/session');


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
                var view = require('views/'+fragmentName);
                this.currentView.hide();
                view.show();
                this.currentView = view;
            },
            defaultAction: function () {
                var mainView = require('views/main');
                mainView.show();
                this.currentView = mainView;
            },
            changeRoute: function (route) {
                this.navigate(route, {trigger: true});
            },
            toGameScreen: function() {
                var view = require('views/gameMenu');
                this.navigate('game', {trigger: false});
                this.currentView.hide();
                view.show();
                this.currentView = view;
            },
            startTraining: function() {
                var view = require('views/game');
                this.currentView.hide();
                view.show();
                this.currentView = view;
            }
        });

        return new Router();
    }
);