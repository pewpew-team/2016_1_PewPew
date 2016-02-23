define(
    ['backbone', 'game/collections/bulletCollection', 'underscore'],
    function () {
        var Backbone = require('backbone');
        var _ = require('underscore');
        var bulletCollection = require('game/collections/bulletCollection');

        var PlayerView = Backbone.View.extend({
            initialize: function (model, canvas) {
                this.model = model;
                console.log(this.model);
                this.canvas = canvas;
                this.canvas.addEventListener('click', _.bind(this.handleClick, this))
                this.canvas.addEventListener('mousemove', _.bind(this.handleMouseMove, this));
                window.addEventListener('keydown', _.bind(this.handleKeydown, this));
            },
            render: function () {
                this.model.iterate();
                this.drawBase();
                this.drawGun();
            },
            drawBase: function() {
                var context = this.canvas.getContext('2d');
                var posX = this.model.get('position');
                var sizeX = this.model.get('playerSizeX');
                var posY = this.canvas.height;
                var sizeY = this.model.get('playerSizeY');
                context.beginPath();
                context.fillStyle = "black";
                context.fillRect(posX-sizeX/2, posY-sizeY, sizeX, sizeY);
                context.closePath();
            },
            drawGun: function() {
                var context = this.canvas.getContext('2d');
                var angle = this.model.get('gunAngle');
                var angle_sin = Math.sin(angle);
                var angle_cos = Math.cos(angle);
                var gunLength = this.model.get('gunLength');
                var posX = this.model.get('position');
                var posY = this.canvas.height-this.model.get('playerSizeY');
                context.beginPath();
                context.moveTo(posX, posY);
                context.strokeStyle = "purple";
                context.lineWidth = 5;
                context.lineTo(posX + angle_cos * gunLength, posY + angle_sin * gunLength);
                context.stroke();
                context.closePath();
            },
            handleClick: function(e) {
                e.preventDefault();
                var x = e.clientX;
                var y = e.clientY;
                this.model.pointGunTo(x,y);
                this.model.shoot();
            },
            handleMouseMove: function(e) {
                e.preventDefault();
                var x = e.clientX;
                var y = e.clientY;
                this.model.pointGunTo(x, y);
            },
            handleKeydown: function(e) {
                e.preventDefault();
                switch (e.keyCode) {
                    case 37:
                        this.model.moveLeft();
                        break;
                    case 39:
                        this.model.moveRight();
                        break;
                    case 65:
                        this.model.moveLeft();
                        break;
                    case 68:
                        this.model.moveRight();
                        break;
                }
            }
        });

        return PlayerView;
    }
);
