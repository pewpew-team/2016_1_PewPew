define(
    ['backbone', 'event', 'models/background', 'createjs'],
    function (Backbone, event, backgroundModelConstructor) {
        var backgroundCanvas = document.getElementById("pageBackground"),
            backgroundModel = new backgroundModelConstructor(backgroundCanvas.width, backgroundCanvas.height),
            createjs = require('createjs');
        console.log(createjs);
        var View = Backbone.View.extend({
            template: {},
            initialize: function () {
                this.render();
                this.resizeInterface();
                window.addEventListener('resize', _.bind(this.resizeInterface, this));
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
            drawBackground: function () {
                var width = backgroundCanvas.width,
                    height = backgroundCanvas.height,
                    themeObject = backgroundModel.getTheme(),
                    stage = new createjs.Stage(backgroundCanvas),
                    graphElement,
                    item,
                    size = themeObject.theme.size;
                //рисуем фон
                graphElement = new createjs.Bitmap(themeObject.theme.background);
                graphElement.image.onload = function () {
                    stage.update();
                }
                for (var i = 0, counti = width / size.x + 1; i < counti; i++) {
                    for (var j = 0, countj = height / size.y + 1; j < countj; j++) {
                        var tempBitMap = graphElement.clone();
                        tempBitMap.x = i * size.x;
                        tempBitMap.y = j * size.y;
                        stage.addChild(tempBitMap);
                    }
                }
                //рисуем изображения
                for (var i = themeObject.positions.length - 1; i >= 0; i--) {
                    item = new createjs.Bitmap( themeObject.theme.items[ themeObject.positions[i].item ] );
                    item.x = themeObject.positions[i].x;
                    item.y = themeObject.positions[i].y;
                    item.image.onload = function () {
                        stage.update();
                    }
                    stage.addChild(item);
                }
            },
            resizeInterface: function () {
                var backgroundCanvas = document.getElementById("pageBackground"),
                    newWidth = backgroundCanvas.parentElement.offsetWidth,
                    newHeight = backgroundCanvas.parentElement.offsetHeight;
                backgroundCanvas.width = newWidth;
                backgroundCanvas.height = newHeight;
                backgroundModel.resizeCanvas(newWidth, newHeight);
                this.drawBackground();
            }
        });

        return View;
    }
);