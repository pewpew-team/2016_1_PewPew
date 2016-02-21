define(
    ['backbone', 'game/collections/bulletCollection', 'game/views/bulletView'],
    function() {
        var Backbone = require('backbone');
        var bulletCollection = require('collections/bulletCollection');
        var BulletView = require('views/bulletView');

        var BulletsView = Backbone.View.extend({
            default: {
                context: document.getElementById('dynamicLayer'),
            },
            render: function() {
                this.collection.each(function(bullet) {
                    var bulletView = new BulletView(bullet);
                    bulletView.render();
                })
            }
        });

        return new BulletsView({collection: bulletCollection});
    }
);
