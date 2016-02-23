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
                this.barriers = barriersCollection;
                this.each(_.bind(this.iterateBullet, this));
                var outOfBox = this.filter(function (bullet) {
                    return bullet.get('posY') < 0;
                });
                this.remove(outOfBox);
            },
            iterateBullet: function (bullet) {
                bullet.iterate();
                for (var i = 0; i < this.barriers.length; i++) {
                    this.tryToCollide(bullet, this.barriers.at(i));
                }
                var posX = bullet.get('posX');
                var posY = bullet.get('posY');
                if (posX < 0 || posX > this.canvas.width) {
                    bullet.set('velX', -1*bullet.get('velX'));
                }
            },
            tryToCollide: function(bullet, barrier) {
                var bulletX = bullet.get('posX');
                var bulletY = bullet.get('posY');
                var barrierX = barrier.get('posX');
                var barrierY = barrier.get('posX');
                // TODO проверить -> изменить скорость -> вернуть true если столкнулись
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
            },

        });
        return new BulletCollection();
    }
);
