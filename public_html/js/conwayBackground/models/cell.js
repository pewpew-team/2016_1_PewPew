define(function (require) {
        var Backbone = require('backbone'),
            Cell = Backbone.Model.extend({
                defaults: {
                    value: 0
                }
            });
        return Cell;
    }
);
