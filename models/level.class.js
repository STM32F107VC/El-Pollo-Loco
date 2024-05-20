class Level {
    enemies;
    clouds;
    backgroundObject;
    statusBar;
    level_end_x = 2250;

    constructor(enemies, clouds, backgroundObject, statusBar) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObject = backgroundObject;
        this.statusBar = statusBar;
    }
}