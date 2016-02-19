define(
    [],
    function () {

        var application = function() {
            var dynamicCanvas,
                dynamicContext,
                staticContext,
                WIDTH,
                HEIGHT,
                player,
                enemy,
                bullets = [],
                barriers = [],
                pushedButton = false,
                previousDirection = null,
                coolDown = false,
                blockKeys = false;

            function Player(side) {
                var playerSize = {
                        x: 50,
                        y: 20
                    },
                    position = {
                        x: WIDTH / 2 - playerSize.x / 2
                    },
                    name = "Noname";

                //сторона
                // 1 - player (bottom)
                // -1 - enemy (top)
                switch (side) {
                    case 1 :
                        position.y = HEIGHT - playerSize.y / 2;
                        break;
                    case -1 :
                        position.y = playerSize.y / 2;
                        break;
                }

                function Gun() {
                    var GUN_LENGTH = 40,
                        angle = Math.sign(side) * Math.PI / 2,
                        pointer = {
                            x: WIDTH / 2,
                            y: HEIGHT / 2
                        },
                        minLevelPointer = null,
                        levelPointer = 2;
                    switch (side) {
                        case 1 :
                            minLevelPointer = position.y - GUN_LENGTH * levelPointer;
                            break;
                        case -1 :
                            minLevelPointer = position.y + GUN_LENGTH * levelPointer;
                            break;
                    }
                    function getAngle() {
                        var alpha = null,
                            cathetus = {
                                y: null,
                                x: null
                            };
                        cathetus.y = position.y - pointer.y;
                        cathetus.x = pointer.x - position.x;
                        if (cathetus.x > 0) {
                            alpha = Math.atan(cathetus.y / cathetus.x);
                        } else {
                            alpha = Math.atan(cathetus.y / cathetus.x) + Math.PI;
                        }
                        return alpha;
                    }
                    return {
                        draw: function (context) {
                            context.beginPath();
                            context.moveTo(position.x, position.y);
                            context.strokeStyle = "purple";
                            context.lineWidth = 5;
                            context.lineTo(position.x + Math.cos(angle) * GUN_LENGTH, position.y - Math.sin(angle) * GUN_LENGTH);
                            context.stroke();
                            context.closePath();
                        },
                        move: function (event) {
                            if (event) {
                                pointer.y = event.offsetY;
                                pointer.x = event.offsetX;
                            }
                            if (Math.sign(side) * pointer.y >= Math.sign(side) * minLevelPointer) {
                                pointer.y = minLevelPointer;
                            }
                            angle = getAngle();
                        },
                        shoot: function () {
                            var startPoint = {
                                x: position.x + Math.cos(angle) * GUN_LENGTH,
                                y: position.y - Math.sin(angle) * GUN_LENGTH
                            };
                            bullets.push(new Bullet(startPoint.x, startPoint.y, angle));
                        }
                    }
                }
                function Base() {
                    var STEP_UP_VELOCITY = 0.6,
                        STEP_DOWN_VELOCITY = 0.9,
                        MAX_VELOCITY = 12,
                        START_VELOCITY = 3.3,
                        FADING = 2,
                        velocity = null;
                    return {
                        draw: function (context) {
                            context.beginPath();
                            context.fillStyle = "black";
                            context.fillRect(position.x - playerSize.x / 2, position.y - playerSize.y / 2, playerSize.x, playerSize.y);
                            context.closePath();
                        },
                        drawDead : function(context) {
                            context.beginPath();
                            context.fillStyle = "red";
                            context.fillRect(position.x - playerSize.x / 2, position.y - playerSize.y / 2, playerSize.x, playerSize.y);
                            context.closePath();
                        },
                        move: function () {
                            //правая граница
                            if ((position.x + playerSize.x / 2 ) > WIDTH) {
                                position.x = WIDTH - playerSize.x / 2;
                                velocity = -velocity / FADING;
                                return;
                            }
                            //левая граница
                            if ((position.x - playerSize.x / 2 ) < 0) {
                                position.x = playerSize.x / 2;
                                velocity = -velocity / FADING;
                                return;
                            }
                            position.x += velocity;
                        },
                        increaseVelocity: function (direction) {
                            if (velocity === 0) {
                                velocity = direction * START_VELOCITY;
                                return;
                            }
                            if ((Math.abs(velocity) < MAX_VELOCITY)) {
                                velocity += STEP_UP_VELOCITY * direction;
                            }
                        },
                        decreaseVelocity: function () {
                            if (velocity === 0) return;
                            if (Math.abs(velocity) < START_VELOCITY) {
                                //всегда круглое число не получается ((
                                velocity = 0;
                            } else {
                                velocity += -Math.sign(velocity) * STEP_DOWN_VELOCITY;
                            }
                        },
                        stay: function () {
                            velocity = 0;
                        }
                    }
                }
                return {
                    base: Base(),
                    gun: Gun(),
                    deadCount : 0,
                    draw: function (context) {
                        this.base.draw(context);
                        this.gun.draw(context);
                    },
                    move: function (direction) {
                        this.base.increaseVelocity(direction);
                        this.base.move();
                        this.gun.move();
                    },
                    inertialMove: function () {
                        player.base.decreaseVelocity();
                        this.base.move();
                        this.gun.move();
                    },
                    getPosition: function () {
                        return position;
                    },
                    getSize: function () {
                        return playerSize;
                    },
                    drawDead : function(context) {
                        this.gun.draw(context);
                        this.base.drawDead(context);
                    }

                }
            }
            function Bullet(posX, posY, alpha) {
                this.position = {
                    x: posX,
                    y: posY
                };
                this.size = {
                    x: 10,
                    y: 10
                };
                this._VELOCITY = 10;
                this._FAULT = 3;
                this.angle = alpha;
                this.velocity = {
                    x: Math.cos(alpha) * this._VELOCITY,
                    y: -Math.sin(alpha) * this._VELOCITY
                };
            }

            Bullet.prototype._isBorder = function () {
                return (((this.position.x) < 0) || ((this.position.x + this.size.x) > WIDTH));
            };
            Bullet.prototype._reverseVelocity = function (direction) {
                this.velocity[direction] = - this.velocity[direction];
            };
            Bullet.prototype._getPreviousPosition = function () {
                return {
                    x : this.position.x - this.velocity.x,
                    y : this.position.y - this.velocity.y
                }
            };
            Bullet.prototype.move = function () {
                if (this._isBorder()) {
                    this._reverseVelocity("x");
                }
                this.position.x += this.velocity.x;
                this.position.y += this.velocity.y;
            };
            Bullet.prototype.draw = function (context) {
                context.beginPath();
                context.fillStyle = "orange";
                context.fillRect(this.position.x - this.size.x / 2, this.position.y - this.size.y / 2,  this.size.x, this.size.y);
                context.closePath();
            };
            Bullet.prototype.isFlyedFromArea =  function () {
                return ((this.position.y + this.size.y > HEIGHT) || (this.position.y < 0));
            };
            Bullet.prototype.isCollision = function (object) {
                var size = object.size || object.getSize();
                var position = object.position || object.getPosition();
                var collisionDistX = Math.pow((size.x + this.size.x) / 2, 2),
                    collisionDistY = Math.pow((size.y + this.size.y) / 2, 2),
                    distSquare = Math.pow((position.x - this.position.x), 2) + Math.pow((position.y - this.position.y), 2);
                return (collisionDistX > distSquare) || (collisionDistY > distSquare);
            };
            Bullet.prototype.collide = function (barrier) {
                var previousPosition = this._getPreviousPosition(),
                    k = (previousPosition.y - this.position.y) / (previousPosition.x - this.position.x),
                    b = this.position.y - k * this.position.x,
                    possiblePosition = {
                        deltaX : {},
                        deltaY : {}
                    };
                console.log("dfgdfg");
                //возможные отклонения
                possiblePosition.deltaX.x = barrier.position.x - Math.sign(this.velocity.x) * (barrier.size.x / 2 + this.size.x / 2);
                possiblePosition.deltaX.y = k * possiblePosition.deltaX.x + b;
                possiblePosition.deltaY.y = barrier.position.y - Math.sign(this.velocity.y) * (barrier.size.y / 2 + this.size.y / 2);
                possiblePosition.deltaY.x = (possiblePosition.deltaY.y - b) / k;

                //попадание на угол
                if (((Math.abs(possiblePosition.deltaY.x - possiblePosition.deltaX.x) < this._FAULT) || (Math.abs(possiblePosition.deltaY.x - possiblePosition.deltaX.x)) < this._FAULT)) {
                    this.position.x = possiblePosition.deltaX.x;
                    this.position.y = possiblePosition.deltaX.y;
                    this._reverseVelocity("x");
                    this._reverseVelocity("y");
                    return;
                }

                //левая или правая грань
                if (((barrier.position.y - barrier.size.y / 2 - this.size.y/2) <= possiblePosition.deltaX.y) &&
                    (possiblePosition.deltaX.y <= (barrier.position.y + barrier.size.y / 2 + this.size.y / 2))) {
                    this.position.x = possiblePosition.deltaX.x;
                    this.position.y = possiblePosition.deltaX.y;
                    this._reverseVelocity("x");
                    console.log("x")
                    return;
                }
                //нижняя или верхняя грань
                if (((barrier.position.x - barrier.size.x / 2 -this.size.x / 2) <= possiblePosition.deltaY.x) &&
                    (possiblePosition.deltaY.x <= (barrier.position.x + barrier.size.x / 2 + this.size.x / 2))) {
                    this.position.x = possiblePosition.deltaY.x;
                    this.position.y = possiblePosition.deltaY.y;
                    this._reverseVelocity("y");
                    console.log("y")
                    return;
                }

            };

            function Barrier(posX, posY, barrierType) {
                this.position = {
                    x: posX,
                    y: posY
                };
                this.size = {
                    x: 25,
                    y: 25
                };
                this.type = barrierType;
            }
            Barrier.prototype.draw = function (context) {
                context.beginPath();
                switch (this.type) {
                    case 0:
                        context.fillStyle = "red";
                        break;
                    case 1:
                        context.fillStyle = "green";
                        break;
                }
                context.fillRect(this.position.x - this.size.x / 2, this.position.y - this.size.y / 2, this.size.x, this.size.y);
                context.closePath();
            };
            Barrier.prototype.wipeOff = function (context) {
                context.beginPath();
                //такие числа из-за того что есть рамка у прямоугольника
                context.clearRect(this.position.x - this.size.x / 2 - 1, this.position.y - this.size.y / 2 - 1, this.size.x + 2, this.size.y + 2);
                context.closePath();
            };

            function generateTestBarrier() {
                barriers = [];

                barriers.push( new Barrier(270, 215, 1));
                barriers.push( new Barrier(270, 240, 0));

                barriers.push( new Barrier(370, 215, 1));
                barriers.push( new Barrier(370, 240, 0));

                barriers.push( new Barrier(170, 215, 1));
                barriers.push( new Barrier(170, 240, 0));
                /*
                 barriers.push( new Barrier(100, 175, 1));
                 barriers.push( new Barrier(100, 200, 1));
                 barriers.push( new Barrier(100, 225, 1));
                 barriers.push( new Barrier(100, 250, 1));
                 barriers.push( new Barrier(100, 275, 1));
                 barriers.push( new Barrier(100, 300, 1));
                 barriers.push( new Barrier(100, 325, 1));
                 */
                barriers.push( new Barrier(100, 175, 1));
                barriers.push( new Barrier(100, 205, 1));
                barriers.push( new Barrier(100, 235, 1));
                barriers.push( new Barrier(100, 265, 1));
                barriers.push( new Barrier(100, 295, 1));
                barriers.push( new Barrier(100, 325, 1));
                barriers.push( new Barrier(100, 355, 1));
            }

            function render() {
                //передвижение и сталкивание снарядов
                for (var i = 0; i < bullets.length; i++) {
                    //попадание по игроку
                    if (bullets[i].isCollision(player)) {
                        stopGame();
                        return;
                    }
                    //вылет за пределы экрана
                    if (bullets[i].isFlyedFromArea()) {
                        bullets.splice(i--, 1);
                        continue;
                    } else {
                        bullets[i].move();
                    }
                    //попадпние в блоки
                    for (var j = 0; j < barriers.length; j++) {
                        if (bullets[i].isCollision(barriers[j])) {
                            bullets[i].collide(barriers[j]);
                            switch (barriers[j].type) {
                                case 0:
                                    barriers[j].wipeOff(staticContext);
                                    barriers.splice(j, 1);
                                    break;
                                case 1:
                                    //не исчезающий блок
                                    break;
                            }
                            break;
                        }
                    }

                }
                //передвижение игрока
                if (!pushedButton) {
                    player.inertialMove();
                } else {
                    player.move(pushedButton);
                }
                //перерисовка
                redraw();
                //следующая отрисовка
                requestAnimationFrame(render);
            }
            function clearLayer(context) {
                context.beginPath();
                context.clearRect(0, 0, WIDTH, HEIGHT);
                context.closePath();
            }
            function redraw() {
                //очистка
                clearLayer(dynamicContext);
                //прорисовка игрока
                player.draw(dynamicContext);
                enemy.draw(dynamicContext);
                //пули
                for (var i = 0, len = bullets.length; i < len; i++) {
                    bullets[i].draw(dynamicContext);
                }
            }
            function drawStaticElements(context) {
                clearLayer(context);
                //блоки
                for (var i = 0, len = barriers.length; i < len; i++) {
                    barriers[i].draw(staticContext);
                }
            }
            function onkeydown(event) {
                if (blockKeys) return;
                var direction = null;
                switch(event.keyCode) {
                    case 65:
                    //A
                    //проваливается в left
                    case 37:
                        //left
                        pushedButton = -1;
                        break;
                    case 68:
                    //D
                    //проваливается в right
                    case 39 :
                        //right
                        pushedButton = 1;
                        break;
                }
                if (pushedButton !== previousDirection) {
                    //резкий тормоз
                    player.base.stay();
                    previousDirection = pushedButton;
                }
            }
            function onkeyup() {
                pushedButton = 0;
            }
            function cangeeCoolDown(){
                coolDown = !coolDown;
            }
            function onclick() {
                if (coolDown) return;
                player.gun.shoot();
                cangeeCoolDown();
                setTimeout(cangeeCoolDown, 100);
            }
            function onmousemove(event) {
                player.gun.move(event);
            }
            function stopGame() {
                console.log("game over");
                bullets = [];
                player.drawDead(dynamicContext);
                player.deadCount++;
                application.refreshScore();
                setTimeout(application.run, 1000);
            }
            return {
                init : function (namePlayer, nameEnemy) {
                    dynamicCanvas = document.getElementById("dynamicLayer");
                    dynamicContext = dynamicCanvas.getContext("2d");

                    staticContext = document.getElementById("staticLayer").getContext("2d");

                    WIDTH = dynamicCanvas.width;
                    HEIGHT = dynamicCanvas.height;

                    player = new Player(1);
                    enemy = new Player(-1);

                    player.name = namePlayer;
                    enemy.name = nameEnemy;

                    this.refreshScore();

                    document.addEventListener( "keydown", onkeydown);
                    document.addEventListener( "keyup", onkeyup);
                    dynamicCanvas.addEventListener( "click", onclick);
                    dynamicCanvas.addEventListener("mousemove", onmousemove);
                },
                run : function () {
                    generateTestBarrier();

                    drawStaticElements(staticContext);
                    requestAnimationFrame(render);
                },
                refreshScore : function () {
                    document.getElementById("score").innerHTML = player.name + " " + player.deadCount + " : " +
                        enemy.deadCount + " " + enemy.name;
                }
            }
        };
        return application();
    }

);