define(
    ['backbone','tmpl/scoreboard'],
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
                $('#page').html(this.el);
                this.$el.show();
            },
            hide: function () {
                this.$el.hide();
            }
        });

        return new View();
    }
);