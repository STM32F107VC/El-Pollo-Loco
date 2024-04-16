class MovableObject {
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

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        // this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
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

    isDead(e) {
        return e <= 0;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imgCache[path] = img;
        });
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