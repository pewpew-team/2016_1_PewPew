define(
    [
        'game/views/allBarriersView',
        'game/views/allBulletsView',
        'game/views/playerView',
        'game/models/player',
        'models/user',
        'game/collections/bulletCollection',
        'game/collections/barriersCollection',
        'underscore'
    ],
    function() {
        var bulletsView = require('game/views/allBulletsView'),
            bulletsCollection = require('game/collections/bulletCollection'),
            barriersCollection = require('game/collections/barriersCollection'),
            barriersView = require('game/views/allBarriersView'),
            PlayerView = require('game/views/playerView'),
            Player = require('game/models/player'),
            user = require('models/user'),
            _ = require('underscore');
        return {
            init: function () {
                this.dynamicCanvas = document.getElementById('dynamicLayer');
                this.player = new Player('Guest', this.dynamicCanvas.width, this.dynamicCanvas.height, "ally");
                this.playerView = new PlayerView(this.player, this.dynamicCanvas);
                var NUMBER_X = 16,
                    NUMBER_Y = 4,
                    RATIO = 0.3,
                    LEFT_CORNER_POS_X = 40,
                    LEFT_CORNER_POS_Y = 40;
                barriersCollection.createRandom(NUMBER_X, NUMBER_Y, RATIO, LEFT_CORNER_POS_X, LEFT_CORNER_POS_Y);
            },
            run: function() {
                requestAnimationFrame(_.bind(this.iterate, this));
            },
            iterate: function() {
                var context = this.dynamicCanvas.getContext('2d');
                context.clearRect(0, 0, this.dynamicCanvas.width, this.dynamicCanvas.height);
                bulletsView.render();
                barriersView.render();
                bulletsCollection.iterate(barriersCollection);
                this.playerView.render();
                requestAnimationFrame(_.bind(this.iterate, this));
            }
        };
    }
);
