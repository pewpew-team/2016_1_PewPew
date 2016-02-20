define(
    ['backbone','models/bullet'],
    function() {
        var Backbone = require('backbone');
        var Bullet = require('maodels/bullet');
        var BulletCollection = Backbone.Collection.extend({
            model: Bullet
        });
    }
);
