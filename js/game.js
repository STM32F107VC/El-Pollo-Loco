let canvas;
let world;
let ctx;
let imgStartScreen = new Image();
let imgStartGame = new Image();
let keyboard = new Keyboard();

function init() {
  //   world = new World(canvas, keyboard);
  // console.log('My character is', world.character);
  console.log("Init function");
}

function startGameScreen() {
  setImgSrc();
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  canvas.addEventListener("click", init, false);
  awaitImgLoad(ctx, imgStartScreen, 0, 0, 720, 480);
  awaitImgLoad(
    ctx,
    imgStartGame,
    canvas.width / 2 - imgStartGame.width / 2,
    canvas.height / 2,
    50,
    50
  );
}

function setImgSrc() {
  imgStartScreen.src = "./img/9_intro_outro_screens/start/startscreen_2.png";
  imgStartGame.src = "img/start_game.png";
}

function awaitImgLoad(ctx, img, posX, posY, width, height) {
  img.onload = function () {
    ctx.drawImage(img, posX, posY, width, height);
  };
}

addEventListener("keydown", (e) => {
  console.log(e.code);
  if (e.code == "ArrowRight") {
    keyboard.RIGHT = true;
  }
  if (e.code == "ArrowLeft") {
    keyboard.LEFT = true;
  }
  if (e.code == "ArrowUp") {
    keyboard.UP = true;
  }
  if (e.code == "ArrowDown") {
    keyboard.DOWN = true;
  }
  if (e.code == "Space") {
    keyboard.SPACE = true;
  }
  if (e.code == "KeyD") {
    keyboard.D = true;
  }
  if (e.code == "KeyP") {
    keyboard.P = true;
  }
});

addEventListener("keyup", (e) => {
  if (e.code == "ArrowRight") {
    keyboard.RIGHT = false;
  }
  if (e.code == "ArrowLeft") {
    keyboard.LEFT = false;
  }
  if (e.code == "ArrowUp") {
    keyboard.UP = false;
  }
  if (e.code == "ArrowDown") {
    keyboard.DOWN = false;
  }
  if (e.code == "Space") {
    keyboard.SPACE = false;
  }
  if (e.code == "KeyD") {
    keyboard.D = false;
  }
  if (e.code == "KeyP") {
    keyboard.P = false;
  }
});
