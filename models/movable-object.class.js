class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 5;
  energy = 100;
  lastHit = 0;

  /**
   * This function applies gravity to falling objects
   * 
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**
   * This function checks if a salsa bottle (ThrowableObject) or the endboss is above the ground to applie gravity or not
   * 
   * @returns - Returns true if object is above ground and also return in the else {} path this.y < 285 as a condition for if statement
   */
  isAboveGround() {
    if (this instanceof ThrowableObject || this instanceof Endboss) {
      return true;
    } else {
      return this.y < 285;
    }
  }

  /**
   * This function checks if an object is colliding with an other object
   * 
   * @param {object} enemy - This is the enemies but also objects like coins and salsa bottles 
   * @returns 
   */
  isColliding(enemy) {
    return (
      this.x + this.width > enemy.x + 20 &&
      this.y + this.height - this.yOffset > enemy.y &&
      this.x < enemy.x + enemy.width &&
      this.y < enemy.y + enemy.height
    );
  }

  /**
   * This function checks if the character jumps on a chicken
   * @param {object} enemy - Contains the chicken on which the character jumped
   * @returns - Returns the evaluation if the character really jumped on the chicken
   */
  isJumpingOn(enemy) {
    if (enemy instanceof ChickenSmall || enemy instanceof Chicken) {
      return (
        this.y + this.height < enemy.y + enemy.height &&
        this.y + this.height >= enemy.y &&
        this.x + this.width > enemy.x &&
        this.x < enemy.x + enemy.width
      );
    }
  }



  /**
 * This function checks if the salsa bottle hits the endboss
 * 
 * @param {object} enemy - Contains the salsa bottle as an object 
 * @returns - Returns the evaluation if the x coordinate is higher or lower than the x coordinate from the endboss to register a hit or not
 */
  bottleHitsEndboss(enemy) {
    return (
      this.x - this.xBottleOffset <= enemy.x
    );
  }

  /**
   * This function lowers life points when a hit happens
   * 
   */
  hit() {
    this.energy -= 20;
    if (this.energy <= 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * This function checks if the character or the endboss i dead and return its own energy with zero
   * 
   * @returns - Returns the death state with zero energy
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * This function checks if character or endboss was hit
   * 
   * @returns - Returns a statement for a if() condition
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 0.5;
  }

  /**
   * This function play/iterates all images from the array given to it so a flowing movement is created (also depending on the setIntervall time)
   * 
   * @param {images} images - This are all image paths in the images array 
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imgCache[path];
    this.currentImage++;
  }

  /**
   * This function lets an object move right
   * 
   */
  moveRight() {
    this.x += this.speed;
    this.otherDirection = false;
  }

  /**
   * This function lets an object move left
   * 
   */
  moveLeft() {
    this.x -= this.speed;
    this.otherDirection = true;
  }
}