define(
    ['backbone','game/models/bullet','underscore'],
    function() {
        var Backbone = require('backbone'),
            Bullet = require('game/models/bullet'),
            _ = require('underscore'),
            BulletCollection = Backbone.Collection.extend({
                model: Bullet,
                iterate: function(barriersCollection) {
                    this.canvas = document.getElementById('dynamicLayer');
                    this.barriers = barriersCollection;
                    this.each(_.bind(this.iterateBullet, this));
                    this.deleteOutOfBoxBullets();
                },
                deleteOutOfBoxBullets: function() {
                    var outOfBox = this.filter(function (bullet) {
                        return bullet.get('posY') < 0 || bullet.get('posY') > this.maxPosY;
                    });
                    this.remove(outOfBox);
                },
                iterateBullet: function (bullet) {
                    bullet.iterate();
                    for (var i = 0; i < this.barriers.length; i++) {
                        if ( this.tryToCollide(bullet, this.barriers.at(i)) ) {
                            this.collide(bullet, this.barriers.at(i));
                            if (this.barriers.at(i).get("isRemovable")) {
                                this.barriers.remove(this.barriers.at(i));
                            }
                        }
                    }
                    if (bullet.get('posX') < 0 || bullet.get('posX') > this.canvas.width) {
                        bullet.set('velX', -1*bullet.get('velX'));
                    }
                },
                tryToCollide: function(bullet, barrier) {
                    var collisionDistX = Math.pow((bullet.get('sizeX') + barrier.get('sizeX')) / 2, 2),
                        collisionDistY = Math.pow((bullet.get('sizeY') + barrier.get('sizeY')) / 2, 2),
                        distSquare = Math.pow((bullet.get('posX') - barrier.get('posX')), 2) +
                            Math.pow((bullet.get('posY') - barrier.get('posY')), 2);
                    return (collisionDistX > distSquare) || (collisionDistY > distSquare);
                },
                collide: function(bullet, barrier) {
                    var bulletPosX = bullet.get('posX') - (barrier.get('posX') - barrier.get('sizeX')/2),
                        bulletPosY = bullet.get('posY') - (barrier.get('posY') - barrier.get('sizeY')/2),
                        k = bullet.get('velY')/ bullet.get('velX'),
                        b = bulletPosY - k * bulletPosX,
                        possiblePosition = {
                            deltaX : {},
                            deltaY : {}
                        },
                        fault = 3,
                        deviation = 0.5 * Math.pow(-1 ,Math.random() * (5) ^ 0);

                    //возможные отклонения ????
                    possiblePosition.deltaX.x = bullet.get('velX') ?  0 : barrier.get('sizeX');
                    possiblePosition.deltaX.y = k * possiblePosition.deltaX.x + b;
                    possiblePosition.deltaY.y = bullet.get('velY') ?  0 : barrier.get('sizeY');
                    possiblePosition.deltaY.x = (possiblePosition.deltaY.y - b) / k;

                    //попадание на угол
                    if (((Math.abs(possiblePosition.deltaY.x - possiblePosition.deltaX.x) < fault) ||
                        (Math.abs(possiblePosition.deltaY.x - possiblePosition.deltaX.x)) < fault)) {
                        bullet.set('posX', possiblePosition.deltaX.x + (barrier.get('posX') - barrier.get('sizeX')/2));
                        bullet.set('posY', possiblePosition.deltaX.y + (barrier.get('posY') - barrier.get('sizeY')/2));
                        bullet.set('velX', -1 * bullet.get('velX') + deviation);
                        bullet.set('velY', -1 * bullet.get('velY') + deviation);
                        return;
                    }
                    //левая или правая грань
                    if ((possiblePosition.deltaX.y >= 0) && (possiblePosition.deltaX.y <= barrier.get('sizeY'))) {
                        bullet.set('posX', possiblePosition.deltaX.x + (barrier.get('posX') - barrier.get('sizeX')/2));
                        bullet.set('posY', possiblePosition.deltaX.y + (barrier.get('posY') - barrier.get('sizeY')/2));
                        bullet.set('velX', -1 * bullet.get('velX') + deviation);
                        return;
                    }
                    //нижняя или верхняя грань
                    if ((possiblePosition.deltaY.x >= 0) && (possiblePosition.deltaY.x <= barrier.get('sizeX'))) {
                        bullet.set('posX', possiblePosition.deltaY.x + (barrier.get('posX') - barrier.get('sizeX')/2));
                        bullet.set('posY', possiblePosition.deltaY.y + (barrier.get('posY') - barrier.get('sizeY')/2));
                        bullet.set('velY', -1 * bullet.get('velY') + deviation);
                        return;
                    }
                },
                fire: function(posX0, posY0, Vx, Vy) {
                    var bullet = new Bullet({
                        'posX': posX0,
                        'posY': posY0,
                        'VELOCITY' : 1,
                        'velX': Vx,
                        'velY': Vy,
                        'sizeX': 10,
                        'sizeY': 10
                    });
                    this.add(bullet);
                }
            });
            return new BulletCollection();
        }
);
