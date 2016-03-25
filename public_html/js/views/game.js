define(function (require) {
        var tmpl = require('tmpl/game'),
            _ = require('underscore'),
            baseView = require('views/baseView');

        var View = baseView.extend({
            template: tmpl,
            loginRequired: true,
            events: {
                'click #js-quit': 'gameOver'
            },
            initialize: function () {
                baseView.prototype.initialize.apply(this, arguments);
                $(window).on("resize", _.bind(this.resizeGameArea, this));
            },
            show: function () {
                baseView.prototype.show.apply(this, arguments);
                this.resizeGameArea();
            },
            hide: function () {
                document.getElementById('js-score').innerHTML = '';
                baseView.prototype.hide.apply(this);
                this.trigger('quitGame');
            },
            gameOver: function() {
                this.trigger('gameOver');
            },
            resizeGameArea: function () {
                var staticLayer = document.getElementById("staticLayer"),
                    dynamicLayer = document.getElementById("dynamicLayer");
                if ((!staticLayer) || (!dynamicLayer)) {
                    console.log("canvas - null");
                    return;
                }
                var expectedHeight = window.innerHeight - document.getElementsByClassName("header")[0].offsetHeight,
                    expectedWidth = window.innerWidth,
                    expectedSizefullHeight = {
                        height: expectedHeight,
                        width: (expectedHeight / 9) * 16
                    },
                    expectedSizefullWidth = {
                        width: expectedWidth,
                        height: ( expectedWidth / 16) * 9
                    };

                if ((expectedSizefullHeight.width < expectedSizefullWidth.width) && (expectedSizefullHeight.height < expectedSizefullWidth.height)) {
                    dynamicLayer.width = staticLayer.width = expectedSizefullHeight.width;
                    dynamicLayer.height = staticLayer.height = expectedSizefullHeight.height;
                    dynamicLayer.parentElement.style.marginTop = "0px";
                } else {
                    dynamicLayer.width = staticLayer.width = expectedSizefullWidth.width;
                    dynamicLayer.height = staticLayer.height = expectedSizefullWidth.height;
                    dynamicLayer.parentElement.style.marginTop = document.getElementsByClassName('header')[0].offsetHeight / 2 + "px";
                }
            }
        });

        return new View();
    }
);
