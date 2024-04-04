class World {
    ctx;

    clouds = [
        // new Cloud('img/5_background/layers/4_clouds/1.png'),
        new Cloud('img/5_background/layers/4_clouds/full.png')
    ];

    backgroundObject = [
        new BackgroundObject('img/5_background/layers/air.png', 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0)
    ];

    character = new Character();

    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken()
    ];

    world;
    canvas;
    keyboard;
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.addObjectsToMap(this.backgroundObject);
        this.addObjectsToMap(this.clouds);
        this.addObjectsToMap(this.enemies);
        this.addToMap(this.character);

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