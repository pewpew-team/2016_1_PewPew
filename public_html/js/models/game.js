define(function(require) {
    var Backbone = require('backbone');
    var _ = require('underscore');
    var game = Backbone.Model.extend({
        defaults: {
            "ratio": 16/9,
            "baseHeight": 500,
            "baseWidth": 700
        },
        setScreenSize: function (expectedHeight, expectedWidth, heightSidebar) {
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
                });
            } else {
                this.set({
                    height: expectedSizefullWidth.height,
                    width: expectedSizefullWidth.width,
                });
            }
            this.set("topSidebar", heightSidebar/2);
        },
        getScale: function (currentSize) {
            return this.get("height") / this.get("baseHeight");
        },
        getCssSize: function(property) {
            return this.get(property) + "px";
        }
    });
    return new game();
})