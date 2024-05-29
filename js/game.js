let canvas;
let world;
let ctx;
let imgStartScreen = new Image();
let imgStartGame = new Image();
let imgEndScreen = new Image();
let imgLandscape = new Image();
let deadEndboss = new Image();
let keyboard = new Keyboard();
let intro_audio = new Audio('audio/intro_sound _v1.mp3');
document.fonts.load("50px Gilgongo Sledge");

function init() {
  pauseAudio(intro_audio);
  initLevel();
  canvas.removeEventListener('click', init, false);
  world = new World(canvas, keyboard);
  // console.log('My character is', world.character);
}

function startGameScreen() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  canvas.addEventListener("click", init, false);
  setImgSrc();
  awaitImgLoad(ctx, imgStartScreen, 0, 0, 720, 480);
  awaitImgLoad(ctx, imgStartGame, canvas.width / 2 - imgStartGame.width / 2, canvas.height / 2, 50, 50);
  // playAudio(intro_audio);
}

function stopGameScreen() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(imgLandscape, 0, 0, 720, 480);
  ctx.drawImage(imgEndScreen, 0, 0, 720, 480);
  setTimeout(startGameScreen, 3000);
}

function wonGameScreen() {
  let myDiv = document.getElementById('myDiv');
  myDiv.classList.remove('d-none');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(imgLandscape, 0, 0, 720, 480);
  ctx.drawImage(deadEndboss, canvas.width/2 - 100, canvas.height/5, 250, 400);
  ctx.fillText("You win!", canvas.width/2, 125);
  ctx.textAlign = 'center';
  ctx.fillStyle = '#FFC700';
  ctx.fillStyle = "rgb(255 199 0 / 90%)";
  ctx.font = "75px Gilgongo Sledge";
  // setTimeout(startGameScreen, 5000);
}

function playAudio(audio) {
  let newAudio = audio;
  newAudio.autoplay = true;
  newAudio.loop = true;
  audio.play();
}

function pauseAudio(audio) {
  audio.pause();
}

function setImgSrc() {
  imgStartScreen.src = './img/9_intro_outro_screens/start/startscreen_2.png';
  imgStartGame.src = 'img/start_game.png';
  imgEndScreen.src = 'img/9_intro_outro_screens/game_over/game over!.png';
  imgLandscape.src = 'img/5_background/first_half_background.png';
  deadEndboss.src = 'img/4_enemie_boss_chicken/5_dead/G26.png';
}

function awaitImgLoad(ctx, img, posX, posY, width, height) {
  img.onload = function () {
    ctx.drawImage(img, posX, posY, width, height);
  };
}

addEventListener("keydown", (e) => {
  // console.log(e.code);
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