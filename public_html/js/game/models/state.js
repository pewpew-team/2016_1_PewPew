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
      bulletCollection.on('add', this.sendNewBullet.bind(this));
    },
    sendState: function() {
      var barrierArray = [];
      barriersCollection.each(function(barrier) {
        barrierArray.push({
          posX: barrier.get('posX'),
          posY: barrier.get('posY'),
          isRemovable: barrier.get('isRemovable')
        });
      }.bind(this));
      var player = {
        posX: this.get('player').get('positionX'),
        velX: this.get('player').get('velocity'),
        gunAngle: this.get('player').get('gunAngle')
      };
      var stateObj = {
        'player': player,
        //,
        //'barriers': barrierArray
      };
      socket.send(JSON.stringify(stateObj));
    },
    sendNewBullet: function(bullet, collection, options) {
      var bulletObj = {
        posX: bullet.get('posX'),
        posY: bullet.get('posY'),
        velX: bullet.get('velX'),
        velY: bullet.get('velY'),
        sizeX: bullet.get('sizeX'),
        sizeY: bullet.get('sizeY')
      };
      socket.send(JSON.stringify({bullets: bulletObj}));
    },
    sendPlayerPosition: function() {
      var playerObj = {
        posX: this.get('player').get('positionX'),
        velX: this.get('player').get('velocity'),
        gunAngle: this.get('player').get('gunAngle')
      };
      socket.send(JSON.stringify({player: playerObj}));
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
        'gunAngle': data.gunAngle
      });
    },
    updateBullets: function(data) {
      bulletCollection.reset();
      var width = screenModel.get("baseWidth"),
          height = screenModel.get("baseHeight");
      data.forEach(function(bulletData) {
          var bullet = new Bullet({
                       'posX': width - bulletData.posX,
                       'posY': height - bulletData.posY,
                       'velX': -1*bulletData.velX,
                       'velY': -1*bulletData.velY,
                       'sizeX': bulletData.sizeX,
                       'sizeY': bulletData.sizeY
                   });
          bulletCollection.add(bullet);
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
