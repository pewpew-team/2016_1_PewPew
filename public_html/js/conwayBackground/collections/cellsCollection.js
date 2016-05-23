define(function(require) {
        var Backbone = require('backbone'),
            Cell = require('conwayBackground/models/cell'),
            wordConfig = require('conwayBackground/collections/wordConfig');

        var CellsCollection = Backbone.Collection.extend({
            model: Cell,
            fill: function(sizeX, sizeY, numX, numY) {
                var stepX = sizeX/numX,
                    stepY = sizeY/numY;
                this.numX = numX;
                this.numY = numY;
                this.sizeX = sizeX;
                this.sizeY = sizeY;
                for (var i = 0; i < this.numX; i++) {
                    for (var j = 0; j < this.numY; j++) {
                        var index = i*numY + j;
                        this.add(new Cell({
                            posX: stepX*(i+0.5),
                            posY: stepY*(j+0.5)
                        }), {at: index});
                    }
                }
                this.writeWord();
            },
            writeWord: function() {
                var i, x, y;
                oCoords = wordConfig.O;
                for (i = 0; i < oCoords.length; i++) {
                    x = oCoords[i][1];
                    y = oCoords[i][0];
                    this.at(x*this.numY + y).set('value', 1);
                }
                fCoords = wordConfig.F;
                for (i = 0; i < fCoords.length; i++) {
                    x = fCoords[i][1];
                    y = fCoords[i][0];
                    this.at(x*this.numY + y).set('value', 1);
                }
                for (i = 0; i < fCoords.length; i++) {
                    x = fCoords[i][1] + 8;
                    y = fCoords[i][0];
                    this.at(x*this.numY + y).set('value', 1);
                }
                lCoords = wordConfig.L;
                for (i = 0; i < lCoords.length; i++) {
                    x = lCoords[i][1];
                    y = lCoords[i][0];
                    this.at(x*this.numY + y).set('value', 1);
                }
                iCoords = wordConfig.I;
                for (i = 0; i < iCoords.length; i++) {
                    x = iCoords[i][1];
                    y = iCoords[i][0];
                    this.at(x*this.numY + y).set('value', 1);
                }
                nCoords = wordConfig.N;
                for (i = 0; i < nCoords.length; i++) {
                    x = nCoords[i][1];
                    y = nCoords[i][0];
                    this.at(x*this.numY + y).set('value', 1);
                }
                eCoords = wordConfig.E;
                for (i = 0; i < eCoords.length; i++) {
                    x = eCoords[i][1];
                    y = eCoords[i][0];
                    this.at(x*this.numY + y).set('value', 1);
                }
            },
            update: function() {
                this.each(function(cell, index) {
                    var count = 0,
                        indexes = [index-1, index+1, index-this.sizeY, index-this.sizeY-1,
                                    index-this.sizeY+1, index+this.sizeY, index+this.sizeY-1,
                                    index+this.sizeY+1];
                    for (var i = 0; i < indexes.length; i++) {
                        if (this.at(indexes[i])) {
                            count += this.at(indexes[i]).get('value');
                        }
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
            },
            addCell: function(x, y) {
                var i = Math.trunc(x/this.at(1).get('sizeX'));
                    j = Math.trunc(y/this.at(1).get('sizeY'));
                console.log(x,y);
                this.at(i*this.numY + j).set('value', 1);
                this.trigger('updated');
            }
        });
        return new CellsCollection();
    }
);
