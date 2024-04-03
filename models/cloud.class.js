class Cloud extends MovableObject {
    y = 20;
    height = 300;
    width = 1000;
    speed = 0.15;

    constructor(path) {
        super().loadImage(path);
        this.x = Math.random() * 720;
        console.log(this.x);
        this.animate();
    }

    animate() {
        this.moveLeft();
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }
}