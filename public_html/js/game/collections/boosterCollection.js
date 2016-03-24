define(function(require) {
        var Backbone = require('backbone'),
            Booster = require('game/models/booster'),
            BarrierCollection = Backbone.Collection.extend({
                model: Booster
            });
        return new BoosterCollection();
    }
);
