class MovableObject {
    x = 120;
    y = 300;
    height = 150;
    width = 100;
    img;
    imgCache = {};
    currentImage = 0;
    speed = 0.15;
    

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

    moveRight() {
        console.log('Moving right');
        world.character.x += 10;
        // setTimeout(() => {
        //     world.character.x += 0.1;
        // }, 1000 / 6);
    }

    // moveLeft() {
    //     console.log('Moving left');
    //     // ctx.setTransform(1, 0.5, -0.5, 1, 30, 10);
    //     world.character.x -= 10;
    // }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }
}