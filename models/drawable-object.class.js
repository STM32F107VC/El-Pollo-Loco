class DrawableObject {
  img;
  imgCache = {};
  audioCache = [];
  currentImage = 0;
  x = 120;
  y = 300;
  height = 150;
  width = 100;
  intervalIds = [];
  startTime;
  xOffset = 100;
  yOffset = 10;
  xBottleOffset = 250;
  isJumping = false;

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
   * @param {string} path - This is the path out of which an image is generated 
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * This function is to generate new images
   * 
   * @param {array} arr - These are the paths from which images have to be generated 
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imgCache[path] = img;
    });
  }

  /**
   * This function is to generate new sounds
   * 
   * @param {array} arr - These are the paths from which sounds have to be generated
   */
  loadSounds(arr) {
    arr.forEach((path) => {
      let audio = new Audio();
      audio.src = path;
      this.audioCache[path] = audio;
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

   /**
   * This function is for development purposes to show where the objects touch each other
   * 
   * @param {context} ctx - This is the 2d context of the canvas
   */
   drawFrame(ctx) {
    // if (this instanceof Chicken || this instanceof ChickenSmall) {
    //   ctx.beginPath();
    //   ctx.lineWidth = "4";
    //   ctx.strokeStyle = "blue";
    //   ctx.rect(this.x, this.y, this.width, this.height);
    //   ctx.stroke();
    // }

    // if (this instanceof Character) {
    //   ctx.beginPath();
    //   ctx.lineWidth = "4";
    //   ctx.strokeStyle = "green";
    //   ctx.rect(this.x, this.y, this.width, this.height);
    //   ctx.stroke();
    // }

    // let middle = this.x + 20 + this.width -50

    // if (this instanceof Character) {
    //   ctx.beginPath();
    //   ctx.lineWidth = "4";
    //   ctx.strokeStyle = "red";
    //   ctx.rect(this.x + 20, this.y, this.width - 50, this.height - 5);
    //   ctx.stroke();
    // }

    // let xStart = (this.x + 20);
    // let xEnd = (this.width - 50);
    // // let xMidline = ((xEnd - xStart)/2);
    // if (this instanceof Character) {
    //   ctx.beginPath();
    //   ctx.lineWidth = "4";
    //   ctx.strokeStyle = "red";
    //   ctx.rect(xStart, this.y, this.width-75, this.height - 5);
    //   ctx.stroke();
    // }
  }
}