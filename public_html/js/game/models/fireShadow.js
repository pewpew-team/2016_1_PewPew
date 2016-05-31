define(function(require) {
    var Backbone = require('backbone');

    var FireShadow = Backbone.Model.extend({
        defaults: {
            posX: 0,
            posY: 0,
            angle: 0,
            velocity: 0
        },
        iterate: function(dt) {
            this.set('posX', this.get('posX') + this.get('velocity') * Math.cos(this.get('angle')));
            this.set('posY', this.get('posY') + this.get('velocity') * Math.sin(this.get('angle')));
        }
    });
    return FireShadow;
});
