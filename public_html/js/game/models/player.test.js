define(function (require) {
    QUnit.module("game/models/player");

    QUnit.test("Player - экземпляр Backbone.Model", function () {
        var Backbone = require('backbone'),
            Player = require('game/models/player'),
            player = new Player();

        QUnit.ok(player instanceof Backbone.Model, 'Player is instance of Backbone.Model');
    });

    QUnit.test("Player constructor", function () {
        var Player = require('game/models/player'),
            canvasWidth = 600,
            canvasHeight = 800,
            nick = 'Nick';

        var player = new Player(nick, canvasWidth, canvasHeight);

        QUnit.equal(player.get('nickname'), nick, 'Nick correct');
        QUnit.equal(player.get('positionX'), canvasWidth/2, 'posX correct');
        QUnit.equal(player.get('maxPositionX'), canvasWidth, 'maxPosX correct');
        QUnit.equal(player.get('currentPointerX'), canvasWidth/2, 'currentPointerX correct');
        QUnit.equal(player.get('currentPointerY'), canvasHeight/2, 'currentPointerY correct');
        QUnit.equal(player.get('positionY'), canvasHeight - player.get('playerSizeY') / 2, 'positionY correct');
        QUnit.equal(player.get('minLevelPointer'), 0, 'minLevelPointer correct');
        QUnit.equal(player.get('maxLevelPointer'), canvasHeight - player.get('playerSizeY') - player.get('gunLength'),
            'maxLevelPointer correct');
    });

    QUnit.test('Left and right move test', function() {
        var Player = require('game/models/player'),
            canvasWidth = 600,
            canvasHeight = 800,
            nick = 'Nick',
            player = new Player(nick, canvasWidth, canvasHeight)

        var prevPosX = player.get('positionX'),
            prevVelX = player.get('velocity');
        player.moveLeft();
        player.iterate();
        QUnit.ok(player.get('positionX') < prevPosX, 'Player moved left');
        QUnit.ok(player.get('velocity') < 0, player.get('velocity'));
        player.stay();
        QUnit.ok(player.get('velocity') === 0, 'Player moving to left');
        prevPosX = player.get('positionX');
        prevVelX = player.get('velocity');
        player.moveRight();
        player.iterate();
        QUnit.ok(player.get('positionX') > prevPosX, 'Player moved right');
        QUnit.ok(player.get('velocity') > 0, 'Player moving to right');
    });

});
