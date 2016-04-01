define(function(require) {
    var Backbone = require('backbone');
    var _ = require('underscore');
    var $ = require('jquery');
    var ScoreboardModel = Backbone.Model.extend({
        getScores: function() {
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
                    complete();
                }.bind(this),
                error: function () {
                    this.trigger('errorScores', 'Cannot get scores');
                }.bind(this)
            });
        },
        order: function () {
            var scores = this.get('scores');
            scores = _.sortBy(scores, 'name');
            this.set('scores', scores);
        }
    });
    return new ScoreboardModel();
});
