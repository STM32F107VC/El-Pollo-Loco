class ThrowableObject extends MovableObject {
    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    /**
     * The cunstructor function is always called first when a new instance of this class is generated and configures the object
     * 
     * @param {number} x - This is the value how far the bottle in x-direction can be thrown away
     * @param {number} y - This is the value how far the bottle in y-direction can be thrown away
     */
    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.bottleForwarding = this.bottleForwarding.bind(this);
        this.loadImages(this.IMAGES_BOTTLE);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        console.log('Slasa bottle x first value = ' + this.x);
        this.y = y;
        this.height = 80;
        this.width = 60;
        this.throw(x, y);
    }

    /**
     * This function throws the bottle away
     * 
     * @param {number} x - This is the value how far the bottle in x-direction can be thrown away
     * @param {number} y - This is the value how far the bottle in y-direction can be thrown away
     */
    throw(x, y) {
        this.x = x + 150;
        this.y = y - 50;
        console.log('Bottle' + ' ' + 'x = ' + x + ' ' + 'and' + 'y = ' + y);
        this.speedY = 30;
        this.applyGravity();
        this.setStoppableInterval(this.bottleForwarding, 25);
        setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE);
        }, 100);
        setInterval(() => {
            this.playAnimation(this.IMAGES_SPLASH); 
        }, 500);
    }

    /**
     * This function sets an offset so the bottle can make damage earlier to the endboss so you dont have to be as close as possible in front of him
     * 
     */
    bottleForwarding() {
        this.x += 10;
    }
} 