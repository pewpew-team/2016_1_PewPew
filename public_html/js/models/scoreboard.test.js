define(['backbone', 'models/scoreboard', 'underscore'],function () {
    QUnit.module("models/scoreboard");

    QUnit.test("Scoreboard - экземпляр Backbone.Model", function () {
        var Backbone = require('backbone');
        var scoreboard = require('models/scoreboard');


        QUnit.ok(scoreboard instanceof Backbone.Model, 'Scoreboard is instance of Backbone.Model');

    });

    QUnit.test("Scoreboard.getScores() returns {\'scores\': [...]}", function () {
        var Backbone = require('backbone'),
            _ = require('underscore'),
            scoreboard = require('models/scoreboard'),
            scores = scoreboard.getScores();


        QUnit.ok(scores.scores, 'Scores has scores field');
        QUnit.ok(Array.isArray(scores.scores), 'Scores contains array');

        // Проверяем упорядочен ли массив
        var scoresSorted = _.sortBy(scores.scores, 'name');
        var isScoresEqual = function(array1, array2) {
            if (array1.length !== array2.length) {
                return false;
            }
            for (var i = 0; i < array1.length; i++) {
                if (array1[i].name !== array2[i].name && array1[i].score !== array2[i].score) {
                    return false;
                }
            }
            return true;
        };

        QUnit.ok(isScoresEqual(scores.scores, scoresSorted), 'Returned array not sorted');

    });
});
