define(function(require) {
      var Backbone = require('backbone'),
          bulletCollection = require('game/collections/bulletCollection'),
          screenModel = require('models/game'),
          $ = require('jquery');

      var Player = Backbone.Model.extend({
              defaults: {
                  previousDirection: null,
                  minAngle: 20,
                  gunLength: 40,
                  bulletSpeed: 15,
                  minPositionX: 0,
                  playerSizeX: 40,
                  playerSizeY: 20,
                  velocity: 0,
                  maxVelocity: 10
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
                      'maxLevelPointer': screenModel.get("baseHeight") - this.get('playerSizeY') - this.get('gunLength')
                  });
                  this.set('angle', this.getAngle());
              },
              moveLeft: function() {
                  this.set('pushedButton', -1);
              },
              moveRight: function() {
                  this.set('pushedButton', 1);
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
                  var pushedButton = this.get('pushedButton');
                  this.pointGunTo();
                  if (pushedButton) {
                      this.increaseVelocity();
                  } else {
                      this.decreaseVelocity();
                  }
                  this.checkPlayerCollision();
                  this.move();
              },
              move: function () {
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
                      direction = this.get('pushedButton'),
                      START_VELOCITY = 3.3,
                      STEP_UP_VELOCITY = 0.9;
                  //стартовый прыжок, чтобы не было тупки
                  if (velX === 0) {
                      this.set('velocity', direction * START_VELOCITY);
                      return;
                  }
                  if ((Math.abs(velX) < this.get('maxVelocity'))) {
                      this.set('velocity', velX + STEP_UP_VELOCITY * direction);
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
              dropPushedButton : function() {
                  this.set("pushedButton", 0);
              },
              stay: function () {
                  this.set('velocity', 0);
              },
              shoot: function () {
                  var angle = this.get('gunAngle'),
                      V = this.get('bulletSpeed'),
                      velX = V*Math.cos(angle) + this.get('velocity'),
                      velY = V*Math.sin(angle),
                      gunLength = this.get('gunLength'),
                      posX = this.get('positionX') + Math.cos(angle) * gunLength,
                      posY = this.get('positionY') + Math.sin(angle) * gunLength;
                  bulletCollection.fire(posX, posY, velX, velY);
              },
              checkPlayerCollision: function() {
                  bulletCollection.each(function(bullet) {
                      var leftPlayerEdge = this.get('positionX') - this.get('playerSizeX'),
                          rightPlayerEdge = this.get('positionX') + this.get('playerSizeX'),
                          bottomPlayerEdge = this.get('positionY') + this.get('playerSizeY'),
                          topPlayerEdge = this.get('positionY') - this.get('playerSizeY');
                      if ( bullet.get('posX') < rightPlayerEdge && bullet.get('posX') > leftPlayerEdge &&
                             bullet.get('posY') < bottomPlayerEdge && bullet.get('posY') > topPlayerEdge ) {
                          this.trigger('userDestroyed');
                      }
                  }.bind(this));
              },
              speedUpPlayer: function() {
                    this.set('maxVelocity', this.get('maxVelocity') + 5);
              },
              speedUpBullets: function() {
                    this.set('bulletSpeed', this.get('bulletSpeed') + 5);
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
              }
          });
      return Player;
  }
);
