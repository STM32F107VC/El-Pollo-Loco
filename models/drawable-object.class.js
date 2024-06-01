class DrawableObject {
  img;
  imgCache = {};
  currentImage = 0;
  x = 120;
  y = 300;
  height = 150;
  width = 100;
  intervalIds = [];
  startTime;
  xOffset = 30;

  countPassedTime() {
    let passedTime;
    let endTime = new Date().getTime() / 1000;
    passedTime = endTime - this.startTime;
    return passedTime;
  }

  setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    this.intervalIds.push(id);
  }

  stopGame(aFI) {
    this.clearAllIntervals();
    cancelAnimationFrame(aFI);
  }

  clearAllIntervals() {
    this.intervalIds.forEach(clearInterval);
  }

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imgCache[path] = img;
    });
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}