// QUnit.config.autostart = false;
require.config({
    urlArgs: "_=" + (new Date()).getTime(),
    baseUrl: "../js",
    paths: {
        jquery: "lib/jquery",
        underscore: "lib/underscore",
        backbone: "lib/backbone",
        createjs: 'lib/easeljs-0.8.2.min'
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        'createjs': {
            exports: 'createjs'
        }
    }
});

var tests = [
    'models/scoreboard.test',
    'game/models/player.test',
    'game/collections/bulletCollection.test',
    'models/session.test',
    'game/collections/barriersCollection.test',
    'models/user.test',
    'general/viewManager.test'
];

require(tests, function () {
    QUnit.load();
    QUnit.start();
});
