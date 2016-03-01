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
                        intersectionPoint = {
                            sideParallelX : {},
                            sideParallelY : {}
                        },
                        fault = 3,
                        deviation = 0.5 * Math.pow(-1 ,Math.random() * (5) ^ 0);
                    //точки столкновения со сторонами паралельно X или Y
                    intersectionPoint.sideParallelX.x = (bullet.get('velX') > 0) ?  0 : barrier.get('sizeX');
                    intersectionPoint.sideParallelX.y = k * intersectionPoint.sideParallelX.x + b;
                    intersectionPoint.sideParallelY.y = (bullet.get('velY') > 0) ?  0 : barrier.get('sizeY');
                    intersectionPoint.sideParallelY.x = (intersectionPoint.sideParallelY.y - b) / k;
                    //попадание на угол
                    if (Math.abs(intersectionPoint.sideParallelY.x - intersectionPoint.sideParallelX.x) < fault) {
                        this.moveToIntersectionPoint(bullet, barrier, intersectionPoint.sideParallelX);
                        bullet.set('velX', -1 * bullet.get('velX') + deviation);
                        bullet.set('velY', -1 * bullet.get('velY') + deviation);
                        return;
                    }
                    //левая или правая грань
                    if ((intersectionPoint.sideParallelX.y >= 0) && (intersectionPoint.sideParallelX.y <= barrier.get('sizeY'))) {
                        this.moveToIntersectionPoint(bullet, barrier, intersectionPoint.sideParallelX);
                        bullet.set('velX', -1 * bullet.get('velX') + deviation);
                        return;
                    }
                    //нижняя или верхняя грань
                    if ((intersectionPoint.sideParallelY.x >= 0) && (intersectionPoint.sideParallelY.x <= barrier.get('sizeX'))) {
                        this.moveToIntersectionPoint(bullet, barrier, intersectionPoint.sideParallelY);
                        bullet.set('velY', -1 * bullet.get('velY') + deviation);
                        return;
                    }
                },
                moveToIntersectionPoint: function(bullet, barrier, intersectionPoint) {
                    bullet.set('posX', intersectionPoint.x + (barrier.get('posX') - barrier.get('sizeX')/2));
                    bullet.set('posY', intersectionPoint.y + (barrier.get('posY') - barrier.get('sizeY')/2));
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
