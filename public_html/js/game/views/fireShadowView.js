define(function(require) {
    var Backbone = require('backbone'),
        theme = require('models/theme');

    var FireShadowView = Backbone.View.extend({
        initialize: function(model, canvas) {
            this.canvas = canvas;
            this.model = model;
            this.COUNT_STATE = 5;
            this.RADIUS_PER_STATE = 3;
        },
        getState: function(model) {
            var startMoment = model.get('startLifeTime'),
                maxLifeTime = model.get('maxLifeTime'),
                norm =  maxLifeTime / this.COUNT_STATE,
                currentTime = Date.now();
            return  Math.abs((startMoment + maxLifeTime - currentTime) / norm ^ 0 );
        },
        render: function() {
            var context = this.canvas.getContext('2d'),
                model = this.model;
            //отображение выстрела
            context.beginPath();
            context.fillStyle = theme['bulletsColor'];
            context.arc(model.get('posX'), model.get('posY') ,
                this.getState(model) * this.RADIUS_PER_STATE, 0, 2 * Math.PI, false);
            context.fill();
            context.closePath();
        }
    });
    return FireShadowView;
});
