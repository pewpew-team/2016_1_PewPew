define(
    ['views/baseView','tmpl/scoreboard', 'models/scoreboard'],
    function (baseView, tmpl) {
        var scoreboard = require('models/scoreboard');
        var View = baseView.extend({
            template: tmpl,
            render: function () {
                this.$el.html(this.template(this.model.getScores()));
            }
        });

        return new View({model: scoreboard});
    }
);