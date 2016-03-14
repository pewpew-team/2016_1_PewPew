define(function (require) {
        var tmpl = require('tmpl/game'),
            game = require('game/main'),
            baseView = require('views/baseView');

        var View = baseView.extend({
            template: tmpl,
            show: function () {
                baseView.prototype.show.call(this);
                game.init();
                game.run();
            }
        });

        return new View();
    }
);