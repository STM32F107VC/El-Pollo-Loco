class Cloud extends MovableObject {
    y = 20;
    height = 300;
    width = 500;

    /**
     * The cunstructor function is always called first when a new instance of this class is generated and configures the object
     * 
     * @param {string} path - This is the path out of which an image has to be generated 
     * @param {number} x - This is the x-coordinate where the clouds are placed 
     */
    constructor(path, x) {
        super().loadImage(path);
        this.animate = this.animate.bind(this);
        this.x = x;
        this.setStoppableInterval(this.animate, 1000 / 60);
    }

    /**
     * This function let the clouds move left
     * 
     */
    animate() {
        this.moveLeft();
    }
}