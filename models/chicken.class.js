class Chicken extends MovableObject {
    height = 50;
    width = 50;
    y = 380;
    constructor() {
        super().loadImage('../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 150 + Math.random() * 500;
    }
}