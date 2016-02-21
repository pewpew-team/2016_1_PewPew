define(
    ['backbone', 'game/views/barrierView', 'game/collections/barriersCollection'],
    function() {
        var Backbone = require('backbone');
        var BarrierView = require('game/views/barrierView');
        var barriersCollection = require('game/collections/barriersCollection');

        var BarriersView = Backbone.View.extend({
            render: function() {
                this.collection.each(function(bullet) {
                    var barrierView = new BarrierView(bullet);
                    barrierView.render();
                });
            }
        });

        return new BarriersView({collection: barriersCollection});
    }
);
