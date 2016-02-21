define(
    ['backbone','game/models/bullet'],
    function() {
        var Backbone = require('backbone');
        var Bullet = require('models/bullet');
        var BulletCollection = Backbone.Collection.extend({
            model: Bullet,
            iterate: function() {
                // TODO проходит по всем пулям и препятствиям считает коллижаны
                // TODO и итерируют каждую пулю в отдельности
            }
        });
        return new BulletCollection();
    }
);
