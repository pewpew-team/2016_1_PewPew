require.config({
    urlArgs: '_=' + (new Date()).getTime(),
    baseUrl: 'js',
    paths: {
        underscore: 'lib/underscore',
        jquery: 'lib/jquery',
        backbone: 'lib/backbone'
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        }
    }
});

define(
    ['backbone', 'router'],
    function (Backbone, router) {
        Backbone.history.start();
    }
);


