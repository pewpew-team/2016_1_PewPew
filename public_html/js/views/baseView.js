define(
    ['backbone', 'event', 'models/background'],
    function (Backbone, event, backgroundModelConstructor) {
        var View = Backbone.View.extend({
            template: {},
            initialize: function () {
                this.render();
                this.generateBackground( document.getElementById("pageBackground") );
                window.addEventListener('load', _.bind(this.resize, this));
            },
            render: function () {
                this.$el.html(this.template());
            },
            show: function () {
                $('#page').html(this.el);
                // Добавляет всем кнопкам вызов события 'navigate'
                // Внутри события передается id кнопки
                this.$el.find('button').click(function (e) {
                    e.preventDefault();
                    event.trigger('navigate', $(this).attr('id'));
                    console.log('navigate');
                });
                this.$el.show();
            },
            hide: function () {
                this.$el.hide();
                // Отключаем прослушку событий
                this.$el.off();
            },
            generateBackground: function (backgroundCanvas) {
                var backgroundModel = new backgroundModelConstructor();
                var arrback = backgroundModel.get("themes");
                var stage = new createjs.Stage(backgroundCanvas),
                    indexRandomTheme = Math.random() * arrback.length  ^ 0,
                    graphElement = new createjs.Bitmap(arrback[indexRandomTheme].background),
                    height = backgroundCanvas.height,
                    width = backgroundCanvas.width,
                    size = arrback[indexRandomTheme].size;

                backgroundCanvas.width = backgroundCanvas.parentElement.offsetWidth;
                backgroundCanvas.height = backgroundCanvas.parentElement.offsetHeight;

                //рисуем фон
                for (var i = 0, counti = width / size.x + 1; i < counti; i++) {
                    for (var j = 0, countj = height / size.y + 1; j < countj; j++) {
                        var tempBitMap = graphElement.clone();
                        tempBitMap.x = i * size.x;
                        tempBitMap.y = j * size.y;
                        stage.addChild(tempBitMap);
                    }
                }

                //рисуем изображения
                for (var i = 0, len = arrback[indexRandomTheme].items.length ; i < len; i++) {
                    for (var j = Math.random() * 15 ^ 0; j > 0; j--) {
                        graphElement = new createjs.Bitmap(arrback[indexRandomTheme].items[i]);
                        graphElement.x = Math.random() * width ^ 0;
                        graphElement.y = Math.random() * height ^ 0;
                        stage.addChild(graphElement);
                    }
                }
                stage.update();
            },
            resize: function () {
                console.log("load...");
            }
        });

        return View;
    }
);