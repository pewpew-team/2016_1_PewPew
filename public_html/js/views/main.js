define(function (require) {
    var baseView = require('views/baseView'),
        tmpl = require('tmpl/main'),
        tmplOffline = require('tmpl/offlineMain'),
        cellsCollection = require('conwayBackground/collections/cellsCollection'),
        cellsView = require('conwayBackground/views/cellsView');

    var View = baseView.extend({
        template: tmpl,
        show: function() {
            var isOnline = navigator.onLine;
            if (!isOnline) {
                this.template = tmplOffline;
                baseView.prototype.render.apply(this);
                this.drawCells();
            }
            baseView.prototype.show.apply(this);
        },
        drawCells: function() {
            var canvas = this.$('.js-conwayCanvas')[0],
                NUM_X = 50,
                NUM_Y = 15;
            cellsCollection.fill(canvas.width, canvas.height, NUM_X, NUM_Y);
            cellsView.draw(canvas);
        }
    });

    return new View();
});
