class Chicken extends MovableObject {
    height = 50;
    width = 50;
    y = 380;

    IMAGES_WALKING = [
        '../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGE_DEAD = ['img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];

    /**
     * The cunstructor function is always called first when a new instance of this class is generated and configures the object
     * 
     */
    constructor() {
        super().loadImage('../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGE_DEAD);
        this.animate = this.animate.bind(this);
        this.walking = this.walking.bind(this);
        this.checkEnergy = this.checkEnergy.bind(this);
        this.x = 350 + Math.random() * 950;
        this.speed = 0.15 + Math.random() * 0.25;
        this.setStoppableInterval(this.animate, 1000 / 60);
        this.setStoppableInterval(this.walking, 200);
        this.setStoppableInterval(this.checkEnergy, 10);
    }

    /**
     * This function let the chickens move left with 60fps
     * 
     */
    animate() {
        this.moveLeft();
        this.otherDirection = false;
    }

    /**
     * This function let the chicken image animation play with 200ms
     * 
     */
    walking() {
        this.playAnimation(this.IMAGES_WALKING);
    }

    /**
     * This function checks if a normal chicken is dead
     * 
     */
    checkEnergy() {
        if (this.isDead()) {
            this.playAnimation(this.IMAGE_DEAD);
        }
    }
}