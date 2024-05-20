class CollectableObject extends MovableObject {

    constructor(path) {
        super();
        this.loadImage(path);
        
        this.height = 80;
        this.width = 60;
        this.x = 200 + Math.random() * 1500;
        this.y = 350;
    }
}