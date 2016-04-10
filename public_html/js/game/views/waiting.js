define(function (require) {
    var Backbone = require('backbone'),
        tmpl = require('tmpl/waiting'),
        $ = require('jquery');

    var View = Backbone.View.extend({
        template: tmpl,
        events: {
            'click #js-cansel': 'cancel',
        },
        initialize: function() {
            this.render();
        },
        render: function () {
            this.$el.html(this.template());
        },
        show: function () {
            this.$el.appendTo(".game");
            this.$el.show();
        },
        hide: function () {
            this.$el.hide();
            this.$el.detach();
        }
    });

    return new View();
});
