define(function(require) {
    var Backbone = require('backbone');

    var Bullet = Backbone.Model.extend({
            defaults: {
                posX: 0,
                posY: 0,
                velX: 0,
                velY: 0,
                sizeX: 15,
                sizeY: 15,
                id_: 0
            },
            iterate: function(dt) {
                this.set('posX', this.get('posX') + dt*this.get('velX'));
                this.set('posY', this.get('posY') + dt*this.get('velY'));
            },
            getPreviousPosition: function() {
                return {
                    x: this.get('posX') - this.get('velX'),
                    y: this.get('posY') - this.get('velY')
                };
            }
        });
    return Bullet;
});
