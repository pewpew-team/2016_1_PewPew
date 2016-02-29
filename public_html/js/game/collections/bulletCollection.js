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
                            break;
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
                    var previousPosition = bullet.getPreviousPosition(),
                        bulletPosX = bullet.get('posX'),
                        bulletPosY = bullet.get('posY'),

                        bulletSizeX = bullet.get('sizeX'),
                        bulletSizeY = bullet.get('sizeY'),

                        bulletVelX = bullet.get('velX'),
                        bulletVelY = bullet.get('velY'),

                        barrierPosX = barrier.get('posX'),
                        barrierPosY = barrier.get('posY'),

                        barrierSizeX = barrier.get('sizeX'),
                        barrierSizeY = barrier.get('sizeY'),

                        k = (previousPosition.y - bulletPosY) / (previousPosition.x - bulletPosX),
                        b = bulletPosY - k * bulletPosX,
                        possiblePosition = {
                            deltaX : {},
                            deltaY : {}
                        },
                        fault = 3,
                        deviation = 0.5 * Math.pow(-1 ,Math.random() * (5) ^ 0);

                    //возможные отклонения
                    possiblePosition.deltaX.x = barrierPosX - Math.sign(bulletVelX) * (barrierSizeX / 2 + bulletSizeX / 2);
                    possiblePosition.deltaX.y = k * possiblePosition.deltaX.x + b;
                    possiblePosition.deltaY.y = barrierPosY - Math.sign(bulletVelY) * (barrierSizeY / 2 + bulletSizeY / 2);
                    possiblePosition.deltaY.x = (possiblePosition.deltaY.y - b) / k;

                    //попадание на угол
                    if (((Math.abs(possiblePosition.deltaY.x - possiblePosition.deltaX.x) < fault) ||
                        (Math.abs(possiblePosition.deltaY.x - possiblePosition.deltaX.x)) < fault)) {
                        bullet.set('posX', possiblePosition.deltaX.x);
                        bullet.set('posY', possiblePosition.deltaX.y);
                        bullet.set('velX', -1 * bulletVelX + deviation);
                        bullet.set('velY', -1 * bulletVelY + deviation);
                        return;
                    }
                    //левая или правая грань
                    if (((barrierPosY - barrierSizeY / 2 - bulletSizeY / 2) <= possiblePosition.deltaX.y) &&
                        (possiblePosition.deltaX.y <= (barrierPosY + barrierSizeY / 2 + bulletSizeY / 2))) {
                        bullet.set('posX', possiblePosition.deltaX.x);
                        bullet.set('posY', possiblePosition.deltaX.y);
                        bullet.set('velX', -1 * bulletVelX + deviation);
                        return;
                    }
                    //нижняя или верхняя грань
                    if (((barrierPosX - barrierSizeX / 2 - bulletSizeX / 2) <= possiblePosition.deltaY.x) &&
                        (possiblePosition.deltaY.x <= (barrierPosX + barrierSizeX / 2 + bulletSizeX / 2))) {
                        bullet.set('posX', possiblePosition.deltaY.x);
                        bullet.set('posY', possiblePosition.deltaY.y);
                        bullet.set('velY', -1 * bulletVelY + deviation);
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
