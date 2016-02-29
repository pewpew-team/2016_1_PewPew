define(
    ['backbone', 'game/collections/bulletCollection'],
  function() {
      var Backbone = require('backbone'),
          bulletCollection = require('game/collections/bulletCollection'),
          Player = Backbone.Model.extend({
              defaults: {
                  previousDirection: null,
                  minAngle: 20,
                  gunLength: 40,
                  bulletSpeed: 20,
                  minPositionX: 0,
                  playerSizeX: 40,
                  playerSizeY: 20,
                  velocity: 0,
                  maxVelocity: 10
              },
              initialize: function(nick, canvasWidth, canvasHeight) {
                  this.set({
                      'nickname': nick,
                      'positionX': canvasWidth/2,
                      'maxPositionX': canvasWidth,
                      'currentPointerX': canvasWidth/2,
                      'currentPointerY': canvasHeight/2
                  });
                  this.set('positionY', canvasHeight - this.get('playerSizeY') / 2);
                  this.set('minLevelPointer', 0);
                  this.set('maxLevelPointer', canvasHeight - this.get('playerSizeY') - this.get('gunLength'));
                  this.set('angle', this.getAngle());
              },
              sync: function() {
                  // TODO отправка данный через web socket
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
                        newPointerPosX = offsetX;
                        newPointerPosY = offsetY;
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
                  if (!pushedButton) {
                      //клавиши не нажаты
                      this.decreaseVelocity();
                  } else {
                      if (pushedButton !== this.get('previousDirection')) {
                          //резкий тормоз
                          this.stay();
                          this.set('previousDirection', pushedButton);
                          return;
                      }
                      this.increaseVelocity();
                  }
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
                      //всегда круглое число не получается ((
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
              }
          });
      return Player;
  }
);
