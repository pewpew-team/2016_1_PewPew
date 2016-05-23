define(function(require) {
        var Backbone = require('backbone'),
            Cell = require('conwayBackground/models/cell'),
            wordConfig = require('conwayBackground/collections/wordConfig');

        var CellsCollection = Backbone.Collection.extend({
            model: Cell,
            fill: function(sizeX, sizeY) {
                this.sizeX = sizeX;
                this.sizeY = sizeY;
                for (var i = 0; i < this.sizeX; i++) {
                    for (var j = 0; j < this.sizeY; j++) {
                        var index = i*sizeY + j;
                        this.add(new Cell(), {at: index});
                    }
                }
                this.writeWord();
            },
            writeWord: function() {
                // TODO
            },
            update: function() {
                this.each(function(cell, index) {
                    var count = 0,
                        indexes = [index-1, index+1, index-this.sizeY, index-this.sizeY-1,
                                    index-this.sizeY+1, index+this.sizeY, index+this.sizeY-1,
                                    index+this.sizeY+1];
                    for (var i = 0; i < indexes.length; i++) {
                        count += this.at(indexes[i]).get('value');
                    }
                    if (cell.isAlive()) {
                        cell.set('nextValue', count === 2 || count === 3 ? 1 : 0);
                    } else {
                        cell.set('nextValue', count === 3 ? 1 : 0);
                    }
                }.bind(this));
                this.each(function(cell, index) {
                    cell.update();
                }.bind(this));
            }
        });
        return new CellsCollection();
    }
);
