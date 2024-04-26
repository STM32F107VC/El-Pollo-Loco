class Level {
    enemies;
    clouds;
    backgroundObject;
    throwableObj;
    level_end_x = 2200;

    constructor(enemies, clouds, backgroundObject, throwableObj) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObject = backgroundObject;
        this.throwableObj = throwableObj;
    }
}