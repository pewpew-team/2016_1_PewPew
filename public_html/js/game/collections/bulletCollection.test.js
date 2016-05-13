define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        Barrier = require('game/models/barrier'),
        Bullet = require('game/models/bullet'),
        bulletCollection = require('game/collections/bulletCollection'),
        barriersCollection = require('game/collections/barriersCollection'),
        bullet,
        barrier;
    barriersCollection.createRandom(16, 4, 0.3, 40, 40);

    QUnit.module("game/collections/bulletCollection");
    QUnit.test("bulletCollection - экземпляр Backbone.Collection", function () {
        QUnit.ok(bulletCollection instanceof Backbone.Collection, 'bulletCollection is instance of Backbone.Collection');
    });
    QUnit.test("bulletCollection функция iterate и iterateBullet", function () {
        bulletCollection.reset();
        var width = 100,
            height = 100,
            DELTA_T = 10;
        bullet =  new Bullet({
            'posX': width,
            'posY': 0,
            'VELOCITY' : 0,
            'velX': width,
            'velY': 0,
            'sizeX': 10,
            'sizeY': 10
        });
        bulletCollection.add(bullet);
        bulletCollection.iterate(barriersCollection, width, height, DELTA_T);
        QUnit.ok(bulletCollection.at(0).get('velX') < 0, "При попадание на стенку скорость меняется, пуля движется");
        bulletCollection.remove(bullet);
        QUnit.ok(bulletCollection.length === 0, "Удаление из коллекции пуль работает");
    });
    QUnit.test("bulletCollection функция deleteOutOfBoxBullets", function () {
        var DELTA_T = 10000;
        bullet =  new Bullet({
            'posX': 0,
            'posY': 0,
            'VELOCITY': 0,
            'velX': 0,
            'velY': -10,
            'sizeX': 10,
            'sizeY': 10
        });
        bulletCollection.add(bullet);
        bulletCollection.iterate(barriersCollection, 100, 100, 200, DELTA_T);
        QUnit.ok(bulletCollection.length === 0, "Когда пуля вылетает за границы экрана удаляется");
    });
    QUnit.test("bulletCollection функция tryToCollide", function () {
        var posX = 100,
            posY = 100;
        bullet =  new Bullet({
            'posX': posX,
            'posY': posX,
            'VELOCITY': 0,
            'velX': 0,
            'velY': -10,
            'sizeX': 10,
            'sizeY': 10
        });
        barrier = new Barrier(posX, posY, false);
        QUnit.ok(bulletCollection.tryToCollide(bullet, barrier), "Функция обнаружения колижена работает");
    });
    QUnit.test("bulletCollection функция collide и moveToIntersectionPoint", function () {
        var posX = 300,
            posY = 300;
        bullet =  new Bullet({
            'posX': posX,
            'posY': posY,
            'VELOCITY': 1,
            'velX': 1,
            'velY':  20,
            'sizeX': 10,
            'sizeY': 10
        });
        barrier = new Barrier(posX, posY, false);
        bulletCollection.add(bullet);
        bulletCollection.collide( bulletCollection.at(0) , barrier);
        QUnit.ok( bulletCollection.at(0).get('velY') < 0 , "Функция колижена работает - относительно грани паралельно X");
        bulletCollection.at(0).set({
            'velY': 0,
            'velX': 20,
            'posX': posX,
            'posY': posY
            });
        bulletCollection.collide( bulletCollection.at(0) , barrier);
        QUnit.ok( bulletCollection.at(0).get('velX') < 0 , "Функция колижена работает - относительно грани паралельно Y");
        bulletCollection.at(0).set({
            'velY': 20,
            'velX': 20,
            'posX': posX,
            'posY': posY
        });
        bulletCollection.collide( bulletCollection.at(0) , barrier);
        QUnit.ok( bulletCollection.at(0).get('velY') && bulletCollection.at(0).get('velX'),
            "Функция колижена работает - относительно угла блока");
        bulletCollection.remove(bullet);
    });
    QUnit.test("bulletCollection функция fire", function () {
        bulletCollection.fire(0,0,0,0);
        QUnit.ok(bulletCollection.length === 1, "bullet добавляется в коллекцию по вызову метода fire");
    });
});
