define(function (require) {
    QUnit.module('models/scoreboard');
    QUnit.test('ScoreModel - экземпляр Backbone.Model', function () {
        var ScoreboardModel = require('./scoreboard'),
            scoreboard = new ScoreboardModel();
        var Backbone = require('backbone');

        QUnit.ok(scoreboard instanceof Backbone.Model);
    });
});
