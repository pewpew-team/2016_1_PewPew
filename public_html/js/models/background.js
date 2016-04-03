define(function (require) {
        var Backbone = require('backbone'),
            createjs = require('createjs'),
            //TODO оптимизация вызова
            theme = require('models/theme');

        var BackgroundThemes = Backbone.Model.extend({
            defaults: {
                items: [],
                //1 объект на поле 150*150
                norm: 150,
                width: 0,
                height: 0
            },
            generateItem: function (minX, minY, maxX, maxY) {
                var norm = this.get("norm"),
                    countNewItem = ((maxX - minX)/norm  ^ 0) * ((maxY - minY)/norm ^ 0),
                    items = this.get("items"),
                    i;
                //TODO функция генерирования координат
                for (i = countNewItem; i > 0; i--) {
                    items.push({
                        x : (Math.random() * (maxX - minX) + minX ^ 0),
                        y : (Math.random() * (maxY - minY) + minY ^ 0),
                        imgIndex : Math.random() * theme.getTheme().items.length ^ 0
                    });
                }
                this.set("items", items);
            },
            getItems: function() {
                return this.get("items");
            },
            resizeCanvas: function(newWidth, newHeight) {
                var norm = this.get("norm"),
                    currentWidth = this.get("width"),
                    currentHeight = this.get("height"),
                    fillCanvasWidth = ((newWidth / norm ^ 0)  + 1) * norm,
                    fillCanvasHeight = ((newHeight / norm ^ 0 ) + 1) * norm;
                //заполняем незаполненное
                this.generateItem(0, currentHeight, fillCanvasWidth, fillCanvasHeight);
                this.generateItem(currentWidth, 0, fillCanvasWidth, currentHeight);
                //экран увеличился
                this.set("height", fillCanvasHeight);
                this.set("width", fillCanvasWidth);
                //вызов перерисовки
                console.log("changeBackground");
                this.trigger("changeBackground");
            },
            resizeBackground: function(newWidth, newHeight) {
                if ((newWidth <= this.get("width")) && (newHeight <= this.get("height"))) {
                    //экран уменьшился нечего перерисовывать
                    return;
                } else {
                    this.resizeCanvas(newWidth, newHeight);
                }
            }
        });
        return new BackgroundThemes();
    }
);
