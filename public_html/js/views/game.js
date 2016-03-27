define(function (require) {
        var tmpl = require('tmpl/game'),
			_ = require('underscore'),
            model = require('models/game'),
            baseView = require('views/baseView');

        var View = baseView.extend({
            template: tmpl,
            loginRequired: true,
            initialize: function () {
                this.model = model;
                baseView.prototype.initialize.apply(this, arguments);
                $(window).on("resize", _.bind(this.resizeGameArea, this));
            },
            show: function () {
                baseView.prototype.show.apply(this, arguments);
                this.resizeGameArea();
            },
            resizeGameArea: function () {
                var dynamicLayer = document.getElementById("dynamicLayer");
                if  (!dynamicLayer) {
                    console.log("canvas - null");
                    return;
                }
                model.setScreenSize(
                        window.innerHeight - document.getElementsByClassName("header")[0].offsetHeight, 
                        window.innerWidth,
                        document.getElementsByClassName("header")[0].offsetHeight
                    );
                dynamicLayer.parentElement.style.marginTop = model.getCssSize("topSidebar");
                dynamicLayer.parentElement.style.width  = model.getCssSize("width");
                dynamicLayer.parentElement.style.height = model.getCssSize("height");
            }
        });

        return new View();
    }
);
