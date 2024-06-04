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
  yOffset = 10;

  /**
   * This function checks how mutch time passed to set the character into the idle mode
   * 
   * @returns - Returns the passed time
   */
  countPassedTime() {
    let passedTime;
    let endTime = new Date().getTime() / 1000;
    passedTime = endTime - this.startTime;
    return passedTime;
  }

  /**
   * This function returns a new time stamp
   * 
   * @returns - Returns a new timestamp
   */
  newTimeStamp() {
    return new Date().getTime() / 1000;
  }

  /**
   * This function is to set intervals which have to be stopped when the game is finish
   * 
   * @param {function} fn - This is the name from the funtion which has to be executed in an interval
   * @param {number} time - This is the time how fast the intervall has to be called
   */
  setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    this.intervalIds.push(id);
  }

  /**
   * This function stops the requestAnimationFrame() function when the game is over
   * 
   * @param {number} aFI - This is the id number of the requestAnimationFrame() function 
   */
  stopGame(aFI) {
    cancelAnimationFrame(aFI);
  }

  /**
   * This function clears all intervall at once
   * 
   */
  clearAllIntervals() {
    this.intervalIds.forEach(clearInterval);
  }

  /**
   * This function is to generate a new image
   * 
   * @param {string} path - This is the path out of which an image has to be generated 
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * This function is to generate new images
   * 
   * @param {string} arr - This are the paths out of which images has to be generated 
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imgCache[path] = img;
    });
  }

  /**
   * This function draws the image in 2d to the canvas
   * 
   * @param {context} ctx - This is the 2d context of the canvas
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}