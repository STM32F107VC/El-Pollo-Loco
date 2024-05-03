class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 5;
  energy = 100;
  lastHit = 0;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) { // Throwable objects should always fall
      return true;
    } else {
      return this.y < 285;
    }
  }

  // isIdle() {
  //     let currentTime = new Date().getTime();
  //     currentTime = currentTime / 1000;
  //     if(currentTime <= 5) {
  //         currentTime += new Date().getTime();
  //     } else {
  //         return currentTime > 5;
  //     }
  // }

  isColliding(enemy) {
    return (
      this.x + this.width > enemy.x &&
      this.y + this.height > enemy.y &&
      this.x < enemy.x + enemy.width &&
      this.y < enemy.y + enemy.height
    );
  }

  hit() {
    this.energy -= 10;
    if (this.energy <= 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isDead() {
    return this.energy == 0;
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 0.5;
  }

  playAnimation(images) {
    let i = this.currentImage % images.length; // 1 % 6 = 0 Rest 1, 2 % 6 = 0 Rest 2, 3 % 6 = 0 Rest 3, 4 % 6 = 0, Rest 4, 5 % 6 = 0 Rest 5, 6 % 6 = 1 Rest 0, 7 % 6 = 1 Rest 1
    let path = images[i];
    this.img = this.imgCache[path];
    this.currentImage++;
  }

  moveRight() {
    this.x += this.speed;
    this.otherDirection = false;
  }

  moveLeft() {
    this.x -= this.speed;
    this.otherDirection = true;
  }
}
