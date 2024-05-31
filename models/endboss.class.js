class Endboss extends MovableObject {
    height = 400;
    width = 250;
    y = 60;
    world;
    speed = 8;
    xPrevious = 0;

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.animate = this.animate.bind(this); // Access correct object with bind this to the class EndBoss
        this.checkEnergy = this.checkEnergy.bind(this);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 1900;
        // console.log(this);
        this.setStoppableInterval(this.animate, 125);
        this.setStoppableInterval(this.checkEnergy, 75);
    }

    animate() {
        let distanceToCharacter = this.x - this.world.character.x;
        if (distanceToCharacter < 700 && distanceToCharacter > 500) {
            this.playAnimation(this.IMAGES_ALERT);
        }
        if (distanceToCharacter < 500 && this.x >= this.world.character.x) {
            this.moveLeft();
            this.otherDirection = false;
            this.playAnimation(this.IMAGES_WALKING);
        }
        if (this.x < this.world.character.x && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = true;
            this.playAnimation(this.IMAGES_WALKING);
        }
        if (distanceToCharacter < 150) {
            this.playAnimation(this.IMAGES_ATTACK);
        }
    }

    checkEnergy() {
        this.xPrevious = this.x;
        if (this.isDead()) {
            this.x = this.xPrevious;
            this.playAnimation(this.IMAGES_DEAD);
            setTimeout(() => {
                this.applyGravity();
            }, 300);
            setTimeout(() => {
                this.stopGame(this.world.animationFrameId);
                this.clearAllIntervals();
                this.world.character.clearAllIntervals();
                wonGameScreen();
            }, 2000);    
        } else if(this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
        }
    }
}