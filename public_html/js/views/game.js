define(function (require) {
        var tmpl = require('tmpl/game'),
            game = require('game/main'),
            baseView = require('views/baseView');

        var View = baseView.extend({
            template: tmpl,
            loginRequired: true
        });

        return new View();
    }
);
