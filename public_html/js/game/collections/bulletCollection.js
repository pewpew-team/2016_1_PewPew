define(
    ['backbone','game/models/bullet','underscore'],
    function() {
        var Backbone = require('backbone');
        var Bullet = require('game/models/bullet');
        var _ = require('underscore');
        var BulletCollection = Backbone.Collection.extend({
            model: Bullet,
            iterate: function(barriersCollection) {
                this.canvas = document.getElementById('dynamicLayer');
                // TODO проходит по всем пулям и препятствиям считает столкновения
                this.each(_.bind(function (bullet) {
                    bullet.iterate();
                    var posX = bullet.get('posX');
                    var posY = bullet.get('posY');
                    if (posX < 0 || posX > this.canvas.width) {
                        bullet.set('velX', -1*bullet.get('velX'));
                    }
                }, this));
                var outOfBox = this.filter(function (bullet) {
                    return bullet.get('posY') < 0;
                });
                this.remove(outOfBox);
            },
            fire: function(x0, y0, Vx, Vy) {
                var bullet = new Bullet({
                    'posX': x0,
                    'posY': y0,
                    'velX': Vx,
                    'velY': Vy,
                    'sizeX': 10,
                    'sizeY': 10
                });
                this.add(bullet);
            }
        });
        return new BulletCollection();
    }
);
