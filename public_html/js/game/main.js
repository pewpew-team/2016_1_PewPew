define(
    [
        'game/views/screenView',
        'game/views/allBarriersView',
        'game/views/allBulletsView',
        'game/views/playerView'
    ],
    function() {
        var screenView = require('game/views/screenView');
        var bulletsView = require('game/views/allBulletsView');
        var barriersView = require('game/views/allBarriersView');
        var playerView = require('game/views/playerView');

        return {
            init: function () {
                alert('game init');
            },
            run: function() {

            }
        };
    }
);
