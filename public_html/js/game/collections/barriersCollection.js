define(
    ['backbone', 'game/models/barrier'],
    function() {
        var Backbone = require('backbone');
        var Barrier = require('game/models/barrier');

        var BarrierCollection = Backbone.Collection.extend({
            model: Barrier,
            /*
                Создает рандомное поле nX на nY блоков по центру экрана
                ration - вероятность появления неразрушаемого блока ration <= 1
                x0 y0 - координаты верхней левой границы
             */
            createRandom: function(nX, nY, ratio, x0, y0) {
                var max = 100;
                for (var i = 0; i < nX; i++ ) {
                    for(var j = 0; j< nY; j++) {
                        var period = 50;
                        var posX = i*period + x0;
                        var posY = j*period + y0;
                        // Случайное число от 0 до 100
                        var randomNumber = Math.floor(Math.random()*(max+1));
                        // Считаем что распределение равномерное
                        var isRemovable = true;
                        if (randomNumber < max*ratio) {
                            isRemovable = false;
                        }
                        var barrier = new Barrier(posX, posY, isRemovable);
                        this.add(barrier);
                    }
                }
            }
        });

        return new BarrierCollection();
    }
);
