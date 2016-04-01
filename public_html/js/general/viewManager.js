define(function(require){
  var Backbone = require('backbone'),
      _ = require('underscore');

  var ViewManager = Backbone.Model.extend({
      initialize: function() {
        this.on('show', this.showView.bind(this));
      },
      showView: function(view) {
        if (this.has('_presentView')) {
          this.get('_presentView').hide();
        }
        this.set('_presentView', view);
      }
  });
  return new ViewManager();
});
