class StatusBar extends DrawableObject {
  width = 150;
  height = 60;

  IMAGES = [];

  percentage;

  constructor(IMAGES, x, y, percentage) {
    super();
    this.IMAGES = IMAGES;
    this.loadImages(IMAGES);
    this.x = x;
    this.y = y;
    this.setPercentage(percentage);
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imgCache[path];
  }

  resolveImageIndex() {
    // console.log('Entered resolve ImagIndex function. Percentage Value is: ' + this.percentage + '.');
    // if (this.percentage <= 100 && this.percentage >= 80) {
    //   return 5;
    // } else if (this.percentage <= 80 && this.percentage >= 60) {
    //   return 4;
    // } else if (this.percentage <= 60 && this.percentage >= 40) {
    //   return 3;
    // } else if (this.percentage <= 40 && this.percentage >= 20) {
    //   return 2;
    // } else if (this.percentage <= 20 && this.percentage >= 10) {
    //   return 1;
    // } else if (this.percentage < 10) {
    //   return 0;
    // }
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
