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
        game = require('views/game'),
        State = require('game/models/state'),
        waitingView = require('game/views/waiting');


    var View = Backbone.View.extend({
      init: function() {
          waitingView.show();
          this.dynamicCanvas = document.getElementById('dynamicLayer');
          this.player = new Player(user.get('login'));
          this.state = new State({
              'player': this.player
          });
          this.playerView = new PlayerView(this.player, this.dynamicCanvas);
          this.bulletsView = new BulletsView(bulletsCollection);
          this.barriersView = new BarriersView({collection : barriersCollection});
          this.boostersView = new BoostersView({collection : boostersCollection});
          this.MAX_TIME = 120*1000;
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
          boostersCollection.reset();
          bulletsCollection.on('barrierDestroy', this.incBlockCount.bind(this));
          this.frameID = requestAnimationFrame(_.bind(this.iterate, this));
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
