define(function (require) {
    var backgroundCanvas = document.getElementById("pageBackground"),
        createjs = require('createjs'),
        Backbone = require('backbone'),
        backgroundModel = require('models/background'),
        viewManager = require('general/viewManager');


    var View = Backbone.View.extend({
        loginRequired: false,
        template: {},
        initialize: function () {
            this.render();
            $('#page').append(this.el);
            this.hide();
            this.resizeBackground();
            $(window).on("resize", _.bind(this.resizeBackground, this));
        },
        render: function () {
            this.$el.html(this.template());
        },
        show: function () {
            this.$el.appendTo("#page");
            this.$el.show();
            viewManager.trigger('show', this);
        },
        hide: function () {
            this.$el.hide();
            this.$el.detach();
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
            $("#pageBackground").css("background", "url(" + themeObject.theme.background + ")");
            var onloadCallback = function () {
                stage.update();
            };
            //рисуем изображения
            for (var i = themeObject.positions.length - 1; i >= 0; i--) {
                item = new createjs.Bitmap( themeObject.theme.items[ themeObject.positions[i].item ] );
                item.x = themeObject.positions[i].x;
                item.y = themeObject.positions[i].y;
                item.image.onload = onloadCallback;
                stage.addChild(item);
            }
        },
        resizeBackground: function () {
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
});
