define(
    ['backbone'],
    function () {
        var Backbone = require('backbone'),
            Barrier = Backbone.Model.extend({
                defaults: {
                    sizeX: 30,
                    sizeY: 30
                },
                initialize: function(posX, posY, isRemovable) {
                    this.set({
                        'posX': posX,
                        'posY': posY,
                        'isRemovable': isRemovable
                    });
                }
            });
        return Barrier;
    }
);