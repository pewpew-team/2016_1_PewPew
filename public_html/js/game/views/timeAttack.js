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
          this.dynamicCanvas = document.getElementById('dynamicLayer');
          this.player = new Player(user.get('login'));
          this.playerView = new PlayerView(this.player, this.dynamicCanvas);
          this.bulletsView = new BulletsView(bulletsCollection);
          this.barriersView = new BarriersView({collection : barriersCollection});
          this.boostersView = new BoostersView({collection : boostersCollection});
          this.MAX_TIME = 60*1000;
          this.RESET_TIME = 10*1000;
          this.resetCount = 0;
          barriersCollection.createRandom(NUMBER_X, NUMBER_Y, RATIO, LEFT_CORNER_POS_X, LEFT_CORNER_POS_Y);
          this.player.on('userDestroyed', this.gameOver.bind(this));
          game.on('quitGame', this.quitGame.bind(this));
          game.on('gameOver', this.gameOver.bind(this));
          resultsView.off('restart');
          resultsView.on('restart', this.restart.bind(this));
      },
      run: function() {
          this.blockCount = 0;
          this.isRunning = true;
          this.time = Date.now();
          this.timeForDiff = Date.now();
          boostersCollection.reset();
          bulletsCollection.on('barrierDestroy', this.incBlockCount.bind(this));
          this.frameID = requestAnimationFrame(_.bind(this.iterate, this));
      },
      updateScore: function() {
          var minutes = Math.trunc((this._getTime()/1000) / 60);
              seconds = String(Math.trunc((this._getTime()/1000) % 60));
          if (seconds.length == 1) {
            seconds = '0' + seconds;
          }
          var scoreWrapper = document.getElementById('js-score');
          if (scoreWrapper) {
            scoreWrapper.innerHTML = this.blockCount + ' блоков за ' + minutes + ':' + seconds;
          }
      },
      iterate: function() {
          var context = this.dynamicCanvas.getContext('2d');
          context.clearRect(0, 0, this.dynamicCanvas.width, this.dynamicCanvas.height);
          this.bulletsView.render();
          this.barriersView.render();
          this.boostersView.render();
          bulletsCollection.iterate(barriersCollection,
                                    this.dynamicCanvas.width,
                                    this.dynamicCanvas.height,
                                    this._getFrameTimeDiff());
          boostersCollection.iterate(this.player);
          if ( !barriersCollection.checkForRemovable() || this._getTime() / this.RESET_TIME > this.resetCount) {
              barriersCollection.reset();
              barriersCollection.createRandom(NUMBER_X, NUMBER_Y, RATIO, LEFT_CORNER_POS_X, LEFT_CORNER_POS_Y);
              boostersCollection.createRandom(this.dynamicCanvas.height, this.dynamicCanvas.width);
              this.resetCount++;
          }
          if (this.MAX_TIME < this._getTime()) {
              this.win();
          }
          this.playerView.render(this._getFrameTimeDiff());
          this.updateScore();
          if (this.isRunning) {
              requestAnimationFrame(_.bind(this.iterate, this));
          }
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
          resultsView.show();
          resultsView.addMessage('Победа! Вы уничтожили ' + this.blockCount + ' блоков');
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
      },
      _getFrameTimeDiff: function() {
          var result = Date.now() - this.timeForDiff;
          this.timeForDiff = Date.now();
          return result;
      }
    });

    return new View();
});
