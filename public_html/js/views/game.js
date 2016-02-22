define([
    'views/baseView',
    'tmpl/game',
    'game/main'
], function (baseView, tmpl) {
        var game = require('game/main');
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