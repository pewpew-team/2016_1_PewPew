define(
    [
        'backbone',
        'game/collections/bulletCollection',
        'game/views/bulletView'
    ],
    function() {
        var Backbone = require('backbone'),
            bulletCollection = require('game/collections/bulletCollection'),
            BulletView = require('game/views/bulletView'),
            BulletsView = Backbone.View.extend({
                render: function() {
                    this.collection.each(function(bullet) {
                        var bulletView = new BulletView(bullet, document.getElementById('dynamicLayer'));
                        bulletView.show();
                    });
                }
            });
        return new BulletsView({collection: bulletCollection});
    }
);
