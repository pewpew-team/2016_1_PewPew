define(function (require) {
    var Backbone = require('backbone'),
        tmpl = require('tmpl/result');


    var View = Backbone.View.extend({
        template: tmpl,
        events: {
            'click #js-gameOver': 'hide'
        },
        render: function (msg) {
            this.$el.html(this.template({
              message: msg
            }));
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
