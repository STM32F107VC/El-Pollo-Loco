class Level {
    enemies;
    clouds;
    backgroundObject;
    statusBar;
    collectableBottle;
    collectableCoin;
    level_end_x = 2250;

    constructor(enemies, clouds, backgroundObject, statusBar, collectableBottle, collectableCoin) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObject = backgroundObject;
        this.statusBar = statusBar;
        this.collectableBottle = collectableBottle;
        this.collectableCoin = collectableCoin;
    }
}