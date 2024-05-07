class Level {
    enemies;
    clouds;
    backgroundObject;
    throwableObject;
    level_end_x = 2250;

    constructor(enemies, clouds, backgroundObject) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObject = backgroundObject;
    }
}