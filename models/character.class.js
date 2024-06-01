class Character extends MovableObject {
  y = 10;
  speed = 15;
  world;
  walking_audio = new Audio('audio/running_pepe.mp3');
  dead_audio = new Audio('audio/dead_pepe.mp3');
  hurt_audio = new Audio('audio/hurt_pepe.mp3');
  jump_audio = new Audio('audio/jump_pepe.mp3');
  currentTime = 0;

  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_LONG_IDLE = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  IMAGES_WALKING = [
    "../img/2_character_pepe/2_walk/W-21.png",
    "../img/2_character_pepe/2_walk/W-22.png",
    "../img/2_character_pepe/2_walk/W-23.png",
    "../img/2_character_pepe/2_walk/W-24.png",
    "../img/2_character_pepe/2_walk/W-25.png",
    "../img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "../img/2_character_pepe/3_jump/J-31.png",
    "../img/2_character_pepe/3_jump/J-32.png",
    "../img/2_character_pepe/3_jump/J-33.png",
    "../img/2_character_pepe/3_jump/J-34.png",
    "../img/2_character_pepe/3_jump/J-35.png",
    "../img/2_character_pepe/3_jump/J-36.png",
    "../img/2_character_pepe/3_jump/J-37.png",
    "../img/2_character_pepe/3_jump/J-38.png",
    "../img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  constructor() {
    super().loadImage("../img/2_character_pepe/2_walk/W-21.png");
    this.checkEnergy = this.checkEnergy.bind(this);
    this.animate = this.animate.bind(this); // Binde den Kontext von this
    this.idleAnimation = this.idleAnimation.bind(this);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.applyGravity(this.IMAGES_JUMPING);
    this.setStoppableInterval(this.animate, 1000 / 60);
    this.setStoppableInterval(this.checkEnergy, 50);
    this.setStoppableInterval(this.idleAnimation, 150);
    this.startTime = new Date().getTime() / 1000;
  }

  idleAnimation() {
    if(this.countPassedTime() >= 0) {
      this.playAnimation(this.IMAGES_IDLE);
    }
    if(this.countPassedTime() >= 4) {
      this.playAnimation(this.IMAGES_LONG_IDLE);
    }
  }

  animate() {
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      this.moveRight();
      this.walking_audio.play();
    }
    if (this.world.keyboard.LEFT && this.x > 0) {
      this.moveLeft();
      this.walking_audio.play();
    }
    if (this.world.keyboard.SPACE && !this.isAboveGround()) {
      this.jump();
      this.jump_audio.play();
    }
    this.world.camera_x = -this.x + 100;
  }

  checkEnergy() {
    if (this.isDead()) {
      this.playAnimation(this.IMAGES_DEAD);
      this.dead_audio.play();
      this.clearAllIntervals();
      this.stopGame(this.world.animationFrameId);
      lostGameScreen();
    } else if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
      this.hurt_audio.play();
    } else if (this.isAboveGround()) {
      this.playAnimation(this.IMAGES_JUMPING);
      this.startTime = new Date().getTime() / 1000;
    } else {
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.startTime = new Date().getTime() / 1000;
        // Walk animation
        this.playAnimation(this.IMAGES_WALKING);
      }
    }
  }

  jump() {
    this.speedY = 30;
  }
}