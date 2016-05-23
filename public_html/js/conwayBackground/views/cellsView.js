define(function (require) {
        var Backbone = require('backbone'),
            $ = require('jquery');

        var CellsView = Backbone.View.extend({
                draw: function() {
                    var context = $('.js-conwayCanvas').getContext('2d');
                    if (context) {
                        context.beginPath();
                        this.collection.each(function(cell, index) {
                            if(cell.isAlive()) {
                                context.beginPath();
                                context.fillStyle = 'black';
                                context.fillRect(cell.get('posX') - cell.get('sizeX') / 2,
                                    cell.get('posY') - cell.get('sizeY') / 2,
                                    cell.get('sizeY'), cell.get('sizeX'));
                                context.closePath();
                            } else {
                                context.beginPath();
                                context.strokeStyle = 'black';
                                context.strokeRect(cell.get('posX') - cell.get('sizeX') / 2,
                                    cell.get('posY') - cell.get('sizeY') / 2,
                                    cell.get('sizeY'), cell.get('sizeX'));
                                context.closePath();
                            }
                        });
                    }
                }
            });
        return new CellsView();
    }
);
