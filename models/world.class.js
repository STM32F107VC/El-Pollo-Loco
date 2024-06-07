class World extends MovableObject {
  character = new Character();
  animationFrameId;
  throwableObject = [];
  level = level1;
  ctx;
  canvas;
  keyboard;
  allSounds;
  camera_x = 0;
  bottleState = 0;
  coinState = 0;
  endbossLife = 0;
  lastArrayPlace = this.level.enemies.length - 1;
  endBoss = this.level.enemies[this.lastArrayPlace];
  recoverEnergy = 0;

  /**
   * The cunstructor function is always called first when a new instance of this class is generated and configures the object
   * 
   * @param {canvas} canvas - This this is the paintable are where you can bring all you objects on
   * @param {key value} keyboard - This is the value of the pressed or released key 
   */
  constructor(canvas, keyboard, allSounds) {
    super();
    this.checkThrowObjects = this.checkThrowObjects.bind(this);
    this.checkCollisions = this.checkCollisions.bind(this);
    this.jumpingOnEnemy = this.jumpingOnEnemy.bind(this);
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.allSounds = allSounds;
    this.draw();
    this.setWorld();
    this.checkCollisions();
    this.run();
  }

  /**
   * This functions inherits the whole world to the character and the endboss to easily access all attributes form the world
   * 
   */
  setWorld() {
    this.character.world = this;
    this.level.enemies[this.lastArrayPlace].world = this;
  }

  /**
   * This function sets all stoppable intervals for checking collisions between the character and enemies or when a salsa bottle is thrown away
   * and if you want to enter the fullscreen mode
   * 
   */
  run() {
    this.setStoppableInterval(this.checkCollisions, 200);
    this.setStoppableInterval(this.checkThrowObjects, 200);
    this.setStoppableInterval(this.checkFullScreen, 100);
    this.setStoppableInterval(this.jumpingOnEnemy, 50);
  }


  /**
   * This function checks if the character jumps on an enemy
   * 
   */
  jumpingOnEnemy() {
    this.level.enemies.forEach((enemy, index) => {
      if (this.character.isJumpingOn(enemy)) {
        this.character.jump();
        if ((enemy instanceof Chicken || enemy instanceof ChickenSmall) && !(enemy instanceof Endboss)) {
          let jumpState = this.character.isJumping;
          if (jumpState) {
            enemy.energy -= 100;
            this.allSounds.audioCache['audio/jump_on_sound.mp3'].play();
            this.recoverLifePoints();
            this.setOnJumpTimeout(index);
            this.character.isJumping = !jumpState;
          }
        }
      }
    });
  }

  /**
   * This function recovers the energy from the character by +20% each time he killed two chicken
   * 
   */
  recoverLifePoints() {
    if (this.character.energy < 100 && !(this.character.energy > 100)) {
      this.recoverEnergy += 1;
      if (this.recoverEnergy == 2) {
        this.character.energy += 20;
        this.level.statusBar[2].setPercentage(this.character.energy);
        this.recoverEnergy = 0;
      }
    }
  }


  /**
   * This function sets an timeout after the character jumped on a chicken an splices the chicken out of the enemies array
   * and sets the y-coordinate from the character back to y=285;
   * 
   * @param {number} index - This is the index of the array place of the enemy to splice it out
   */
  setOnJumpTimeout(index) {
    setTimeout(() => {
      if (index >= 0 && index < this.level.enemies.length) {
        this.level.enemies.splice(index, 1);
      }
    }, 200);
    setTimeout(() => {
      this.character.y = 285;
    }, 500);
  }


  /**
   * This function gets the index of the endboss
   * 
   * @returns - The index of the endboss in from the array this.level.enemies[]
   */
  getIndexOfEndBoss() {
    return this.level.enemies.findIndex(enemy => enemy instanceof Endboss);
  }

  /**
 * This is the function to check if you want to throw a salsa bottle necessarly you have to collect first one that it
 * is possible. Then it generates a sound of a throwable object and if you hit the endboss his life gets reduced.
 * 
 */
  checkThrowObjects() {
    if (this.keyboard.D && this.bottleState > 0) {
      this.allSounds.audioCache['audio/throw_salsabottle.mp3'].play();
      let salsaBottle = new ThrowableObject(this.character.x + this.xOffset, this.character.y);
      this.addsalsaBottelToArray(salsaBottle);

      let endbossIndex = this.getIndexOfEndBoss();
      if (endbossIndex !== -1) {
        let endboss = this.level.enemies[endbossIndex];
        if (endboss.bottleHitsEndboss(salsaBottle)) {
          this.damageEndboss();
        }
      }
    }
  }


  /**
   * This function checks collisions between objects in the map
   * 
   */
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

  /**
   * This function checks collisions between collectable objects in the map like coins or salsa bottles
   * 
   * @param {string} type - This is the name of the collectable object either: Coin or Bottle 
   * @param {variable} i - This is the number of the status bar which needs to be refreshed after a collision
   */
  collisionWithCollectableObject(type, i) {
    let arrayName = `collectable${type}`;
    let lowerCaseInitialLetter = this.toLowerCase(type);
    let audio = this.allSounds.audioCache[`audio/collect_${lowerCaseInitialLetter}.mp3`];
    let accessObj = lowerCaseInitialLetter + `State`;
    this.level[arrayName].forEach((obj) => {
      if (this.character.isColliding(obj) && this[accessObj] < 100) {
        this.refreshStatusBar(i, audio, accessObj);
        this.removeCollectableObject(type, obj);
      }
    });
  }

  /**
   * This function refreshs the status bar from the collectable object like salsa bottles and coins and play the specific
   * audio for collecting a salsa bottle or a coin
   * 
   * @param {number} i - Is the number of the status bar which gets refreshed 
   * @param {audio} audio - Is the audio to play when a salsa bottle or a coin get collected 
   * @param {string} accessObj - Is the object that gets collected either a salsa bottle or coin
   */
  refreshStatusBar(i, audio, accessObj) {
    this.level.statusBar[i].setPercentage(20 + this[accessObj]);
    this[accessObj] += 20;
    audio.play();
  }

  /**
   * This function checks the current state of collected coins. If the value is 100 the status bar gets refreshed
   * it beginns to count from the beginning
   * 
   */
  checkCoinDepot() {
    if (this.coinState == 100) {
      this.coinState = 0;
      this.level.statusBar[1].setPercentage(0);
      world.level.collectableBottle.push(new CollectableBottle("img/6_salsa_bottle/1_salsa_bottle_on_ground.png"));
    }
  }

  /**
   * This function makes all letters from uppercase to lowercase
   * 
   * @param {string} obj - This is the word you want to change from uppercase to lowercase 
   * @returns 
   */
  toLowerCase(obj) {
    let lowerCaseInitialLetter = obj.toLowerCase();
    return lowerCaseInitialLetter;
  }

  /**
   * This function removes a collected object like a coin or bottle
   * 
   * @param {string} type - This is the name of the collectable object either: Coin or Bottle
   * @param {object} obj - This is the object you want to remove from the map after you collected it
   */
  removeCollectableObject(type, obj) {
    let arrayName = `collectable${type}`;
    let arrayIndex = this.level[arrayName].indexOf(obj);
    if (arrayIndex > -1) {
      this.level[arrayName].splice(arrayIndex, 1);
    }
  }

  /**
   * This Function adds damage to the entboss and lowers his life points with every damage by 20%
   * 
   */
  damageEndboss() {
    this.allSounds.audioCache['audio/burn_endboss.mp3'].play();
    this.endbossLife += 20;
    this.level.statusBar[3].setPercentage(100 - this.endbossLife);
    this.endBoss.hit();
  }

  /**
   * This function adds salsa bottles to throwableObject array to draw on canvas and updates the statusbar by -20 percent
   * @param {object} salsaBottle - This is the ThrowableObject which is new instantiated
   */
  addsalsaBottelToArray(salsaBottle) {
    this.throwableObject.push(salsaBottle);
    let updatedBottleState = this.bottleState -= 20;
    this.level.statusBar[0].setPercentage(updatedBottleState);
  }

  /**
   * This function is to switch to full screen
   * 
   */
  checkFullScreen() {
    if (keyboard.P) {
      canvas.requestFullscreen();
    }
  }

  /**
   * This is a self repetitive function to add objects to the map.
   * Note: this.ctx.translate(-this.camera_x, 0); = move backwards
   *       this.ctx.translate(this.camera_x, 0);  = move forward
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addMultiplyObjToMap();

    this.ctx.translate(-this.camera_x, 0);
    this.addObjectsToMap(this.level.statusBar);
    this.ctx.translate(this.camera_x, 0);

    this.addToMap(this.character);
    this.ctx.translate(-this.camera_x, 0);

    this.selfRequest();
  }

  /**
   * This function is requesting itself on a matching frequenzy with the display refresh rate
   * 
   */
  selfRequest() {
    let self = this;
    this.animationFrameId = requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * This function adds multiply objects to map
   * 
   */
  addMultiplyObjToMap() {
    this.addObjectsToMap(this.level.backgroundObject);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.collectableBottle);
    this.addObjectsToMap(this.level.collectableCoin);
    this.addObjectsToMap(this.throwableObject);
  }

  /**
   * This function also adds all objects to the map overgiven from the draw() function
   * 
   * @param {object} objects - This is the object that has to be drawn to the map
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * This function draws objects to the map
   * 
   * @param {object} mo - This is the object which is drawn to the map 
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }

    mo.draw(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * This function switches the image when the direction of the object changes
   * 
   * @param {object} mo - This is a object which is in the shown in the world 
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * This function switches the image back when the direction of the object changes
   * 
   * @param {object} mo - This is a object which is shown in the world
   */
  flipImageBack(mo) {
    this.ctx.restore();
    mo.x = mo.x * -1;
  }
}