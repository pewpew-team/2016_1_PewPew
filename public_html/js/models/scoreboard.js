define(['backbone', 'underscore'],
    function() {
        var Backbone = require('backbone');
        var _ = require('underscore');
        var ScoreboardModel = Backbone.Model.extend({
            getScores: function() {
                this.sync();
                this.order();
                return {scores: this.get('scores')};
            },
            sync : function () {
                this.set('scores',
                    [{name: 'Alex', score: 100},
                    {name: 'Alex', score: 100},
                    {name: 'Alex', score: 100},
                    {name: 'Alex', score: 100},
                    {name: 'Alex', score: 100},
                    {name: 'Alex', score: 100},
                    {name: 'Alex', score: 100},
                    {name: 'Alex', score: 100}]);
            },
            order: function () {
                var scores = this.get('scores');
                scores = _.sortBy(scores, 'name');
                this.set('scores', scores);
            }
        });
        return new ScoreboardModel();
    }
)