define(function(require) {
    var Backbone = require('backbone'),
        $ = require('jquery');

    var Dude = Backbone.View.extend({
            hideDude: function () {
              if ($("#dudeMessage").parent().hasClass('dude--in')) {
                $("#dudeMessage").parent().removeClass('dude--in');
                $("#dudeMessage").parent().addClass('dude--out');
              }
            },
            removeDude: function () {
              $("#dudeMessage").parent().removeClass('dude--in');
              $("#dudeMessage").parent().removeClass('dude--out');
            },
            showDude: function (type) {
              var dudeMessage = $("#dudeMessage"),
                  msg = "",
                  dudeWrapper = dudeMessage.parent();
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
              dudeMessage.html(msg);
              dudeWrapper.removeClass('dude--out');
              dudeWrapper.addClass('dude--in');
              setTimeout(function(){
                if ($("#dudeMessage").parent().hasClass('dude--in')) {
                  $("#dudeMessage").parent().removeClass('dude--in');
                  $("#dudeMessage").parent().addClass('dude--out');
                }
              }, 2000);
            }
            
        });

    return new Dude;
});