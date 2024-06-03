class Level {
    enemies;
    clouds;
    backgroundObject;
    statusBar;
    collectableBottle;
    collectableCoin;
    level_end_x = 2250;

    /**
     * The cunstructor function is always called first when a new instance of this class is generated and configures the object
     * 
     * @param {object} enemies - This is the variable with all enemies overgiven from level1.js in it
     * @param {object} clouds - This is the variable with all clouds overgiven from level1.js in it
     * @param {object} backgroundObject -  This is the variable with all background objects overgiven from level1.js  in it
     * @param {object} statusBar - This is the variable with all status bars overgiven from level1.js in it
     * @param {object} collectableBottle - This is the variable with all collectable bottles overgiven from level1.js in it
     * @param {object} collectableCoin - This is the variable with all collectable coins overgiven from level1.js in it
     */
    constructor(enemies, clouds, backgroundObject, statusBar, collectableBottle, collectableCoin) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObject = backgroundObject;
        this.statusBar = statusBar;
        this.collectableBottle = collectableBottle;
        this.collectableCoin = collectableCoin;
    }
}