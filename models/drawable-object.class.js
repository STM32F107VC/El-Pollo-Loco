class DrawableObject {
    img;
    imgCache = {};
    currentImage = 0;
    x = 120;
    y = 300;
    height = 150;
    width = 100;
    
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }   

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        // this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imgCache[path] = img;
        });
    }
}