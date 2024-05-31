let canvas;
let world;
let ctx;
let audios = [];
let imgStartScreen = new Image();
let imgStartGame = new Image();
let imgEndScreen = new Image();
let imgLandscape = new Image();
let deadEndboss = new Image();
let keyboard = new Keyboard();
let intro_music = new Audio('audio/intro_music.mp3');
let chicken_noise = new Audio('audio/chicken_noise.mp3');
document.fonts.load("50px Gilgongo Sledge");

function startGameScreen() {
  hideBtn('Finish');
  showBtn('Start');
  getCtx();
  setImgSrc();
  awaitImgLoad(ctx, imgStartScreen, 0, 0, 720, 480);
  // playAudio(intro_music);
}

function getCtx() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  startGameScreen();
}

function init() {
  hideBtn('Start');
  hideBtn('Finish');
  pauseAudio(intro_music);
  initLevel();
  world = new World(canvas, keyboard);
  playAudio(chicken_noise);
}

function getAudio() {
  pauseAudio(intro_music);
}

function showBtn(value) {
  let myDiv = document.getElementById(`myDiv${value}`);
  myDiv.classList.remove('d-none');
}

function hideBtn(value) {
  let myDiv = document.getElementById(`myDiv${value}`);
  myDiv.classList.add('d-none');
}

function lostGameScreen() {
  pauseAudio(chicken_noise);
  showBtn('Finish');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(imgLandscape, 0, 0, 720, 480);
  ctx.drawImage(imgEndScreen, 0, 0, 720, 480);
}

function wonGameScreen() {
  pauseAudio(chicken_noise);
  showBtn('Finish');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(imgLandscape, 0, 0, 720, 480);
  ctx.drawImage(deadEndboss, canvas.width/2 - 100, canvas.height/5, 250, 400);
  ctx.fillText("You win!", canvas.width/2, 125);
  ctx.textAlign = 'center';
  ctx.fillStyle = '#FFC700';
  ctx.fillStyle = "rgb(255 199 0 / 100%)";
  ctx.font = "75px Gilgongo Sledge";
}

function playAgain() {
  hideBtn('Finish');
  setTimeout(() => {
    init();
  }, 200);
}

function playAudio(audio) {
  let newAudio = audio;
  newAudio.autoplay = true;
  newAudio.loop = true;
  audio.play();
  audios.push(audio);
}

function pauseAudio(audio) {
  audio.pause();
}

function pauseAllAudios() {
  audios.forEach(a => {
    a.pause();
  });
}

function showIntroduction() {
  hideBtn('Start');
  canvas.classList.add('opacity-02');
  let div = document.getElementById('introduction');
  div.classList.remove('d-none');
  div.style.width = `${canvas.width}px`;
  div.style.height = `${canvas.height}px`;
}

function setImgSrc() {
  imgStartScreen.src = './img/9_intro_outro_screens/start/startscreen_2.png';
  imgEndScreen.src = 'img/9_intro_outro_screens/game_over/game over!.png';
  imgLandscape.src = 'img/5_background/first_half_background.png';
  deadEndboss.src = 'img/4_enemie_boss_chicken/5_dead/G26.png';
}

function awaitImgLoad(ctx, img, posX, posY, width, height) {
  img.onload = function () {
    ctx.drawImage(img, posX, posY, width, height);
  };
}

function hideLegend() {
  let legend = document.getElementById('legend');
  let button = document.getElementById('showLegend');
  legend.classList.toggle('d-none');
  button.classList.toggle('d-none');
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