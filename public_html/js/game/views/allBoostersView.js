define(function(require) {
    var Backbone = require('backbone'),
        BoosterView = require('game/views/boosterView'),
        boosterCollection = require('game/collections/boosterCollection'),
        BoostersView = Backbone.View.extend({
            render: function() {
                this.collection.each(function(booster) {
                    var boosterView = new BoosterView(booster, document.getElementById('dynamicLayer'));
                    boosterView.render();
                });
            }
        });
    return BoostersView;
});
