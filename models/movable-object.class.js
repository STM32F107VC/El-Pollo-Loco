class MovableObject extends DrawableObject {
    x = 120;
    y = 300;
    height = 150;
    width = 100;
    img;
    imgCache = {};
    currentImage = 0;
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
        return this.y < 285;
    }

    drawFrame(ctx) {
        // Blue rectangle
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    isColliding(enemy) {
        return this.x + this.width > enemy.x &&
                    this.y + this.height > enemy.y &&
                        this.x < enemy.x + enemy.width &&
                            this.y < enemy.y + enemy.height;
    }

    hit() {
        this.energy -=5;
        if(this.energy <= 0) {
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

    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    moveLeft() {
        this.x -= this.speed;
        this.otherDirection = true;
    }
}