define(function (require) {
    var Backbone = require('backbone'),
        tmpl = require('tmpl/waiting'),
        $ = require('jquery'),
        socket = require('game/models/socket');

    var View = Backbone.View.extend({
        template: tmpl,
        events: {
            'click #js-cancel': 'cancel'
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
        },
        cancel: function() {
            this.trigger('cancel');
            this.hide();
        }
    });

    return new View();
});
