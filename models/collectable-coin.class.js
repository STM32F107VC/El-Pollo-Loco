class CollectableCoin extends MovableObject {
    /**
     * The cunstructor function is always called first when a new instance of this class is generated and configures the object
     * 
     * @param {string} path - This is the path out of which an image has to be generated
     * @param {number} x - This is the x-coordinate where the coin is placed  
     * @param {number} y - This is the y-coordinate where the coin is placed
     */
    constructor(path, x, y) {
        super().loadImage(path);
        this.height = 40;
        this.width = 40;
        this.x = x;
        this.y = y;
    }
}