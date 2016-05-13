define(function (require) {
    var tmpl = require('tmpl/game'),
        _ = require('underscore'),
        model = require('models/game'),
        baseView = require('views/baseView'),
        bulletsCollection = require('game/collections/bulletCollection');

    var View = baseView.extend({
        template: tmpl,
        loginRequired: true,
        events: {
            'click #js-quit': 'gameOver'
        },
        initialize: function () {
            this.model = model;
            baseView.prototype.initialize.apply(this, arguments);
            $(window).on("resize", _.bind(this.resizeGameArea, this));
            if (!navigator.onLine) {
                this.loginRequired = false;
            }
        },
        show: function () {
            bulletsCollection.isAddable = true;
            baseView.prototype.show.apply(this, arguments);
            this.resizeGameArea();
        },
        hide: function () {
            baseView.prototype.hide.apply(this);
            this.$('#js-score').innerHTML = '';
            this.$('#js-dude').removeClass();
            this.trigger('quitGame');
        },
        gameOver: function() {
            this.trigger('gameOver');
        },
        resizeGameArea: function () {
            var dynamicLayer = document.getElementById("dynamicLayer");
            if  (!dynamicLayer) {
                return;
            }
            model.setScreenSize(
                    window.innerHeight - $(".header").height(),
                    window.innerWidth,
                    $(".header").height()
                );
            dynamicLayer.parentElement.style.width  = model.getCssSize("width");
            dynamicLayer.parentElement.style.height = model.getCssSize("height");
            dynamicLayer.parentElement.style.marginTop = model.getCssSize("marginTop");
            if (!model.get("horizPos")) dynamicLayer.parentElement.classList.add('game--horizontal_border');
            else dynamicLayer.parentElement.classList.remove('game--horizontal_border');
        }
    });

    return new View();
});
