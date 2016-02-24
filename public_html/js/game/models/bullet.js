define(
    ['backbone'],
    function() {
        var Backbone = require('backbone');
        var Bullet = Backbone.Model.extend({
            defaults: {
              V: 5
            },
            sync: function() {
                // TODO отправляет данные на сервер через ws
            },
            iterate: function() {
                var velX = this.get('velX');
                var velY = this.get('velY');
                this.set('posX', this.get('posX')+velX);
                this.set('posY', this.get('posY')+velY);
            }
        });
        return Bullet;
    }
);
