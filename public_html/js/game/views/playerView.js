define(
    [
        'backbone',
        'game/collections/bulletCollection',
        'underscore'
    ],
    function () {
        var Backbone = require('backbone'),
            _ = require('underscore'),
            bulletCollection = require('game/collections/bulletCollection'),
            PlayerView = Backbone.View.extend({
                initialize: function (model, canvas) {
                    this.model = model;
                    this.canvas = canvas;
                    this.canvas.addEventListener('click', _.bind(this.handleClick, this))
                    this.canvas.addEventListener('mousemove', _.bind(this.handleMouseMove, this));
                    window.addEventListener('keydown', _.bind(this.handleKeydown, this));
                    window.addEventListener('keyup', _.bind(this.handleKeyup, this));
                },
                render: function () {
                    this.model.iterate();
                    this.drawBase();
                    this.drawGun();
                },
                drawBase: function() {
                    var context = this.canvas.getContext('2d'),
                        posX = this.model.get('positionX'),
                        posY = this.model.get('positionY'),
                        sizeX = this.model.get('playerSizeX'),
                        sizeY = this.model.get('playerSizeY');
                    context.beginPath();
                    context.fillStyle = "black";
                    context.fillRect(posX-sizeX/2, posY-sizeY/2, sizeX, sizeY);
                    context.closePath();
                },
                drawGun: function() {
                    var context = this.canvas.getContext('2d'),
                        angle = this.model.get('gunAngle'),
                        angleSin = Math.sin(angle),
                        angleCos = Math.cos(angle),
                        gunLength = this.model.get('gunLength'),
                        posX = this.model.get('positionX'),
                        posY = this.model.get('positionY');
                    context.beginPath();
                    context.moveTo(posX, posY);
                    context.strokeStyle = "purple";
                    context.lineWidth = 5;
                    context.lineTo(posX + angleCos * gunLength, posY + angleSin * gunLength);
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
                            this.model.moveLeft();
                            break;
                        case 68:
                            //проваливание в 39 клавишу
                        case 39:
                            this.model.moveRight();
                            break;
                    }
                },
                handleKeyup: function(e) {
                    e.preventDefault();
                    this.model.dropPushedButton();
                }
            });
        return PlayerView;
    }
);
