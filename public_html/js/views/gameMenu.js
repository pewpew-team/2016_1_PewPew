define(function(require) {
    var baseView = require('views/baseView'),
        tmpl = require('tmpl/gameMenu'),
        session = require('models/session'),
        event = require('event');

    var GameMenu = baseView.extend({
        template: tmpl,
        show: function () {
            $('#page').html(this.el);
            this.$el.show();
            this.$el.find('#logout').click(function(e) {
                e.preventDefault();
                session.logout();
            });
            this.$el.find('#training').click(function(e) {
                e.preventDefault();
                event.trigger('startTraining');
            })
        }
    });

    return new GameMenu();
});