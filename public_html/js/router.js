define(
    ['backbone'],
    function (Backbone) {
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

            }
        })

        return new Router();
    }
)