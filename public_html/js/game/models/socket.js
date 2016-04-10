define(function(require) {
  var Backbone = require('backbone');

  var Socket = Backbone.Model.extend({
    initialize: function() {
      this.set('messageHandlers', []);
    },
    open: function() {
      this.set('socket', new WebSocket("ws://pewpew.pro/ws"));
      this.get('socket').onmessage = this.messageHandler.bind(this);
      this.get('socket').onopen = this.openHandler.bind(this);
    },
    addMessageHandler: function(handler) {
      this.set('messageHandlers', this.get('messageHandlers').push(handler));
    },
    messageHandler: function(event) {
      this.get('messageHandlers').forEach(function(handler) {
        handler(event);
      });
    },
    send: function(message) {
      this.get('socket').send(message);
    },
    addOpenHandler: function (handler) {
      this.set('openHandlers', this.get('openHandlers').push(handler));
    },
    openHandler: function (event) {
      this.get('openHandlers').forEach(function(handler) {
        handler(event);
      });
    },
    close: function (message) {
      this.get('socket').close(message);
    }
  });

  return new Socket();
});
