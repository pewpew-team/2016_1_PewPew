define(function (require) {
        var Backbone = require('backbone'),
            _ = require('underscore'),
            createjs = require('createjs'),
            bulletCollection = require('game/collections/bulletCollection'),
            theme = require('models/theme'),
            screenModel = require('models/game');

        var EnemyView = Backbone.View.extend({
                initialize: function (model, canvas) {
                    this.model = model;
                    this.canvas = canvas;
                    //прелоадим все положения игрока
                    this.preloader('enemy_0');
                    this.preloader('enemy_-1');
                    this.preloader('enemy_1');
                },
                render: function () {
                    this.drawBase();
                    this.drawGun();
                },
                preloaderQueue: {},
                preloader: function(hash){
                    hash = 'img/spacecraft/' + hash + '.png';
                    if (!this.preloaderQueue[hash]) {
                        var img = new Image();
                        img.src = hash;
                        this.preloaderQueue[hash] = img;
                    }
                    return this.preloaderQueue[hash];
                },
                drawBase: function() {
                    var context = this.canvas.getContext('2d');
                    context.beginPath();
                    context.drawImage(
                        this.preloader( 'enemy_' + this.model.getCurrentDirection() ),
                        this.model.get('positionX') - this.model.get('playerSizeX')/2 - 48,
                        this.model.get('positionY') - this.model.get('playerSizeY')/2
                        );
                    context.closePath();
                },
                drawGun: function() {
                    var context = this.canvas.getContext('2d'),
                        angle = this.model.get('gunAngle');

                    context.beginPath();
                    context.moveTo(this.model.get('positionX'), this.model.get('positionY'));
                    context.strokeStyle = theme['playerGunColor'];
                    context.lineWidth = 5;
                    context.lineTo(this.model.get('positionX') + Math.cos(angle) * this.model.get('gunLength'),
                        this.model.get('positionY') + Math.sin(angle) * this.model.get('gunLength'));
                    context.stroke();
                    context.closePath();
                },
                destroy: function() {
                    $(this.canvas).off('click mousemove');
                    $(window).off('keydown keyup');
                }
            });
        return EnemyView;
    }
);
