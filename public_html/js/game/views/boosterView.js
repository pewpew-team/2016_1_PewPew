define(function(require) {
    var Backbone = require('backbone'),
        dude = require('game/views/dude'),
        $ = require('jquery');

    var BoosterView = Backbone.View.extend({
            initialize: function(_model, _canvas) {
                this.canvas = _canvas;
                this.model = _model;
                dude.listenTo(this.model, 'apply', dude.showDude.bind(dude));
                this.img = new Image();
                this.img.src = "img/booster.png";
            },
            render: function() {
                var context = this.canvas.getContext('2d'),
                    model = this.model;
                context.beginPath();
                context.drawImage(
                    this.img, 
                    this.model.get('posX') - this.img.width/2, 
                    this.model.get('posY') - this.img.height/3
                    );
                context.closePath();     
            }
        });

    return BoosterView;
});
