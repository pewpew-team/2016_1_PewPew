define(function (require) {
    var backgroundCanvas = document.getElementById("pageBackground"),
        createjs = require('createjs'),
        Backbone = require('backbone'),
        backgroundModel = require('models/background'),
        //TODO оптимизация вызова
        theme = require('models/theme'),
        viewManager = require('general/viewManager');


    var View = Backbone.View.extend({
        loginRequired: false,
        template: {},
        initialize: function () {
            this.render();
            $('#page').append(this.el);
            this.hide();
            $(window).on("resize", _.bind(this.resizeBackground, this));
            this.listenTo(backgroundModel, "changeBackground", this.drawBackground.bind(this));
            //стартовая отрисовка
            this.resizeBackground();
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
            var themeObject = theme.getTheme(),
                backgroundItems = backgroundModel.getItems(),
                stage = new createjs.Stage(backgroundCanvas),
                item;
            backgroundCanvas.width = backgroundModel.get('width');
            backgroundCanvas.height = backgroundModel.get('height');
            //рисуем фон
            $("#pageBackground").css("background", "url(" + themeObject.background + ")");
            var onloadCallback = function () {
                stage.update();
            };
            //рисуем изображения
            for (var i = backgroundItems.length - 1; i >= 0; i--) {
                item = new createjs.Bitmap( themeObject.items[ backgroundItems[i].imgIndex ] );
                item.x = backgroundItems[i].x;
                item.y = backgroundItems[i].y;
                item.image.onload = onloadCallback;
                stage.addChild(item);
            }
        },
        resizeBackground: function () {
            backgroundModel.resizeBackground(window.innerWidth, window.innerHeight);
        }
    });

    return View;
});
