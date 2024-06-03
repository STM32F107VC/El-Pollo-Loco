class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;

    /**
     * The cunstructor function is always called first when a new instance of this class is generated and configures the object
     * 
     * @param {string} imagePath - This is the path out of which an image has to be generated
     * @param {number} x - This is the x-coordinate where the background objects are placed 
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}