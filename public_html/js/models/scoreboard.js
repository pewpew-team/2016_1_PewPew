define(function(require) {
    var Backbone = require('backbone');
    var _ = require('underscore');
    var $ = require('jquery');
    var ScoreboardModel = Backbone.Model.extend({
        getScores: function(type) {
            if (type === 'time') {
                this.order();
                return {scores: this.get('scores')};
            }
            if (type === 'multi') {
                this.order();
                return {scores: this.get('scoresMulti')};
            }
            this.order();
            return {scores: this.get('scores')};
        },
        sync : function (complete) {
            $.ajax({
                method: 'GET',
                url: '/scoreboard',
                contentType: 'application/json',
                success: function (data) {
                    this.set('scores', data.scores);
                    this.set('scoresMulti', data.scoresMultiplayer);
                    complete();
                }.bind(this),
                error: function () {
                    this.trigger('errorScores', 'Cannot get scores');
                }.bind(this)
            });
        },
        order: function () {
            var scores = this.get('scores'),
                scoresMulti = this.get('scoresMulti');
            scores = _.sortBy(scores, 'name');
            this.set('scores', scores);
            scoresMulti = _.sortBy(scoresMulti, 'name');
            this.set('scoresMulti', scoresMulti);
        }
    });
    return new ScoreboardModel();
});
