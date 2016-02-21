define(
    ['backbone'],
    function() {
        var Backbone = require('backbone');
        var Bullet = Backbone.Model.extend({
            initialize: function(posX, posY, velX, velY, sizeX, sizeY) {
                this.set({
                    'posX': posX,
                    'posY': posY,
                    'velX': velX,
                    'velY': velY,
                    'sizeX': sizeX,
                    'sizeY': sizeY
                });
            },
            sync: function() {
                // TODO отправляет данные на сервер через ws
            },
            iterate: function() {
                this.posX += this.velX;
                this.posY += this.velY;
            }
        });
        return Bullet;
    }
);
