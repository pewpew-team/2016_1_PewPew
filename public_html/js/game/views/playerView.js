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
                    var context = this.canvas.getContext('2d');
                    context.beginPath();
                    context.fillStyle = "black";
                    context.fillRect(this.model.get('positionX') - this.model.get('playerSizeX')/2, this.model.get('positionY') - this.model.get('playerSizeY')/2, this.model.get('playerSizeX'), this.model.get('playerSizeY'));
                    context.closePath();
                },
                drawGun: function() {
                    var context = this.canvas.getContext('2d'),
                        angle = this.model.get('gunAngle');
                    context.beginPath();
                    context.moveTo(this.model.get('positionX'), this.model.get('positionY'));
                    context.strokeStyle = "purple";
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
