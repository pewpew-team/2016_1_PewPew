define(function(require) {
    var Backbone = require('backbone'),
        FireShadowView = require('game/views/fireShadowView'),
        FireShadowsView = Backbone.View.extend({
            initialize: function(collection, canvas) {
                this.collection = collection;
                this.canvas = canvas;
            },
            render: function() {
                this.collection.iterate();
                var self = this;
                this.collection.each(function(fireShadow) {
                    ( new FireShadowView(fireShadow, self.canvas) ).render();
                });
            }
        });
    return FireShadowsView;
});
