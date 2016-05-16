define(function(require) {
  var Backbone = require('backbone');

  var Socket = Backbone.Model.extend({
    initialize: function() {
      this.set('messageHandlers', []);
      this.set('openHandlers', []);
    },
    open: function() {
      this.set('socket', new WebSocket("ws://pivo.pewpew.pro:8080/ws"));
      this.get('socket').onmessage = this.messageHandler.bind(this);
      this.get('socket').onopen = this.openHandler.bind(this);
      this.get('socket').onclose = function(arg) {
        this.trigger('closed', arg);
      }.bind(this);
    },
    addMessageHandler: function(handler) {
      var messageHandlers = this.get('messageHandlers');
      messageHandlers.push(handler);
      this.set('messageHandlers', messageHandlers);
      console.log(this.get('messageHandlers'));
    },
    clearMessageHandlers: function() {
      this.set('messageHandlers', []);
    },
    clearOpenHandlers: function() {
      this.set('openHandlers', []);
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
      var openHandlers = this.get('openHandlers');
      openHandlers.push(handler);
      this.set('openHandlers', messageHandlers);
    },
    openHandler: function (event) {
      this.get('openHandlers').forEach(function(handler) {
        handler(event);
      });
    },
    close: function () {
      this.get('socket').onmessage = null;
      this.get('socket').onopen = null;
      if (this.get('socket').readyState < 2) {
        this.get('socket').close();
      }
      this.get('socket').onclose = null;
      this.clearMessageHandlers();
      this.clearOpenHandlers();
    }
  });

  return new Socket();
});
