define(
    ['backbone','tmpl/main'],
    function (Backbone, tmpl) {
        var View = Backbone.View.extend({
            template: tmpl,
            initialize: function () {
                this.render();
            },
            render: function () {
                this.$el.html(this.template());
            },
            show: function () {
                $('#page').append(this.el);
                this.$el.show();
            },
            hide: function () {
                this.$el.hide();
            }
        });

        return new View();
    }
);