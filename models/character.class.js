class Character extends MovableObject {
    y = 280;

    IMAGES_WALKING = [
        '../img/2_character_pepe/2_walk/W-21.png',
        '../img/2_character_pepe/2_walk/W-22.png',
        '../img/2_character_pepe/2_walk/W-23.png',
        '../img/2_character_pepe/2_walk/W-24.png',
        '../img/2_character_pepe/2_walk/W-25.png',
        '../img/2_character_pepe/2_walk/W-26.png'
    ]

    // IMAGES_JUMPING = [
    //     '../img/2_character_pepe/3_jump/J-31.png',
    //     '../img/2_character_pepe/3_jump/J-32.png',
    //     '../img/2_character_pepe/3_jump/J-33.png',
    //     '../img/2_character_pepe/3_jump/J-34.png',
    //     '../img/2_character_pepe/3_jump/J-35.png',
    //     '../img/2_character_pepe/3_jump/J-36.png',
    //     '../img/2_character_pepe/3_jump/J-37.png',
    //     '../img/2_character_pepe/3_jump/J-38.png',
    //     '../img/2_character_pepe/3_jump/J-39.png'
    // ]

    constructor() {
        super().loadImage('../img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    animate() {
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_WALKING.length; // 1 % 6 = 0 Rest 1, 2 % 6 = 0 Rest 2, 3 % 6 = 0 Rest 3, 4 % 6 = 0, Rest 4, 5 % 6 = 0 Rest 5, 6 % 6 = 1 Rest 0, 7 % 6 = 1 Rest 1
            let path = this.IMAGES_WALKING[i];
            this.img = this.imgCache[path];
            this.currentImage++;
        }, 100);
    }

    jump() {
        this.y = this.y - 60;
        setTimeout(() => {
            this.y = 285;
        }, 200);
    }
}