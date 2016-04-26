define(function (require) {
    var Backbone = require('backbone'),
        tmpl = require('tmpl/result'),
        $ = require('jquery');

    var View = Backbone.View.extend({
        template: tmpl,
        events: {
            'click #js-gameOver': 'hide',
            'click #js-gameRestart': 'restart'
        },
        initialize: function() {
            this.render();
        },
        addMessage: function(message) {
            $('.menu__result').html(message);
        },
        render: function () {
            this.$el.html(this.template());
        },
        show: function () {
            this.$el.appendTo(".game");
            this.$el.show();
        },
        restart: function() {
            this.hide();
            this.trigger('restart');
        },
        hide: function () {
            this.$el.hide();
            this.$el.detach();
        }
    });

    return new View();
});
