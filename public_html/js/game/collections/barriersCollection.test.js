define(function (require) {
    QUnit.module("game/collections/barriersCollection");

    QUnit.test("barriersCollection - экземпляр Backbone.Collection", function () {
        var Backbone = require('backbone');
        var barriersCollection = require('game/collections/barriersCollection');


        QUnit.ok(barriersCollection instanceof Backbone.Collection,
            'barriersCollection is instance of Backbone.Collection');

    });

    QUnit.test("barriersCollection.checkForRemovable", function () {
        var Backbone = require('backbone'),
            barriersCollection = require('game/collections/barriersCollection'),
            Barrier = require('game/models/barrier');

        barriersCollection.reset();
        QUnit.ok(barriersCollection.length === 0, 'Initialy empty');
        barriersCollection.add(new Barrier(0, 0, true));
        var isRemovable = barriersCollection.checkForRemovable();
        QUnit.ok(isRemovable, 'Removable element detected');

        barriersCollection.reset();
        barriersCollection.add(new Barrier(0, 0, false));
        isRemovable = barriersCollection.checkForRemovable();
        QUnit.ok(!isRemovable, 'Removable element did not detected');

    });

    QUnit.test("barriersCollection.createRandom", function () {
        var Backbone = require('backbone'),
            barriersCollection = require('game/collections/barriersCollection');

        barriersCollection.reset();
        QUnit.ok(barriersCollection.length === 0, 'Initialy empty');

        var nX = 10,
            nY = 10;
        barriersCollection.createRandom(nX, nY, 0.5, 0, 0);
        QUnit.ok(barriersCollection.length === nX*nY, 'nx*ny elements were created');

    });
});
