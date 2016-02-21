define(
    [
        'game/views/screenView',
        'game/views/allBarriersView',
        'game/views/allBulletsView',
        'game/views/playerView',
        'game/models/player',
        'models/user'
    ],
    function() {
        var ScreenView = require('game/views/screenView');
        var bulletsView = require('game/views/allBulletsView');
        var barriersView = require('game/views/allBarriersView');
        var PlayerView = require('game/views/playerView');
        var Player = require('game/models/player');
        var user = require('models/user');

        return {
            init: function () {
                this.canvas = document.getElementById('dynamicLayer');
                this.staticCanvas = document.getElementById('staticLayer');
                this.player = new Player('Guest', this.canvas.width, 100);
                this.playerView = new PlayerView(this.player, this.canvas);
                this.screenView = new ScreenView(this.staticCanvas);
            },
            run: function() {
                // TODO
            }
        };
    }
);
