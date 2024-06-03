class CollectableBottle extends MovableObject {

    /**
     * The cunstructor function is always called first when a new instance of this class is generated and configures the object
     * 
     * @param {string} path - This is the path out of which an image has to be generated
     */
    constructor(path) {
        super().loadImage(path);
        this.height = 80;
        this.width = 60;
        this.x = 200 + Math.random() * 1500;
        this.y = 350;
    }
}