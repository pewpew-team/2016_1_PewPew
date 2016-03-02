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

        var prevPosX = player.get('positionX');
        player.moveLeft();
        player.iterate();
        QUnit.ok(player.get('positionX') < prevPosX, 'Player moved left');
        QUnit.ok(player.get('velocity') < 0, player.get('velocity'));
        player.stay();
        QUnit.ok(player.get('velocity') === 0, 'Player moving to left');
        prevPosX = player.get('positionX');
        player.moveRight();
        player.iterate();
        QUnit.ok(player.get('positionX') > prevPosX, 'Player moved right');
        QUnit.ok(player.get('velocity') > 0, 'Player moving to right');
    });

    QUnit.test('Testing player shooting', function() {
        var Player = require('game/models/player'),
            canvasWidth = 600,
            canvasHeight = 800,
            nick = 'Nick',
            player = new Player(nick, canvasWidth, canvasHeight),
            bulletsCollection = require('game/collections/bulletCollection');

        var collectionLength = bulletsCollection.length;
        player.shoot();
        QUnit.equal(collectionLength + 1, bulletsCollection.length, 'Bullet added to collection')
    });

    QUnit.test('Testing player gun moving', function() {
        var Player = require('game/models/player'),
            canvasWidth = 600,
            canvasHeight = 800,
            nick = 'Nick',
            player = new Player(nick, canvasWidth, canvasHeight);

        var prevPointerX = player.get('currentPointerX'),
            prevPointerY = player.get('currentPointerY'),
            newPointerX = 500,
            newPointerY = 100;
        player.pointGunTo(newPointerX, newPointerY);
        QUnit.ok(prevPointerX !== newPointerX && prevPointerY !== newPointerY, 'Gun is moving');
        QUnit.ok(player.get('currentPointerX') === newPointerX && player.get('currentPointerY') === newPointerY,
            'Gun is pointing to right direction');

        newPointerX = canvasWidth;
        newPointerY = canvasHeight;
        player.pointGunTo(newPointerX, newPointerY);
        QUnit.ok(player.get('currentPointerY') === player.get('maxLevelPointer'), 'Gun direction bounded');
        QUnit.ok(player.get('currentPointerX') === newPointerX, 'Gun pointing to right to right X coord');

        newPointerX = -100;
        newPointerY = -100;
        player.pointGunTo(newPointerX, newPointerY);
        QUnit.ok(player.get('currentPointerY') === 0, 'Cannot point to negative Y coord');
    });
});
