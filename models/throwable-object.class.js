class ThrowableObject extends MovableObject {
    IMAGES = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES);
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 60;
        this.throw(x, y);
    }

    throw(x, y) {
        this.x = x + 150;
        this.y = y - 50;
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 25);
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 75);
    }
} 