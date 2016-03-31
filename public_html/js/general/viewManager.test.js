define(function (require) {
    QUnit.module("general/viewManager");

    QUnit.test("viewManager - экземпляр Backbone.Model", function () {
        var Backbone = require('backbone');
        var viewManager = require('general/viewManager');

        QUnit.ok(viewManager instanceof Backbone.Model, 'viewManager is instance of Backbone.Model');

    });

    QUnit.test("viewManager.showView", function () {
        var Backbone = require('backbone'),
            viewManager = require('general/viewManager'),
            spy = sinon.spy();
            basicView = Backbone.View.extend({
                hide: spy
            });

        var viewSpy = new basicView();
        viewManager.showView(viewSpy);
        QUnit.ok(viewManager.get('_presentView') === viewSpy, 'View was stored on first call');
        var newView = new basicView();
        viewManager.showView(newView);
        QUnit.ok(spy.calledOnce, 'Hide method was called for old view');

    });
});
