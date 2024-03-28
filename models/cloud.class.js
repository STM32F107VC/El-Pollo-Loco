class Cloud extends MovableObject {
    y = 20;
    height = 300;
    width = 1000;

    constructor(path) {
        super().loadImage(path);
        this.x = Math.random() * 720;
        console.log(this.x);
        this.animate();
    }

    animate() {
        if (this.x >= 0) {
            setInterval(() => {
                this.x -= 0.1;
            }, 1000 / 60);
            if (this.x <= 0) {
                this.x = 720;
            }
        }
    }
}