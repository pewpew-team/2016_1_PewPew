define(
    ['backbone'],
    function() {
        var Backbone = require('backbone');
        var bulletView = Backbone.View.extend({
            model: require('models/bullet'),
            initialize: function(model) {
                this.set({
                    'context': document.getElementById('dynamicLayer'),
                    'model': model
                });
            },
            show: function() {
                context.beginPath();
                context.fillStyle = "orange";
                var model = this.model;
                context.fillRect(model.get('posX') - model.get('sizeX') / 2, model.get('posY') - model.get('sizeY') / 2,
                    model.get('sizeX'), model.get('sizeY'));
                context.closePath();
            }
        });

        return bulletView;
    }
);