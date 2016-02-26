define(
    ['tmpl/login', 'views/baseView', 'models/user', 'event'],
    function (tmpl, baseView, user, event) {
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
    }
);