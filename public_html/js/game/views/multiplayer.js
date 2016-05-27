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
        waitingView = require('game/views/waiting'),
        socket = require('game/models/socket'),
        Enemy = require('game/models/enemy'),
        EnemyView = require('game/views/enemyView');

    var NUMBER_X = 24,
        NUMBER_Y = 3,
        RATIO = 0.3,
        LEFT_CORNER_POS_X = 50,
        LEFT_CORNER_POS_Y = 300;


    var View = Backbone.View.extend({
      init: function() {
          waitingView.show();
          waitingView.on('cancel', this.quitGame.bind(this));
          this.dynamicCanvas = document.getElementById('dynamicLayer');
          this.player = new Player(user.get('login'));
          this.playerView = new PlayerView(this.player, this.dynamicCanvas);
          this.enemy = new Enemy(user.get('login'));
          this.enemyView = new EnemyView(this.enemy, this.dynamicCanvas);
          this.bulletsView = new BulletsView(bulletsCollection);
          this.barriersView = new BarriersView({collection : barriersCollection});
          this.boostersView = new BoostersView({collection : boostersCollection});
          this.MAX_TIME = 120*1000;
          bulletsCollection.isAddable = false;
          var context = this.dynamicCanvas.getContext('2d');
          context.clearRect(0, 0, this.dynamicCanvas.width, this.dynamicCanvas.height);
          socket.addMessageHandler(function (event) {
              var data = JSON.parse(event.data);
              if (data.startGame) {
                  waitingView.hide();
                  this.run();
              }
          }.bind(this));
          socket.open();
      },
      run: function() {
          this.state = new State({
              'player': this.player,
              'enemy': this.enemy
          });
          socket.addMessageHandler(this.enemy.updateFromWS.bind(this.enemy));
          socket.addMessageHandler(function (event) {
              var data = JSON.parse(event.data);
              if (typeof data.win !== 'undefined') {
                  if (data.win) {
                      this.win();
                  } else {
                      this.gameOver();
                  }
              }
          }.bind(this));
          resultsView.off('restart');
          resultsView.on('restart', this.restart.bind(this));
          this.blockCount = 0;
          this.isRunning = true;
          this.time = Date.now();
          this.timeForDiff = Date.now();
          boostersCollection.reset();
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
                                    this._getFrameTimeDiff(),
                                    false);
          this.playerView.render();
          this.enemyView.render();
          if (this.isRunning) {
              requestAnimationFrame(_.bind(this.iterate, this));
          }
      },
      gameOver: function() {
          resultsView.show();
          resultsView.addMessage('Поражение :(');
          this.quitGame();
      },
      updateScore: function() {
          var minutes = Math.trunc((this._getTime()/1000) / 60);
              seconds = String(Math.trunc((this._getTime()/1000) % 60));
          if (seconds.length == 1) {
            seconds = '0' + seconds;
          }
          var scoreWrapper = document.getElementById('js-score');
          if (scoreWrapper) {
            scoreWrapper.innerHTML = minutes + ':' + seconds;
          }
      },
      quitGame : function() {
          if (this.isRunnig) {
              this.state.silence();
          }
          this.isRunnig = false;
          this.playerView.remove();
          this.player.destroy();
          this.playerView.destroy();
          bulletsCollection.off('barrierDestroy');
          bulletsCollection.reset();
          barriersCollection.reset();
          boostersCollection.reset();
          socket.close();
      },
      win: function() {
          resultsView.show();
          resultsView.addMessage('Победа!');
          this.quitGame();
      },
      restart: function() {
          this.quitGame();
          this.init();
      },
      _getTime: function() {
          return Date.now() - this.time;
      },
      _getFrameTimeDiff: function() {
          var result = Date.now() - this.timeForDiff;
          this.timeForDiff = Date.now();
          return result;
      }
    });

    return new View();
});
