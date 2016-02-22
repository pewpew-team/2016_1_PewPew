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
                // Рисуем платформу
                var context = this.canvas.getContext('2d');
                context.beginPath();
                context.fillStyle = "black";
                var model = this.model;
                context.fillRect(model.get('position') - model.get('playerSize') / 2, this.canvas.height - 20,
                    model.get('playerSize'), 40);
                context.closePath();
                // Рисуем пушку
                context.beginPath();
                var gunVectorX = this.model.get('gunVectorX');
                var gunVectorY = this.model.get('gunVectorY');
                var angle_sin = gunVectorY/Math.sqrt(gunVectorX*gunVectorX+gunVectorY*gunVectorY);
                var angle_cos = gunVectorX/Math.sqrt(gunVectorX*gunVectorX+gunVectorY*gunVectorY);
                var GUN_LENGTH = 40;
                context.moveTo(this.model.get('position'), this.canvas.height);
                context.strokeStyle = "purple";
                context.lineWidth = 5;
                context.lineTo(this.model.get('position') + angle_cos * GUN_LENGTH, this.canvas.height
                    - angle_sin * GUN_LENGTH);
                context.stroke();
                context.closePath();

            },
            handleClick: function(e) {
                e.preventDefault();
                var x = e.clientX;
                var y = e.clientY;
                var posX = this.model.get('position');
                var posY = this.canvas.height;
                var Vx = x-posX;
                var Vy = y-posY;
                var V = 5;
                console.log('%s %s',Vx,Vy);
                Vx = V*Vx/Math.sqrt(Vx*Vx+Vy*Vy);
                Vy = V*Vy/Math.sqrt(Vx*Vx+Vy*Vy);
                bulletCollection.fire(posX, posY, Vx, Vy);
            },
            handleMouseMove: function(e) {
                e.preventDefault();
                var x = e.clientX;
                var y = e.clientY;
                var posX = this.model.get('position');
                var posY = this.canvas.height;
                var dx = x-posX;
                var dy = y-posY;
                dx = dx/Math.sqrt(dx*dx+dy*dy);
                dy = dy/Math.sqrt(dx*dx+dy*dy);
                this.model.set({'gunVectorX': dx, 'gunVectorY': dy});
            },
            handleKeydown: function(e) {
                e.preventDefault();
                console.log(e.keyCode);
                switch (e.keyCode) {
                    case 37:
                        this.model.moveLeft();
                        break;
                    case 39:
                        this.model.moveRight();
                        break;
                }
            }
        });

        return PlayerView;
    }
);
