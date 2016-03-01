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
                /**
                 * Initialize view by collection instance
                 * @constructor
                 * @param {object} collection - BulletCollection instance
                 */
                initialize: function(collection) {
                    this.collection = collection;
                    collection.maxPosY = document.getElementById('dynamicLayer').height;
                },
                /**
                 * Render bullets to canvas with id = dynamicLayer
                 */
                render: function() {
                    this.collection.each(function(bullet) {
                        var bulletView = new BulletView(bullet, document.getElementById('dynamicLayer'));
                        bulletView.show();
                    });
                }
            });
        return BulletsView;
    }
);
