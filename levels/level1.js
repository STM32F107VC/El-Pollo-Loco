// let level1;

const level1 = new Level(
  [
    new Chicken(),
    new Chicken(),
    // new Chicken(),
    // new Chicken(),
    // new ChickenSmall(),
    new ChickenSmall(),
    new ChickenSmall(),
    new Endboss(),
  ],
  [
    new Cloud("img/5_background/layers/4_clouds/2.png", -720),
    new Cloud("img/5_background/layers/4_clouds/1.png", 0),
    new Cloud("img/5_background/layers/4_clouds/2.png", 720),
    new Cloud("img/5_background/layers/4_clouds/1.png", 720 * 2),
    new Cloud("img/5_background/layers/4_clouds/2.png", 720 * 3),
  ],
  [
    new BackgroundObject("img/5_background/layers/air.png", -719),
    new BackgroundObject("img/5_background/layers/3_third_layer/2.png", -719),
    new BackgroundObject("img/5_background/layers/2_second_layer/2.png", -719),
    new BackgroundObject("img/5_background/layers/1_first_layer/2.png", -719),

    new BackgroundObject("img/5_background/layers/air.png", 0),
    new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 0),
    new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 0),
    new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 0),
    new BackgroundObject("img/5_background/layers/air.png", 719),
    new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719),
    new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719),
    new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719),

    new BackgroundObject("img/5_background/layers/air.png", 719 * 2),
    new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 719 * 2),
    new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 719 * 2),
    new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 719 * 2),
    new BackgroundObject("img/5_background/layers/air.png", 719 * 3),
    new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719 * 3),
    new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719 * 3),
    new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719 * 3),
  ],
  [
    new StatusBar('img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png', 25, 5),
    new StatusBar('img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png', 25, 45),
    new StatusBar('img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png', 25, 85),
    new StatusBar('img/7_statusbars/2_statusbar_endboss/orange/orange100.png', 25, 125)
  ]
);
