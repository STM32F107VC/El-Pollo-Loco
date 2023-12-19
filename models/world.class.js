class World {
    ctx;

    clouds = [
        new Cloud()
    ];

    backgoundObject = [
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 0)
        // new BackgroundObject('img/5_background/layers/3_third_layer/1.png'),
        // new BackgroundObject('img/5_background/layers/2_second_layer/2.png'),
        // new BackgroundObject('img/5_background/layers/2_second_layer/1.png'),
        // new BackgroundObject('img/5_background/layers/1_first_layer/2.png'),
        // new BackgroundObject('img/5_background/layers/1_first_layer/1.png')
    ];

    character = new Character();

    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken()
    ];

    canvas;
    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.addObjectsToMap(this.clouds);
        this.addObjectsToMap(this.backgoundObject);
        this.addObjectsToMap(this.enemies);
        this.addToMap(this.character);

        // this.enemies.forEach(enemy => { this.addToMap(enemy); });

        // this.clouds.forEach(cloud => { this.addToMap(cloud); });

        // this.backgoundObject.forEach(bgo => { this.addToMap(bgo) });

        // Draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    }
}