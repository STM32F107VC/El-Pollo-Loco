class Cloud extends MovableObject {
    y = 20;
    height = 300;
    width = 500;

    constructor(path, x) {
        super().loadImage(path);
        this.x = x;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}