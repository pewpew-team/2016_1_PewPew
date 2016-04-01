define(function(require) {
    var Backbone = require('backbone'),
        background = require('models/background'),
        dude = require('game/views/dude'),
        $ = require('jquery');

    var BoosterView = Backbone.View.extend({
            initialize: function(_model, _canvas) {
                this.canvas = _canvas;
                this.model = _model;
                this.model.on('apply', dude.showDude.bind(dude));
            },
            render: function() {
                var context = this.canvas.getContext('2d'),
                    model = this.model;
                context.beginPath();
                var img = new Image();
                img.src = "img/booster.png";
                context.drawImage(img, this.model.get('posX') - img.width/2, this.model.get('posY') - img.height/3);
                context.closePath();     
            }
        });

    return BoosterView;
});
