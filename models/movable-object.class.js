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

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround()) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        return this.y < 280;
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
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
        console.log('Moving right');

        // setTimeout(() => {
        //     world.character.x += 0.1;
        // }, 1000/6);
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }
}