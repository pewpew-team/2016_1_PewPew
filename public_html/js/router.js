define(
    ['backbone', 'require', 'views/main', 'views/game', 'views/login', 'views/scoreboard', 'views/register', 'event'],
    function (Backbone, require) {
        var Router = Backbone.Router.extend({
            routes: {
                'main': 'displayView',
                'login': 'displayView',
                'register': 'displayView',
                'scoreboard': 'displayView',
                'game': 'displayView',
                '*default': 'defaultAction'
            },
            initialize: function () {
                this.currentView = require('views/main');
                this.listenTo(require('event'), 'navigate', this.changeRoute);
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
            }
        });

        return new Router();
    }
)