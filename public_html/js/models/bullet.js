define(
    ['backbone',],
    function() {
        var Backbone = require('backbone');
        var Bullet = Backbone.Model.extend({
            init: function(posX, posY, velX, velY) {
                this.set({
                    'posX': posX,
                    'posY': posY,
                    'velX': velX,
                    'velY': velY
                });
            },
            sendData: function() {
                // TODO
            },
            iterate: function() {
                // TODO
            }
        });


    }
);
