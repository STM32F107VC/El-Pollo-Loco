class StatusBar extends DrawableObject {
    width = 200;
    height = 100;

  percentageValues = [0, 20, 40, 60, 80, 100];
  imageIndex = [0, 1, 2, 3, 4, 5];

  IMAGES = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
  ];

  percentage = 100;

  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 25;
    this.y = 5;
    this.setPercentage(100);
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imgCache[path];
  }

  resolveImageIndex() {
    // for (let i = 0; i < this.percentageValues.length; i++) {
    //   let percentageValue = this.percentageValues[i];
    //   if (this.percentage == percentageValue) {
    //     return this.imageIndex[i];
    //   }
    // }

    if(this.percentage == 100) {
        return 5;
    } else if(this.percentage == 80) {
        return 4;
    } else if(this.percentage == 60) {
        return 3;
    } else if(this.percentage == 40) {
        return 2;
    } else if(this.percentage == 20) {
        return 1;
    } else {
        return 0;
    }
  }
}
