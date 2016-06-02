define(function(require) {
    var Backbone = require('backbone'),
        FireShadow = require('game/models/fireShadow'),
        _ = require('underscore');

    var FireShadowCollection = Backbone.Collection.extend({
        model: FireShadow,
        deleteOld: function() {
            var oldBoosters = this.filter(function (fireShadow) {
                var currentTime = Date.now();
                return (currentTime - fireShadow.get('startLifeTime')) > fireShadow.get('maxLifeTime');
            }.bind(this));
            this.remove(oldBoosters);
        },
        iterate: function() {
            this.deleteOld();
            this.each(function (fireShadow){
                fireShadow.iterate();
            });
        },
        fire: function(posX, posY, angle, velocity) {
            var FIRE_LIFE = 200,
                SLOW = 1.5,
                fireShadow = new FireShadow({
                    'posX': posX,
                    'posY': posY,
                    'angle': angle,
                    'velocity': velocity / SLOW,
                    'startLifeTime': Date.now(),
                    'maxLifeTime': FIRE_LIFE
                });
            this.add(fireShadow);
        }
    });
    return new FireShadowCollection();
});
