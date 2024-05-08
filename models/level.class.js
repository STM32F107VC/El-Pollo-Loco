class Level {
    enemies;
    clouds;
    backgroundObject;
    audio;
    level_end_x = 2250;

    constructor(enemies, clouds, backgroundObject, audio) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObject = backgroundObject;
        this.audio = audio;
    }
}