define(
    ['backbone', 'game/models/barrier'],
    function() {
        var Backbone = require('backbone'),
            Barrier = require('game/models/barrier'),
            BarrierCollection = Backbone.Collection.extend({
                model: Barrier,
                /*
                    Создает рандомное поле nX на nY блоков по центру экрана
                    ration - вероятность появления неразрушаемого блока ration <= 1
                    x0 y0 - координаты верхней левой границы
                 */
                createRandom: function(nX, nY, ratio, x0, y0) {
                    var max = 100,
                        period = 50;
                    for (var i = 0; i < nX; i++ ) {
                        for(var j = 0; j< nY; j++) {
                            var posX = i * period + x0,
                                posY = j * period + y0,
                                // Случайное число от 0 до 100
                                randomNumber = Math.floor(Math.random()*(max+1)),
                                // Считаем что распределение равномерное
                                isRemovable = true;

                            if (randomNumber < max*ratio) {
                                isRemovable = false;
                            }

                            this.add( new Barrier(posX, posY, isRemovable) );
                        }
                    }
                }
            });
        return new BarrierCollection();
    }
);
