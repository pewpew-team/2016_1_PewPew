define(['backbone'],
    function() {
        var Backbone = require('backbone');
        var ScoreboardModel = Backbone.Model.extend({
            getScores: function() {
                // Пока нет сервера сделано так
                return {scores: [
                    {name: 'Alex', score: 100},
                    {name: 'Alex', score: 100},
                    {name: 'Alex', score: 100},
                    {name: 'Alex', score: 100},
                    {name: 'Alex', score: 100},
                    {name: 'Alex', score: 100},
                    {name: 'Alex', score: 100},
                    {name: 'Alex', score: 100}
                ]}

            }
        });
    }
)