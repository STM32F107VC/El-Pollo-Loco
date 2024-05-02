class ThrowableObject extends MovableObject {
    width = 50;
    height = 50;
    y = 270;

    IMAGES = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    constructor() {
        super();
        this.loadImage('img/6_salsa_bottle/salsa_bottle.png');
        // this.x = x * Math.random() + 950;
        // this.y = ;
        // this.playAnimation();
    }

    // throw() {
    //     console.log('Entered throw function.');
    // }

    speed() {

    }
}