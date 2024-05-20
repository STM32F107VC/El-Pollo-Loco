class StatusBar extends DrawableObject {
  width = 150;
  height = 60;

  IMAGES = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png"
  ];

  IMAGES_HEALTH_BOSS = [
    'img/7_statusbars/2_statusbar_endboss/green/green0.png',
    'img/7_statusbars/2_statusbar_endboss/green/green20.png',
    'img/7_statusbars/2_statusbar_endboss/green/green40.png',
    'img/7_statusbars/2_statusbar_endboss/green/green60.png',
    'img/7_statusbars/2_statusbar_endboss/green/green80.png',
    'img/7_statusbars/2_statusbar_endboss/green/green100.png'
  ];

  percentage = 100;

  constructor(path, x, y) {
    super().loadImage(path);
    // Bilder beim instanziieren eines objekts übergeben oder Instanz evt. in level.class.js erstellen
    this.loadImages(this.IMAGES);
    /*this.x = 25;// Wert an Konstruktor übergeben
    this.y = 5;// Wert an Konstruktor übergeben*/
    this.x = x;
    this.y = y;
    // this.setPercentage(100);
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imgCache[path];
  }

  resolveImageIndex() {
    if (this.percentage <= 100 && this.percentage >= 80) {
      return 5;
    } else if (this.percentage <= 80 && this.percentage >= 60) {
      return 4;
    } else if (this.percentage <= 60 && this.percentage >= 40) {
      return 3;
    } else if (this.percentage <= 40 && this.percentage >= 20) {
      return 2;
    } else if (this.percentage <= 20 && this.percentage >= 10) {
      return 1;
    } else if (this.percentage < 10) {
      return 0;
    }
  }
}
