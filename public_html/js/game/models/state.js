define(function(require) {
  var Backbone = require('backbone'),
      bulletCollection = require('game/collections/bulletCollection'),
      barriersCollection = require('game/collections/barriersCollection'),
      Bullet = require('game/models/bullet'),
      Barrier = require('game/models/barrier'),
      socket = require('game/models/socket'),
      screenModel = require('models/game');

  var GameState = Backbone.Model.extend({
    // Передать игрока и врага
    initialize: function() {
      socket.addMessageHandler(this.handleMessage.bind(this));
      bulletCollection.on('shoot', this.sendNewBullet.bind(this));
      this.get('player').on('move', this.sendPlayerEvent.bind(this));
    },
    sendNewBullet: function(bullet) {
      bulletCollection.remove(bullet);
      var bulletObj = {
        posX: bullet.get('posX'),
        posY: bullet.get('posY'),
        velX: bullet.get('velX'),
        velY: bullet.get('velY'),
        sizeX: bullet.get('sizeX'),
        sizeY: bullet.get('sizeY')
      };
      socket.send(JSON.stringify({bullet: bulletObj}));
    },
    sendPlayerPosition: function() {
      var playerObj = {
        posX: this.get('player').get('positionX'),
        velX: this.get('player').get('velocity'),
        gunAngle: this.get('player').get('gunAngle')
      };
      socket.send(JSON.stringify({player: playerObj}));
    },
    sendPlayerEvent: function(direction) {
      socket.send(JSON.stringify({playerEvent: direction}));
    },
    handleMessage: function(event) {
      var data = JSON.parse(event.data);
      if(data.player) {
        this.updatePlayer(data.player);
      }
      if(data.bullets) {
        this.updateBullets(data.bullets);
      }
      if(data.barriers) {
        this.updateBarriers(data.barriers);
      }
      if(data.enemy) {
        this.updateEnemy(data.enemy);
      }
    },
    updateEnemy: function(data) {
      var width = screenModel.get("baseWidth");
      this.get('enemy').set({
        'positionX': width - data.posX,
        'gunAngle': (Math.PI + data.gunAngle) % (Math.PI*2)
      });
    },
    updatePlayer: function(data) {
      this.get('player').set({
        'positionX': data.posX,
        'velocity': data.velX,
        'gunAngle': (data.gunAngle) % (Math.PI*2)
      });
    },
    updateBullets: function(data) {
      data.forEach(function(bulletData) {
          var hasSameId = function(item) {
            return item.get('id_') === bulletData.bulletId;
          };
          var bulletFromCollection = bulletCollection.find(hasSameId.bind(this));
          if ( bulletFromCollection ) {
            bulletFromCollection.set({
                         'posX': bulletData.posX,
                         'posY': bulletData.posY,
                         'velX': bulletData.velX,
                         'velY': bulletData.velY,
                         'sizeX': bulletData.sizeX,
                         'sizeY': bulletData.sizeY,
                         'id_': bulletData.bulletId
                     });
          } else {
            var bullet = new Bullet({
                         'posX': bulletData.posX,
                         'posY': bulletData.posY,
                         'velX': bulletData.velX,
                         'velY': bulletData.velY,
                         'sizeX': bulletData.sizeX,
                         'sizeY': bulletData.sizeY,
                         'id_': bulletData.bulletId
                     });
            bulletCollection.add(bullet);
          }
      });
    },
    updateBarriers: function(data) {
      barriersCollection.reset();
      data.forEach(function(barrierData) {
        this.add( new Barrier(barrierData.posX, barrierData.posY, barrierData.isRemovable) );
      });
    }
  });

  return GameState;
});
