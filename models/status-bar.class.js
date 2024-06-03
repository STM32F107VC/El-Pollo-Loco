class StatusBar extends DrawableObject {
  width = 150;
  height = 60;
  IMAGES = [];
  percentage;

  /**
   * The cunstructor function is always called first when a new instance of this class is generated and configures the object
   * 
   * @param {images} IMAGES - This are the image paths given to the function to generate new images with the this.loadImages(IMAGES) function 
   * @param {number} x - This is the x-coordinate where the status bar is placed
   * @param {number} y - This is the y-coordinate where the status bar is placed
   * @param {number} percentage - This is the value of how much the statusbar is filled
   */
  constructor(IMAGES, x, y, percentage) {
    super();
    this.IMAGES = IMAGES;
    this.loadImages(IMAGES);
    this.x = x;
    this.y = y;
    this.setPercentage(percentage);
  }

  /**
   * This function is to set the percentage of the statusbar. The plenty of it can be increased or decreased by 20% at once.
   * 
   * @param {number} percentage - This is the value of how much the statusbar is filled
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imgCache[path];
  }

  /**
   * This function checks which picture from the statusbar has to be loaded to represent the current percentage value
   * 
   * @returns - This returns the number to show the correct plenty of the status bar
   */
  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage == 80) {
      return 4;
    } else if (this.percentage == 60) {
      return 3;
    } else if (this.percentage == 40) {
      return 2;
    } else if (this.percentage == 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
