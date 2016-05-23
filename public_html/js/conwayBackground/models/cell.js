define(function (require) {
        var Backbone = require('backbone'),
            Cell = Backbone.Model.extend({
                defaults: {
                    value: 0,
                    nextValue: 0,
                    posX: 0,
                    posY: 0,
                    sizeX: 0,
                    sizeY: 0
                },
                isAlive: function() {
                    return this.get(value) === 1;
                },
                update: function() {
                    this.set('value', this.get('nextValue'));
                }
            });
        return Cell;
    }
);
