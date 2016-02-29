define(
    ['backbone', 'createjs'],
    function () {
        var Backbone = require('backbone');
        var createjs = require('createjs');
        var BackgroundThemes = Backbone.Model.extend({
            defaults: {
                positionItems: [],
                //1 объект на поле 150*150
                norm: 150,
                themes: [
                    {
                        background : "img/green/bg.png",
                        items : [
                            "img/green/item1.png",
                            "img/green/item2.png",
                            "img/green/item3.png",
                            "img/green/item4.png",
                            "img/green/item5.png",
                            "img/green/item6.png"
                        ],
                        size: {
                            x : 47,
                            y : 45
                        }
                    },{
                        background : "img/grey/bg.png",
                        items : [
                            "img/grey/item1.png",
                            "img/grey/item2.png",
                            "img/grey/item3.png",
                            "img/grey/item4.png",
                            "img/grey/item5.png"
                        ],
                        size: {
                            x : 41,
                            y : 46
                        }
                    },{
                        background : "img/sandy/bg.png",
                        items : [
                            "img/sandy/item1.png",
                            "img/sandy/item2.png",
                            "img/sandy/item3.png",
                            "img/sandy/item4.png",
                            "img/sandy/item5.png"
                        ],
                        size: {
                            x : 62,
                            y : 54
                        }
                    },{
                        background : "img/green2/bg.png",
                        items : [
                            "img/green2/item1.png",
                            "img/green2/item2.png",
                            "img/green2/item3.png",
                            "img/green2/item4.png",
                            "img/green2/item5.png",
                            "img/green2/item6.png"
                        ],
                        size: {
                            x : 65,
                            y : 49
                        }
                    }
                ]
            },
            initialize: function (width, height) {
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
        return BackgroundThemes;
    }
);