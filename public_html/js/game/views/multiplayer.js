define(function(require) {
    var BulletsView = require('game/views/allBulletsView'),
        bulletsCollection = require('game/collections/bulletCollection'),
        barriersCollection = require('game/collections/barriersCollection'),
        boostersCollection = require('game/collections/boosterCollection'),
        BarriersView = require('game/views/allBarriersView'),
        BoostersView = require('game/views/allBoostersView'),
        PlayerView = require('game/views/playerView'),
        Player = require('game/models/player'),
        Booster = require('game/models/booster'),
        _ = require('underscore'),
        resultsView = require('game/views/result'),
        user = require('models/user'),
        Backbone = require('backbone'),
        dude = require('game/views/dude'),
        game = require('views/game');

    var NUMBER_X = 24,
        NUMBER_Y = 4,
        RATIO = 0.3,
        LEFT_CORNER_POS_X = 40,
        LEFT_CORNER_POS_Y = 40,
        BOOSTER_PROBABILITY = 0.3;

    var View = Backbone.View.extend({
      init: function() {
        // TODO
      },
      run: function() {
        // TODO
      },
      updateScore: function() {
        // TODO
      },
      iterate: function() {
        // TODO
      },
      gameOver: function() {
          resultsView.show();
          resultsView.addMessage('Поражение :(');
          this.quitGame();
      },
      quitGame : function() {
          this.isRunning = false;
          dude.hideDude();
          bulletsCollection.off('barrierDestroy');
          this.playerView.remove();
          this.player.destroy();
          this.playerView.destroy();
          bulletsCollection.reset();
          barriersCollection.reset();
          boostersCollection.reset();
      },
      win: function() {
          this.isRunning = false;
          this.player.sendResults(this.blockCount);
          bulletsCollection.off('barrierDestroy');
          this.player.destroy();
          this.playerView.destroy();
          bulletsCollection.reset();
          barriersCollection.reset();
          boostersCollection.reset();
          resultsView.render('Победа! Вы уничтожили ' + this.blockCount + ' блоков');
          resultsView.show();
      },
      restart: function() {
          this.quitGame();
          this.init();
          this.run();
      },
      _getTime: function() {
          return Date.now() - this.time;
      },
      incBlockCount: function() {
        this.blockCount++;
      }
    });

    return new View();
});
