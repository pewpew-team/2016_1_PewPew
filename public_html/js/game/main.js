define(
    [
        'game/views/screenView',
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
        var ScreenView = require('game/views/screenView'),
            bulletsView = require('game/views/allBulletsView'),
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
                this.staticCanvas = document.getElementById('staticLayer');
                this.player = new Player('Guest', this.dynamicCanvas.width, this.dynamicCanvas.height, "ally");
                this.playerView = new PlayerView(this.player, this.dynamicCanvas);
                barriersCollection.createRandom(8,2,0.5,40,40);
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
