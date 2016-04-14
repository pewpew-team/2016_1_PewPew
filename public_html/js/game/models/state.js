define(function(require) {
  var Backbone = require('backbone'),
      bulletCollection = require('game/collections/bulletCollection'),
      barriersCollection = require('game/collections/barriersCollection'),
      Bullet = require('game/models/bullet'),
      Barrier = require('game/models/barrier'),
      socket = require('game/models/socket');

  var GameState = Backbone.Model.extend({
    // Передать игрока и врага
    initialize: function() {
      console.log('init');
      socket.addMessageHandler(this.handleMessage.bind(this));
    },
    sendState: function() {
      var bulletArray = [];
      bulletCollection.each(function(bullet) {
        bulletArray.push({
          posX: bullet.get('posX'),
          posY: bullet.get('posY'),
          velX: bullet.get('velX'),
          velY: bullet.get('velY'),
          sizeX: bullet.get('sizeX'),
          sizeY: bullet.get('sizeY')
        });
      }.bind(this));
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
        currentPointerX: this.get('player').get('currentPointerX'),
        currentPointerY: this.get('player').get('currentPointerY')
      };
      var stateObj = {
        'player': player,
        'bullets': {
          isReset : true,
          bullets: bulletArray
        }//,
        //'barriers': barrierArray
      };
      console.log(JSON.stringify(stateObj));
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
        currentPointerX: this.get('player').get('currentPointerX'),
        currentPointerY: this.get('player').get('currentPointerY')
      };
      socket.send(JSON.stringify({player: playerObj}));
    },
    handleMessage: function(event) {
      var data = JSON.parse(event.data);
      console.log(data);
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
      this.get('enemy').set({
        'positionX': data.posX,
        'velocity': data.velX,
        'currentPointerX': data.currentPointerX,
        'currentPointerY': data.currentPointerY
      });
    },
    updatePlayer: function(data) {
      this.get('player').set({
        'positionX': data.posX,
        'velocity': data.velX,
        'currentPointerX': data.currentPointerX,
        'currentPointerY': data.currentPointerY
      });
    },
    updateBullets: function(data) {
      console.log(data);
      if (data.isReset) {
        bulletCollection.reset();
      }
      data.bullets.forEach(function(bulletData) {
        if(bulletData.friendly) {
          var bullet = new Bullet({
                       'posX': bulletData.posX,
                       'posY': bulletData.posY,
                       'velX': bulletData.velX,
                       'velY': bulletData.velY,
                       'sizeX': bulletData.sizeX,
                       'sizeY': bulletData.sizeY
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
