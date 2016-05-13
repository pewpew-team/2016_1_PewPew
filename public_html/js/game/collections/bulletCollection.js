define(function(require) {
    var Backbone = require('backbone'),
        Bullet = require('game/models/bullet'),
        _ = require('underscore'),
        BulletCollection = Backbone.Collection.extend({
            model: Bullet,
            initialize: function() {
                this.isAddable = true;
            },
            iterate: function(barriersCollection, screenWidth, screenHeight, dt, isNotCollide) {
                this.screenWidth = screenWidth;
                this.screenHeight = screenHeight;
                this.barriers = barriersCollection;
                this.dt = dt;
                this.isNotCollide = isNotCollide || false;
                this.each(this.iterateBullet.bind(this));
                this.deleteOutOfBoxBullets();
            },
            deleteOutOfBoxBullets: function() {
                var outOfBox = this.filter(function (bullet) {
                    return bullet.get('posY') < 0 || bullet.get('posY') > this.screenHeight;
                }.bind(this));
                this.remove(outOfBox);
            },
            iterateBullet: function (bullet, isNotCollide) {
                bullet.iterate(this.dt);
                if (!this.isNotCollide) {
                    for (var i = 0; i < this.barriers.length; i++) {
                        if ( this.tryToCollide(bullet, this.barriers.at(i)) ) {
                            this.collide(bullet, this.barriers.at(i));
                            if (this.barriers.at(i).get("isRemovable")) {
                                this.barriers.remove(this.barriers.at(i));
                                this.trigger('barrierDestroy');
                            }
                        }
                    }
                }
                if (bullet.get('posX') < 0 || bullet.get('posX') > this.screenWidth) {
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
                    fault = 2;
                //точки столкновения со сторонами паралельно X или Y
                intersectionPoint.sideParallelX.x = (bullet.get('velX') > 0) ?  0 : barrier.get('sizeX');
                intersectionPoint.sideParallelX.y = k * intersectionPoint.sideParallelX.x + b;
                intersectionPoint.sideParallelY.y = (bullet.get('velY') > 0) ?  0 : barrier.get('sizeY');
                intersectionPoint.sideParallelY.x = (intersectionPoint.sideParallelY.y - b) / k;
                //попадание на угол
                if (Math.abs(intersectionPoint.sideParallelY.x - intersectionPoint.sideParallelX.x) < fault) {
                    this.moveToIntersectionPoint(bullet, barrier, intersectionPoint.sideParallelX);
                    bullet.set('velX', -1 * bullet.get('velX'));
                    bullet.set('velY', -1 * bullet.get('velY'));
                    return;
                }
                //левая или правая грань
                if ((intersectionPoint.sideParallelX.y >= 0) && (intersectionPoint.sideParallelX.y <= barrier.get('sizeY'))) {
                    this.moveToIntersectionPoint(bullet, barrier, intersectionPoint.sideParallelX);
                    bullet.set('velX', -1 * bullet.get('velX'));
                    return;
                }
                //нижняя или верхняя грань
                if ((intersectionPoint.sideParallelY.x >= 0) && (intersectionPoint.sideParallelY.x <= barrier.get('sizeX'))) {
                    this.moveToIntersectionPoint(bullet, barrier, intersectionPoint.sideParallelY);
                    bullet.set('velY', -1 * bullet.get('velY'));
                    return;
                }
            },
            moveToIntersectionPoint: function(bullet, barrier, intersectionPoint) {
                bullet.set('posX', intersectionPoint.x + (barrier.get('posX') - barrier.get('sizeX')/2));
                bullet.set('posY', intersectionPoint.y + (barrier.get('posY') - barrier.get('sizeY')/2));
            },
            fire: function(posX0, posY0, Vx, Vy) {
                var bullet;
                if (this._bulletSize) {
                  bullet = new Bullet({
                      'posX': posX0,
                      'posY': posY0,
                      'velX': Vx,
                      'velY': Vy,
                      'sizeX': this._bulletSize,
                      'sizeY': this._bulletSize
                  });
                } else {
                  bullet = new Bullet({
                      'posX': posX0,
                      'posY': posY0,
                      'velX': Vx,
                      'velY': Vy
                  });
                }
                this.trigger('shoot', bullet);
                if (this.isAddable) {
                    this.add(bullet);
                }
            },
            incSize: function() {
                if (this._bulletSize) {
                  this._bulletSize *= 1.2;
                } else {
                  this._bulletSize = 17;
                }
            },
            reset: function() {
              Backbone.Collection.prototype.reset.call(this);
              this._bulletSize = undefined;
            }
        });

    return new BulletCollection();
});
