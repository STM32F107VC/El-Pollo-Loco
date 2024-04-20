class DrawableObject {
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

    playAnimation(images) {
        let i = this.currentImage % images.length; // 1 % 6 = 0 Rest 1, 2 % 6 = 0 Rest 2, 3 % 6 = 0 Rest 3, 4 % 6 = 0, Rest 4, 5 % 6 = 0 Rest 5, 6 % 6 = 1 Rest 0, 7 % 6 = 1 Rest 1
        let path = images[i];
        this.img = this.imgCache[path];
        this.currentImage++;
    }
}