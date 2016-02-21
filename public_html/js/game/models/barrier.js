define(
    ['backbone'],
    function () {
        var Backbone = require('backbone');

        var Barrier = Backbone.Model.extend({
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