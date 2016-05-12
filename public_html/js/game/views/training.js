define(function(require) {
    var BulletsView = require('game/views/allBulletsView'),
        bulletsCollection = require('game/collections/bulletCollection'),
        barriersCollection = require('game/collections/barriersCollection'),
        BarriersView = require('game/views/allBarriersView'),
        PlayerView = require('game/views/playerView'),
        Player = require('game/models/player'),
        _ = require('underscore'),
        resultsView = require('game/views/result'),
        user = require('models/user'),
        Backbone = require('backbone'),
        dude = require('game/views/dude'),
        game = require('views/game');

    var View = Backbone.View.extend({
      init: function() {
        if (this.player) {
          this.quitGame();
        }
        this.dynamicCanvas = document.getElementById('dynamicLayer');
        this.player = new Player(user.get('login'), this.dynamicCanvas.width, this.dynamicCanvas.height);
        this.playerView = new PlayerView(this.player, this.dynamicCanvas);
        this.bulletsView = new BulletsView(bulletsCollection);
        this.barriersView = new BarriersView({collection : barriersCollection});
        var NUMBER_X = 24,
            NUMBER_Y = 4,
            RATIO = 0.3,
            LEFT_CORNER_POS_X = 40,
            LEFT_CORNER_POS_Y = 40;
        barriersCollection.createRandom(NUMBER_X, NUMBER_Y, RATIO, LEFT_CORNER_POS_X, LEFT_CORNER_POS_Y);
        this.player.on('userDestroyed', this.gameOver.bind(this));
        game.on('gameOver', this.quitGame.bind(this));
        resultsView.off('restart');
        resultsView.on('restart', this.restart.bind(this));
      },
      run: function() {
          this.isRunning = true;
          document.getElementById('js-score').innerHTML = 'Тренировка';
          this.timeForDiff = Date.now();
          this.frameID = requestAnimationFrame(_.bind(this.iterate, this));
      },
      iterate: function() {
          var context = this.dynamicCanvas.getContext('2d');
          context.clearRect(0, 0, this.dynamicCanvas.width, this.dynamicCanvas.height);
          this.bulletsView.render();
          this.barriersView.render();
          bulletsCollection.iterate(barriersCollection,
                                    this.dynamicCanvas.width,
                                    this.dynamicCanvas.height,
                                    this._getFrameTimeDiff());
          if ( !barriersCollection.checkForRemovable() ) {
              this.win();
          }
          this.playerView.render();
          if (this.isRunning) {
              requestAnimationFrame(_.bind(this.iterate, this));
          }
      },
      gameOver: function() {
          resultsView.render();
          resultsView.show();
          resultsView.addMessage('Поражение :(');
          this.quitGame();
      },
      quitGame : function() {
          this.isRunning = false;
          this.player.destroy();
          this.playerView.destroy();
          bulletsCollection.reset();
          barriersCollection.reset();
      },
      restart: function() {
          this.quitGame();
          this.init();
          this.run();
      },
      win: function() {
          this.isRunning = false;
          this.player.destroy();
          this.playerView.destroy();
          bulletsCollection.reset();
          barriersCollection.reset();
          resultsView.render();
          resultsView.show();
          resultsView.addMessage('Победа!');
      },
      _getFrameTimeDiff: function() {
          var result = Date.now() - this.timeForDiff;
          this.timeForDiff = Date.now();
          return result;
      }
  });

    return new View();
});
