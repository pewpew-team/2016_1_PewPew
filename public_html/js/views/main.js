define(function (require) {
    var baseView = require('views/baseView'),
        tmpl = require('tmpl/main'),
        tmplOffline = require('tmpl/offlineMain');

    var View = baseView.extend({
        template: tmpl,
        show: function() {
            var isOnline = navigator.onLine;
            if (!isOnline) {
                this.template = tmplOffline;
                baseView.prototype.render.apply(this);
            }
            baseView.prototype.show.apply(this);
        }
    });

    return new View();
});
