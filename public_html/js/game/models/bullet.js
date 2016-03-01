define(
    ['backbone'],
    function() {
        var Backbone = require('backbone'),
            Bullet = Backbone.Model.extend({
                defaults: {
                    posX: 0,
                    posY: 0,
                    velX: 0,
                    velY: 0
                },
                sync: function() {
                    // TODO отправляет данные на сервер через ws
                },
                iterate: function() {
                    this.set('posX', this.get('posX') + this.get('velX'));
                    this.set('posY', this.get('posY') + this.get('velY'));
                },
                getPreviousPosition: function() {
                    return {
                        x: this.get('posX') - this.get('velX'),
                        y: this.get('posY') - this.get('velY')
                    }
                }
            });
        return Bullet;
    }
);
