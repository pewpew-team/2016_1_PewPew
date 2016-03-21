define(function (require) {
        var tmpl = require('tmpl/game'),
            baseView = require('views/baseView');

        var View = baseView.extend({
            template: tmpl,
            loginRequired: true
        });

        return new View();
    }
);
