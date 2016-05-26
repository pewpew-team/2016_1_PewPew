define(function (require) {
    var Backbone = require('backbone'),
        router = require('router'),
        $ = require('jquery');

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/serviceWorker.js').then(function(reg) {
        console.log('Registration succeeded. Scope is ' + reg.scope);
      }).catch(function(error) {
        console.log('Registration failed with ' + error);
      });
    }
    Backbone.history.start();
    $('.preloader__wrap').addClass('preloader__wrap--fade-out');
    setTimeout(function() {
        $('.preloader__wrap').remove();
        $('.page__background').removeClass('page__background--invisible');
        setTimeout(function() {
            $('.page').addClass('page--toCenter').removeClass('page--outside');
            setTimeout(function() {
                $('.page').removeClass('page--toCenter');
            }, 1200);
        }, 500);
    }, 2600);
});
