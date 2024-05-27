class CollectableBottle extends MovableObject {

    constructor(path) {
        super().loadImage(path);
        this.height = 80;
        this.width = 60;
        this.x = 200 + Math.random() * 1500;
        this.y = 350;
    }
}