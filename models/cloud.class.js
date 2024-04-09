class Cloud extends MovableObject {
    y = 20;
    height = 300;
    width = 1000;

    constructor(path, x) {
        super().loadImage(path);
        this.x = x;
        this.animate();
    }

    animate() {
        this.moveLeft();
    }
}