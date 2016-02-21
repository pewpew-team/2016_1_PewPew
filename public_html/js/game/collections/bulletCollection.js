define(
    ['backbone','game/models/bullet'],
    function() {
        var Backbone = require('backbone');
        var Bullet = require('models/bullet');
        var BulletCollection = Backbone.Collection.extend({
            model: Bullet
        });
        return new BulletCollection();
    }
);
