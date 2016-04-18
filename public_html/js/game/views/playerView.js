define(function (require) {
        var Backbone = require('backbone'),
            _ = require('underscore'),
            createjs = require('createjs'),
            bulletCollection = require('game/collections/bulletCollection'),
            theme = require('models/theme');

        var PlayerView = Backbone.View.extend({
                initialize: function (model, canvas) {
                    this.model = model;
                    this.canvas = canvas;
                    $(this.canvas).on('click', this.handleClick.bind(this));
                    $(this.canvas).on('mousemove', this.handleMouseMove.bind(this));
                    $(window).on('keydown', this.handleKeydown.bind(this));
                    $(window).on('keyup', this.handleKeyup.bind(this));
                    //прелоадим все положения игрока
                    this.preloader(0);
                    this.preloader(-1);
                    this.preloader(1);
                },
                render: function () {
                    this.model.iterate();
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
                        this.preloader( this.model.getCurrentDirection() ),
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
                    context.strokeStyle = theme.playerGunColor;
                    context.lineWidth = 5;
                    context.lineTo(this.model.get('positionX') + Math.cos(angle) * this.model.get('gunLength'), this.model.get('positionY') + Math.sin(angle) * this.model.get('gunLength'));
                    context.stroke();
                    context.closePath();
                },
                handleClick: function(e) {
                    e.preventDefault();
                    this.model.pointGunTo( e.offsetX , e.offsetY );
                    this.model.shoot();
                },
                handleMouseMove: function(e) {
                    e.preventDefault();
                    this.model.pointGunTo( e.offsetX , e.offsetY );
                },
                handleKeydown: function(e) {
                    e.preventDefault();
                    switch (e.keyCode) {
                        case 65:
                            //проваливание в 37 клавишу
                        case 37:
                            this.model.addPushedButton(-1);
                            break;
                        case 68:
                            //проваливание в 39 клавишу
                        case 39:
                            this.model.addPushedButton(1);
                            break;
                    }
                    //если человек резко сменил направление движения
                    if (e.keyCode !== this.model.get("previousDirection")) {
                        //резкий тормоз
                        this.model.stay();
                        this.model.set("previousDirection", e.keyCode);
                    }
                },
                handleKeyup: function(e) {
                    e.preventDefault();
                    switch (e.keyCode) {
                        case 65:
                            //проваливание в 37 клавишу
                        case 37:
                            this.model.dropPushedButton(-1);
                            break;
                        case 68:
                            //проваливание в 39 клавишу
                        case 39:
                            this.model.dropPushedButton(1);
                            break;
                    }
                },
                destroy: function() {
                    $(this.canvas).off('click mousemove');
                    $(window).off('keydown keyup');
                }
            });
        return PlayerView;
    }
);
