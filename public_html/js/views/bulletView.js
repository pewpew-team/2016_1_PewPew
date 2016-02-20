define(
    ['backbone','models/bullet'],
    function() {
        var Backbone = require('backbone');
        var bulletView = Backbone.View.extend({
            model: require('models/bullet'),
            initialize: function() {
                this.set('context', );
            },
            render: function() {
                // TODO
            }
        });
    }
);