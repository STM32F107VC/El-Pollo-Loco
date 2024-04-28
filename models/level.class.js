class Level {
    enemies;
    clouds;
    backgroundObject;
    throwableObject;
    level_end_x = 2250;

    constructor(enemies, clouds, backgroundObject, throwableObject) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObject = backgroundObject;
        this.throwableObject = throwableObject;
    }
}