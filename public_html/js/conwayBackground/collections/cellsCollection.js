define(function(require) {
        var Backbone = require('backbone'),
            Cell = require('conwayBackground/models/cell'),
            CellsCollection = Backbone.Collection.extend({
                model: Cell
            });
        return new CellsCollection();
    }
);
