define(
    ['backbone', 'event'],
    function (Backbone, event) {
        var View = Backbone.View.extend({
            template: {},
            initialize: function () {
                this.render();
            },
            render: function () {
                this.$el.html(this.template());
            },
            show: function () {
                $('#page').html(this.el);
                // Добавляет всем кнопкам вызов события 'navigate'
                // Внутри события передается id кнопки
                this.$el.find('button').click(function (e) {
                    e.preventDefault();
                    event.trigger('navigate', $(this).attr('id'));
                    console.log('navigate');
                });
                this.$el.show();
            },
            hide: function () {
                this.$el.hide();
                // Отключаем прослушку событий
                this.$el.off();
            }
        });

        return View;
    }
);