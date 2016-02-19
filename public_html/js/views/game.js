define([
    'views/baseView',
    'tmpl/game',
    'gameLogic'
], function (baseView, tmpl, application) {
        var View = baseView.extend({
            template: tmpl,
            show: function() {
                $('#page').html(this.el);
                this.$el.show();
                application.init('Alex','Edgar');
                application.run();
            }
        });

        return new View();
    }
);