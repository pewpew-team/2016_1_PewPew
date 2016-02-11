define(
    ['backbone', 'views/main'],
    function (Backbone, mainView) {
        var Router = Backbone.Router.extend({
            routes: {
                'scoreboard': 'scoreboardAction',
                'game': 'gameAction',
                'login': 'loginAction',
                '*default': 'defaultAction'
            },
            scoreboardAction: function () {

            },
            gameAction: function () {

            },
            loginAction: function () {

            },
            defaultAction: function () {
                mainView.show();
            }
        })

        return new Router();
    }
)