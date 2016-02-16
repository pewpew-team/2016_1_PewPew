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
                $('#page').html(this.el);
                $('#login').on('click', function () {
                    window.location.href = '#login'
                })
                $('#game').on('click', function () {
                    window.location.href = '#game'
                })
                $('#scoreboard').on('click', function () {
                    window.location.href = '#scoreboard'
                })
                this.$el.show();
            },
            hide: function () {
                this.$el.hide();
                $('login').off('**');
                $('game').off('**');
                $('scoreboard').off('**');
            }
        });

        return new View();
    }
);