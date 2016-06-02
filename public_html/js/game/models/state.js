define(function(require) {
  var Backbone = require('backbone'),
      bulletCollection = require('game/collections/bulletCollection'),
      barriersCollection = require('game/collections/barriersCollection'),
      Bullet = require('game/models/bullet'),
      Barrier = require('game/models/barrier'),
      socket = require('game/models/socket'),
      _ = require('underscore');

  var GameState = Backbone.Model.extend({
    // Передать игрока и врага
    initialize: function() {
      socket.addMessageHandler(this.handleMessage.bind(this));
      this.listenTo(bulletCollection, 'shoot', this.sendNewBullet.bind(this));
      this.listenTo(this.get('player'), 'change:positionX', this.sendPlayerPosition);
    },
    silence: function() {
      this.stopListening(bulletCollection);
      this.stopListening(this.get('player'));
      this.set('player', null);
      this.set('enemy', null);
    },
    sendNewBullet: function(bullet) {
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
    sendPlayerPosition: function(playerModel) {
      var playerObj = {
        posX: playerModel.get('positionX'),
        velX: playerModel.get('velocity'),
        gunAngle: playerModel.get('gunAngle')
      };
      socket.send(JSON.stringify({player: playerObj}));
    },
    handleMessage: function(event) {
      var data = JSON.parse(event.data);
      if(data.bullets) {
        this.updateBullets(data.bullets);
      }
      if(data.barriers) {
        this.updateBarriers(data.barriers);
      }
    },
    updateBullets: function(data) {
        bulletCollection.reset();
      data.forEach(function(bulletData) {
        var bullet = new Bullet({
             'posX': bulletData.posX,
             'posY': bulletData.posY,
             'velX': bulletData.velX,
             'velY': bulletData.velY,
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
      }.bind(barriersCollection));
    }
  });

  return GameState;
});
