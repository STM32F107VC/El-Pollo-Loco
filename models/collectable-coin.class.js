class CollectableCoin extends MovableObject {
    
    constructor(path, x, y) {
        super().loadImage(path);
        
        this.height = 110;
        this.width = 110;
        // this.x = 200 + Math.random() * 1500;
        this.x = x;
        this.y = y;
    }
}