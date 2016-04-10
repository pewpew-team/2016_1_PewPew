define(function(require) {
  var Backbone = require('backbone');

  var Socket = Backbone.Model.extend({
    initialize: function() {
      this.set('handlers', []);
    },
    open: function() {
      this.set('socket', new WebSocket("ws://pewpew.pro/ws"));
      this.get('socket').onmessage = handler.bind(this);
    },
    addMessageHandler: function(handler) {
      this.set('handlers', this.get('handlers').push(handler));
    },
    handler: function(event) {
      this.get('handlers').forEach(function(handler) {
        handler(event);
      });
    }
  });

  return new Socket();
});
