define(function(require) {
    var Backbone = require('backbone'),
        $ = require('jquery');

    var Dude = Backbone.View.extend({
            hideDude: function () {
              this.dudeWrapper && this.dudeWrapper.removeClass('dude--show');
            },
            diffenition: function () {
              this.dudeMessage = $("#dudeMessage");
              this.dudeWrapper = this.dudeMessage.parent();
              this.dudeMessage.on("mousemove", this.hideDude.bind(this));
            },
            showDude: function (type) {
              //чтобы не обращаться к DOM дереву постоянно
              //будет сохранено при первом обращении, после будет использовать готовое значение
              this.dudeMessage || this.diffenition();
              var msg = "";
              switch (type) {
                case 1:
                  msg = "Ты стал быстрей, <br> Чувак";
                  break;
                case 2:
                  msg = "Пули стали быстрей, <br> Чувак";
                  break;
                case 3:
                  msg = "Пули теперь больше, <br> Чувак";
                  break;
                default:
                  msg = "Я не знаю что тебе сказать, <br> Чувак";
                  break;
              }
              this.dudeMessage.html(msg);
              this.dudeWrapper.addClass('dude--show');
              setTimeout(this.hideDude.bind(this), 1000);
            }
            
        });

    return new Dude;
});