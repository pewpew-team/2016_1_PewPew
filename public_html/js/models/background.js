define(function (require) {
        var Backbone = require('backbone'),
            createjs = require('createjs'),
            backgroundCanvas = document.getElementById("pageBackground"),
            themes = require('models/backgroundThemes');

        var BackgroundThemes = Backbone.Model.extend({
            defaults: {
                positionItems: [],
                //1 объект на поле 150*150
                norm: 150
            },
            initialize: function (width, height, themes) {
                this.set('themes', themes);
                var arrayBackgroundThemes = this.get("themes"),
                    norm = this.get("norm"),
                    randomIndex = Math.random() * arrayBackgroundThemes.length  ^ 0,
                    positionItems = [];
                //запись того что получилось
                this.set({
                    'themeIndex': randomIndex,
                    'canvasWidth': width,
                    'canvasHeight': height,
                });
                //генерирование предметов в прямоуголнике (0, 0) (width, height)
                this.generateItem(0, 0, width, height, positionItems);
                //сортировка по перспективе
                positionItems.sort(this.comparePosition);
                //запись получившегося значения
                this.set('positionItems', positionItems);
            },
            //колбек сортировки
            comparePosition: function (a, b) {
                if (a.y > b.y) {
                    return -1;
                } else {
                    return 1;
                }
            },
            //сортирует
            generateItem: function (minX, minY, maxX, maxY, positionItems) {
                var arrayBackgroundThemes = this.get("themes"),
                    norm = this.get("norm"),
                    randomIndex = this.get("themeIndex"),
                    countItem = ((maxX - minX)/norm  ^ 0) * ((maxY - minY)/norm ^ 0);
                //генерация обектов в заданной области
                for (var i = countItem ; i > 0; i--) {
                    positionItems.push({
                        x : (Math.random() * (maxX - minX) + minX ^ 0),
                        y : (Math.random() * (maxY - minY) + minY ^ 0),
                        item : Math.random() * arrayBackgroundThemes[randomIndex].items.length ^ 0
                    });
                }
            },
            //отдает текущую тему и позиции айтемов локации
            getTheme: function() {
                var indexTheme = this.get("themeIndex");
                return {
                    theme: this.get("themes")[indexTheme],
                    positions: this.get("positionItems")
                }
            },
            resizeCanvas: function(newWidth, newHeight) {
                var width = this.get("canvasWidth"),
                    height = this.get("canvasHeight"),
                    norm = this.get("norm"),
                    positionItems = this.get("positionItems");
                //экран уменьшился
                if ((newWidth <= width) && (newHeight <= height)) {
                    return;
                }
                //экран увеличился
                if (newWidth - 1.5 * norm >= width) {
                    this.generateItem(0, height, newWidth, newHeight, positionItems);
                    this.set("canvasWidth", newWidth);
                }
                if (newHeight - 1.5 *  norm >= height) {
                    this.generateItem(width, 0, newWidth, height, positionItems);
                    this.set("canvasHeight", newHeight);
                }
                //сортировка по перспективе
                positionItems.sort(this.comparePosition);
            }
        });
        return new BackgroundThemes(backgroundCanvas.width, backgroundCanvas.height, themes);
    }
);