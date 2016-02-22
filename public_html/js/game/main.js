define(
    [
        'game/views/screenView',
        'game/views/allBarriersView',
        'game/views/allBulletsView',
        'game/views/playerView',
        'game/models/player',
        'models/user',
        'game/collections/bulletCollection',
        'underscore'
    ],
    function() {
        var ScreenView = require('game/views/screenView');
        var bulletsView = require('game/views/allBulletsView');
        var bulletsCollection = require('game/collections/bulletCollection');
        var barriersView = require('game/views/allBarriersView');
        var PlayerView = require('game/views/playerView');
        var Player = require('game/models/player');
        var user = require('models/user');
        var _ = require('underscore');

        return {
            init: function () {
                try {
                    this.canvas = document.getElementById('dynamicLayer');
                    this.staticCanvas = document.getElementById('staticLayer');
                    this.player = new Player('Guest', this.canvas.width, 100);
                    this.playerView = new PlayerView(this.player, this.canvas);
                    this.screenView = new ScreenView(this.staticCanvas);
                }
                catch (e) {
                    console.log('error');
                }
            },
            run: function() {
                window.setInterval(_.bind(this.iterate, this), 1000/60);
            },
            iterate: function() {
                var context = this.canvas.getContext('2d');
                context.clearRect(0, 0, this.canvas.width, this.canvas.height);
                bulletsView.render();
                bulletsCollection.iterate();
                this.playerView.render();
            }
        };
    }
);
