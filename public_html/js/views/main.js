define(function (require) {
    var baseView = require('views/baseView'),
        tmpl = require('tmpl/main'),
        tmplOffline = require('tmpl/offlineMain'),
        cellsCollection = require('conwayBackground/collections/cellsCollection'),
        cellsView = require('conwayBackground/views/cellsView');

    var View = baseView.extend({
        template: tmpl,
        events: {
            'click .js-conway-run' : 'conwayRun',
            'click .js-conway-stop': 'conwayStop',
            'click .js-conwayCanvas': 'addCell'
        },
        show: function() {
            var isOnline = navigator.onLine;
            if (!isOnline) {
                this.template = tmplOffline;
                baseView.prototype.render.apply(this);
                cellsView.canvas = this.$('.js-conwayCanvas')[0];
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
        },
        conwayRun: function(e) {
            e.preventDefault();
            this.conwayRunning = true;
            this.iterationCount = 0;
            requestAnimationFrame(this.conwayIteration.bind(this));
        },
        conwayStop: function(e) {
            e.preventDefault();
            this.conwayRunning = false;
        },
        conwayIteration: function() {
            var canvas = this.$('.js-conwayCanvas')[0];
            this.iterationCount++;
            if (this.iterationCount % 15 === 0) {
                cellsCollection.update();
                canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
                cellsView.draw();
            }
            if (this.conwayRunning) {
                requestAnimationFrame(this.conwayIteration.bind(this));
            }
        },
        addCell: function(event) {
            event.preventDefault();
            var x = event.clientX,
                y = event.clientY,
                canvas = this.$('.js-conwayCanvas')[0];
                clientRect = canvas.getBoundingClientRect();
            x -= clientRect.left;
            y -= clientRect.top;
            cellsCollection.addCell(x, y);
        }
    });

    return new View();
});
