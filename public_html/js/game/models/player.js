define(function(require) {
      var Backbone = require('backbone'),
          bulletCollection = require('game/collections/bulletCollection'),
          screenModel = require('models/game'),
          $ = require('jquery');

      var Player = Backbone.Model.extend({
              defaults: {
                  gunLength: 50,
                  bulletSpeed: 1,
                  minPositionX: 0,
                  playerSizeX: 80,
                  playerSizeY: 50,
                  maxVelocity: 17,
                  gunAngle: Math.Pi/2
              },
              initialize: function(nick) {
                  this.set({
                      'nickname': nick,
                      'positionX': screenModel.get("baseWidth")/2,
                      'maxPositionX': screenModel.get("baseWidth"),
                      'currentPointerX': screenModel.get("baseWidth")/2,
                      'currentPointerY': screenModel.get("baseHeight")/2,
                      'positionY': screenModel.get("baseHeight") - this.get('playerSizeY') / 2,
                      'minLevelPointer': 0,
                      'arrDirections': [],
                      'velocity': 0,
                      'maxLevelPointer': screenModel.get("baseHeight") * 2 / 3
                  });
              },
              addPushedButton: function(pushedDirection) {
                var arrDirections = this.get('arrDirections');
                if (arrDirections[arrDirections.length - 1] !== pushedDirection) {
                  arrDirections.push(pushedDirection);
                  this.set('arrDirections', arrDirections);
                }
              },
              pointGunTo: function(offsetX, offsetY) {
                  var minLevelPointer = this.get('minLevelPointer'),
                      maxLevelPointer = this.get('maxLevelPointer'),
                      newPointerPosX,
                      newPointerPosY;
                  if (offsetX && offsetY) {
                        newPointerPosX = offsetX / screenModel.get("scale");
                        newPointerPosY = offsetY / screenModel.get("scale");
                        if ((minLevelPointer >= newPointerPosY)) {
                            newPointerPosY = minLevelPointer;
                        }
                        if ((maxLevelPointer <= newPointerPosY)) {
                            newPointerPosY = maxLevelPointer;
                        }
                        this.set('currentPointerX', newPointerPosX);
                        this.set('currentPointerY', newPointerPosY);
                  }
                  this.set('gunAngle', this.getAngle());
              },
              getAngle : function () {
                  return Math.atan2(this.get('currentPointerY') - this.get('positionY'), this.get('currentPointerX') - this.get('positionX'));
              },
              iterate: function() {
                  var arrDirections = this.get('arrDirections');
                  this.pointGunTo();
                  if (arrDirections.length) {
                      this.increaseVelocity();
                  } else {
                      this.decreaseVelocity();
                  }
                  this.checkPlayerCollision();
                  this.move();
              },
              move: function (dt) {
                  var velX = this.get('velocity'),
                      posX = this.get('positionX'),
                      sizeX = this.get('playerSizeX'),
                      maxPosX = this.get('maxPositionX'),
                      minPosX = this.get('minPositionX'),
                      FADING = 2;
                  //правая граница
                  if ((posX + sizeX / 2 ) > maxPosX) {
                      this.set('positionX', maxPosX - sizeX / 2);
                      this.set('velocity', -velX / FADING);
                      return;
                  }
                  //левая граница
                  if ((posX - sizeX / 2 ) < minPosX) {
                      this.set('positionX', sizeX / 2);
                      this.set('velocity', -velX / FADING);
                      return;
                  }
                  this.set('positionX', (posX + velX) );
              },
              increaseVelocity: function () {
                  var velX = this.get('velocity'),
                      arrDirections = this.get('arrDirections'),
                      direction = arrDirections[arrDirections.length - 1],
                      START_VELOCITY = 3.3,
                      STEP_UP_VELOCITY = 0.9,
                      new_velocity = velX + STEP_UP_VELOCITY * direction;

                  //стартовый прыжок, чтобы не было тупки
                  if (velX === 0) {
                      this.set('velocity', direction * START_VELOCITY);
                      return;
                  }
                  //подходит ли новое значение скорости, если нет, не присваиваем его
                  if (Math.abs(new_velocity) < this.get('maxVelocity')) {
                      this.set('velocity', new_velocity);
                  }
              },
              decreaseVelocity: function () {
                  var velX = this.get('velocity'),
                      START_VELOCITY = 3.3,
                      STEP_DOWN_VELOCITY = 0.6;
                  if (velX === 0) return;
                  if (Math.abs(velX) < START_VELOCITY) {
                      this.set('velocity', 0);
                  } else {
                      this.set('velocity', velX - Math.sign(velX) * STEP_DOWN_VELOCITY);
                  }
              },
              dropPushedButton : function(direction) {
                  var arrDirections = this.get("arrDirections");
                  arrDirections.splice(arrDirections.indexOf(direction), 1);
                  this.set("arrDirections", arrDirections);
              },
              stay: function () {
                  this.set('velocity', 0);
              },
              getCurrentDirection: function () {
                  var arrDirections = this.get("arrDirections");
                  if (arrDirections.length === 0) return 0;
                  else return arrDirections[arrDirections.length - 1];
              },
              shoot: function () {
                  var angle = this.get('gunAngle'),
                      V = this.get('bulletSpeed'),
                      velX = V*Math.cos(angle),
                      velY = V*Math.sin(angle),
                      gunLength = this.get('gunLength'),
                      posX = this.get('positionX') + Math.cos(angle) * gunLength,
                      posY = this.get('positionY') + Math.sin(angle) * gunLength;
                  bulletCollection.fire(posX, posY, velX, velY);
              },
              checkPlayerCollision: function() {
                  bulletCollection.each(function(bullet) {
                      var leftPlayerEdge = this.get('positionX') - this.get('playerSizeX')/2,
                          rightPlayerEdge = this.get('positionX') + this.get('playerSizeX')/2,
                          bottomPlayerEdge = this.get('positionY') + this.get('playerSizeY')/2,
                          topPlayerEdge = this.get('positionY') - this.get('playerSizeY')/2;
                      if ( bullet.get('posX') < rightPlayerEdge && bullet.get('posX') > leftPlayerEdge &&
                             bullet.get('posY') < bottomPlayerEdge && bullet.get('posY') > topPlayerEdge ) {
                          this.trigger('userDestroyed');
                      }
                  }.bind(this));
              },
              speedUpPlayer: function() {
                    this.set('maxVelocity', this.get('maxVelocity')*1.20);
              },
              speedUpBullets: function() {
                    this.set('bulletSpeed', this.get('bulletSpeed')*1.20);
              },
              sendResults: function(score) {
                    $.ajax({
                         method: 'PUT',
                         url: 'user/rating',
                         contentType: 'application/json',
                         data: JSON.stringify({
                               'score': score
                         }),
                         error: function () {
                               this.trigger('errorResult', 'Cannot send scores');
                         }.bind(this)
                   });
             },
             updateFromWS: function(event) {
                  var data = JSON.parse(event.data);
                  if(data.player) {
                        this.set({
                              'positionX': data.player.posX,
                              'velocity': data.player.velX,
                              'gunAngle': (data.player.gunAngle) % (Math.PI*2)
                        });
                  }
            }
          });
      return Player;
  }
);
