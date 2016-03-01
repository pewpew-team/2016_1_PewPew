define(function (require) {
    var tmpl = require('tmpl/login'),
        baseView = require('views/baseView'),
        user = require('models/user'),
        event = require('event');


    var View = baseView.extend({
        template: tmpl,
        events: {
            'click #sign-in': function(e) {
                e.preventDefault();
                event.trigger('navigate', 'game');
            }
        },
        initialize: function () {
            this.render();
            this.listenTo(event,'invalidLoginPassword', this.showErrorMessage);
        },
        showErrorMessage: function () {
            // TODO
        }
    });

    return new View();
});