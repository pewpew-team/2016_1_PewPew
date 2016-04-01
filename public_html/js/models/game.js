define(function(require) {
    var Backbone = require('backbone');
    var _ = require('underscore');
    var Game = Backbone.Model.extend({
        defaults: {
            "ratio": 16/9,
            "baseHeight": 720,
            "baseWidth": 1280,
            "scale": 1
        },
        setScreenSize: function (expectedHeight, expectedWidth, topSidebarHeight) {
            var expectedSizefullHeight = {
                    height: expectedHeight,
                    width: expectedHeight * this.get('ratio')
                },
                expectedSizefullWidth = {
                    width: expectedWidth,
                    height: expectedWidth / this.get('ratio')
                };
            if ((expectedSizefullHeight.width < expectedSizefullWidth.width) && (expectedSizefullHeight.height < expectedSizefullWidth.height)) {
                this.set({
                    height: expectedSizefullHeight.height,
                    width: expectedSizefullHeight.width,
                    horizPos: true 
                });
            } else {
                this.set({
                    height: expectedSizefullWidth.height,
                    width: expectedSizefullWidth.width,
                    horizPos: false 
                });
            }
            this.set("marginTop", topSidebarHeight/2);
            this.setScale();
        },
        setScale: function () {
            this.set("scale", this.get("height") / this.get("baseHeight") );
        },
        getCssSize: function(property) {
            return this.get(property) + "px";
        }
    });
    return new Game();
})
