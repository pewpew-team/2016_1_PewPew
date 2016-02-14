define(
    ['backbone', 'views/main', 'views/login', 'views/game', 'views/scoreboard'],
    function (Backbone, mainView, loginView, gameView, scoreboardView) {
        var Router = Backbone.Router.extend({
            routes: {
                'scoreboard': 'scoreboardAction',
                'game': 'gameAction',
                'login': 'loginAction',
                '*default': 'defaultAction'
            },
            initialize: function () {
                this.currentView = mainView;
            },
            scoreboardAction: function () {
                this.currentView.hide();
                scoreboardView.show();
                this.currentView = scoreboardView;
            },
            gameAction: function () {
                this.currentView.hide();
                gameView.show();
                this.currentView = gameView;
            },
            loginAction: function () {
                this.currentView.hide();
                loginView.show();
                this.currentView = loginView;
            },
            defaultAction: function () {
                this.currentView.hide();
                mainView.show();
                this.currentView = mainView;
            }
        })

        return new Router();
    }
)