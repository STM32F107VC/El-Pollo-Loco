class World extends MovableObject {
  character = new Character();
  animationFrameId;
  throwableObject = [];
  level = level1;
  ctx;
  canvas;
  keyboard;
  camera_x = 0;
  bottleState = 0;
  coinState = 0;
  endbossLife = 0;
  lastArrayPlace = this.level.enemies.length - 1;
  endBoss = this.level.enemies[this.lastArrayPlace];

  constructor(canvas, keyboard) {
    super();
    this.checkThrowObjects = this.checkThrowObjects.bind(this);
    this.checkCollisions = this.checkCollisions.bind(this);
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.checkCollisions();
    this.run();
  }

  setWorld() {
    this.character.world = this;
    this.level.enemies[this.lastArrayPlace].world = this;
  }

  run() {
    this.setStoppableInterval(this.checkCollisions, 200);
    this.setStoppableInterval(this.checkThrowObjects, 200);
    this.setStoppableInterval(this.checkFullScreen, 100);
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit();
        this.level.statusBar[2].setPercentage(this.character.energy);
      }
    });
    
    this.collisionWithCollectableObject('Bottle', 0);
    this.collisionWithCollectableObject('Coin', 1);
    this.checkCoinDepot();
  }

  collisionWithCollectableObject(type, i) {
    let arrayName = `collectable${type}`;
    let lowerCaseInitialLetter = this.toLowerCase(type);
    let audio = new Audio(`audio/collect_${lowerCaseInitialLetter}.mp3`);
    let accessObj = lowerCaseInitialLetter + `State`;
    this.level[arrayName].forEach((obj) => {
      if (this.character.isColliding(obj) && this[accessObj] < 100) {
        this.level.statusBar[i].setPercentage(20 + this[accessObj]);
        this[accessObj] += 20;
        this.removeCollectableObject(type, obj);
        audio.play();
      }
    });
  }

  checkCoinDepot() {
    if (this.coinState == 100) {
      this.coinState = 0;
      this.level.statusBar[1].setPercentage(0);
      world.level.collectableBottle.push(new CollectableBottle("img/6_salsa_bottle/1_salsa_bottle_on_ground.png"));
    }
  }

  toLowerCase(obj) {
    let lowerCaseInitialLetter = obj.toLowerCase();
    return lowerCaseInitialLetter;
  }

  removeCollectableObject(type, obj) {
    let arrayName = `collectable${type}`;
    let arrayIndex = this.level[arrayName].indexOf(obj);
    if (arrayIndex > -1) {
      this.level[arrayName].splice(arrayIndex, 1);
    }
  }

  checkThrowObjects() {
    if (this.keyboard.D && this.bottleState > 0) {
      let throwAudio = new Audio('audio/throw_salsabottle.mp3');
      throwAudio.play();
      let salsaBottle = new ThrowableObject(this.character.x + this.xOffset, this.character.y);
      if (this.level.enemies[this.lastArrayPlace].isColliding(salsaBottle)) {
        let audio = new Audio('audio/burn_endboss.mp3');
        audio.play();
        this.endbossLife += 20;
        this.level.statusBar[3].setPercentage(100 - this.endbossLife);
        this.endBoss.hit();
      }
      this.throwableObject.push(salsaBottle);
      let updatedBottleState = this.bottleState -= 20;
      this.level.statusBar[0].setPercentage(updatedBottleState);
    }
  }

  checkFullScreen() {
    if (keyboard.P) {
      canvas.requestFullscreen();
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObject);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.collectableBottle);
    this.addObjectsToMap(this.level.collectableCoin);
    this.addObjectsToMap(this.throwableObject);

    this.ctx.translate(-this.camera_x, 0); // backward
    //------ Space for fixed objects ------
    this.addObjectsToMap(this.level.statusBar);
    this.ctx.translate(this.camera_x, 0); // forward

    this.addToMap(this.character);
    this.ctx.translate(-this.camera_x, 0); // backward

    // draw() wird immer wieder aufgerufen
    let self = this;
    this.animationFrameId = requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    // mo.drawFrame(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    this.ctx.restore();
    mo.x = mo.x * -1;
  }
}