class World {
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

  constructor(canvas, keyboard) {
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
  }

  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
      this.checkFullScreen();
    }, 200);
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit();
        this.level.statusBar[2].setPercentage(this.character.energy);
      }
    });

    // this.collisionWithCollectableObj();
    // this.collisionWithCollectableObj();

    this.level.collectableBottle.forEach((salsaBottle) => {
      if (this.character.isColliding(salsaBottle) && this.bottleState < 100) {
        this.level.statusBar[0].setPercentage(20 + this.bottleState);
        this.bottleState += 20;
        this.removeCollectableObject('Bottle', salsaBottle);
      }
    });

    this.level.collectableCoin.forEach((coin) => {
      if (this.character.isColliding(coin) && this.coinState < 100) {
        this.level.statusBar[1].setPercentage(20 + this.coinState);
        this.coinState += 20;
        this.removeCollectableObject('Coin', coin);
      }
    });
  }

  // gross und kleinschreibung von coin und bottle beachten. für coinState und bottleState muss coin oder bottle klein geschrieben sein.
  // collisionWithCollectableObj(type) {
  //   let arrayName = `collectable${type}`;
  //   this.level[arrayName].forEach((type) => {
  //     if(this.character.isColliding(type) && this. < 100) {

  //     }
  //   });
  // }

  removeCollectableObject(type, obj) {
    let arrayName = `collectable${type}`;
    let arrayIndex = this.level[arrayName].indexOf(obj);
    if (arrayIndex > -1) { 
      this.level[arrayName].splice(arrayIndex, 1);
    }
  }

  checkThrowObjects() {
    if (this.keyboard.D && this.bottleState > 0) {
      let salsaBottle = new ThrowableObject(this.character.x, this.character.y);
      let lastOffArr = this.level.enemies.length - 1;
      if (this.level.enemies[lastOffArr].isColliding(salsaBottle)) {
        console.log('Endboss got hit');
        this.endbossLife += 20;
        this.level.statusBar[3].setPercentage(100 - this.endbossLife);
        console.log(this.endbossLife);
      } else {
        console.log('Endboss was not hit');
      }


      this.throwableObject.push(salsaBottle);
      let updatedBottleState = this.bottleState -= 20;
      // console.log('Wert von bottleState beträgt:' + " " + this.bottleState);
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
    // this.addObjectsToMap(this.level.throwableObject);

    this.ctx.translate(-this.camera_x, 0); // backwars

    //------ Space for fixed objects ------
    // this.addToMap(this.statusBar);
    this.addObjectsToMap(this.level.statusBar);

    this.ctx.translate(this.camera_x, 0); // forwards

    this.addToMap(this.character);
    // this.addToMap(this.throwableObject);

    this.ctx.translate(-this.camera_x, 0);

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
    // console.log(mo);
    // this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);

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