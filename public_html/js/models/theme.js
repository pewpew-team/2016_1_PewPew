define(function (require) {
    var Backbone = require('backbone'),
        themesJSON = require('models/themesJSON');

    var Themes = Backbone.Model.extend({
    	initialize: function() {
    		this.set("themeIndex", Math.random() * themesJSON.length ^ 0);
    	},
        getTheme: function() {
            return themesJSON[ this.get("themeIndex") ];
        },
    });

    return (new Themes()).getTheme();
});