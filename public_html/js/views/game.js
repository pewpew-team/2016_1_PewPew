define(function (require) {
        var tmpl = require('tmpl/game'),
            game = require('game/main'),
            baseView = require('views/baseView');

        var View = baseView.extend({
            template: tmpl,
            show: function () {
                $('#page').html(this.el);
                this.$el.show();
                game.init();
                game.run();
            }
        });

        return new View();
    }
);