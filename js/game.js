let canvas;
let world;
let ctx;
let k = false;
let keyboard = new Keyboard();
let allSounds = new MuteableAudio();
let deadEndboss = new Image();
let imgStartGame = new Image();
let imgEndScreen = new Image();
let imgLandscape = new Image();
let imgStartScreen = new Image();
document.fonts.load("50px Gilgongo Sledge");
let audios = allSounds.audioCache;


/**
 * This function sets the homescreen and adds eventlistener to mobile touch buttons
 * 
 */
function startGameScreen() {
  muteUnmuteAudio();
  addTouchEventListener();
  hideBtn('Finish');
  showBtn('Start');
  getCtx();
  setImgSrc();
  awaitImgLoad(ctx, imgStartScreen, 0, 0, 720, 480);
}

/**
 * This functions gets the canvas element and the 2d context
 * 
 */
function getCtx() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
}

/**
 * This function is used to clear the canvas element
 * 
 */
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  startGameScreen();
}

/**
 * This function initializes the game after clicking on the play-game button
 * 
 */
function init() {
  hideBtn('Start');
  hideBtn('Finish');
  showBtn('speakerIconInGame');
  initLevel();
  world = new World(canvas, keyboard, allSounds);
}

/**
 * This function shows div containers either the one with the id=myDivStart or the other with the id=myDivFinish
 * 
 * @param {string} value - This is the name of the div you want to show 
 */
function showBtn(value) {
  let myDiv = document.getElementById(`myDiv${value}`);
  myDiv.classList.remove('d-none');
}

/**
 * This function hides div containers either the one with id=myDivStart or the other with the id=myDivFinish
 * 
 * @param {string} value - This is the name of the div you want to hide 
 */
function hideBtn(value) {
  let myDiv = document.getElementById(`myDiv${value}`);
  myDiv.classList.add('d-none');
}

/**
 * This functions shows the endscreen when you lose a game and gives you the opportunity to restart the game or go back to the homescreen
 * 
 */
function lostGameScreen() {
  showBtn('Finish');
  hideBtn('speakerIconInGame');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(imgLandscape, 0, 0, 720, 480);
  ctx.drawImage(imgEndScreen, 0, 0, 720, 480);
}

/**
 * This function shows the endscreen when you win a game and gives you the opportunity to restart the game or go back to the homescreen
 * 
 */
function wonGameScreen() {
  showBtn('Finish');
  hideBtn('speakerIconInGame');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(imgLandscape, 0, 0, 720, 480);
  ctx.drawImage(deadEndboss, canvas.width / 2 - 100, canvas.height / 5, 250, 400);
  ctx.fillText("You win!", canvas.width / 2, 125);
  ctx.textAlign = 'center';
  ctx.fillStyle = '#FFC700';
  ctx.fillStyle = "rgb(255 199 0 / 100%)";
  ctx.font = "75px Gilgongo Sledge";
}

/**
 * This function restarts a game when you click on the restart game button
 * 
 */
function playAgain() {
  hideBtn('Finish');
  setTimeout(() => {
    init();
  }, 200);
}

/**
 * This function sets a view image paths to generate an image for the homescreen
 * 
 */
function setImgSrc() {
  imgStartScreen.src = './img/9_intro_outro_screens/start/startscreen_2.png';
  imgEndScreen.src = 'img/9_intro_outro_screens/game_over/game over!.png';
  imgLandscape.src = 'img/5_background/first_half_background.png';
  deadEndboss.src = 'img/4_enemie_boss_chicken/5_dead/G26.png';
}

/**
 * This function show you the introduction when you click on the info icon
 * 
 */
function showIntroduction() {
  let div = document.getElementById('introduction');
  div.classList.remove('d-none');
  canvas.classList.add('opacity-01');
  hideBtn('Start');
}

/**
 * This functions closes the introcution if you click on the arrow back
 * 
 */
function closeIntroduction() {
  showBtn('Start');
  let div = document.getElementById('introduction');
  div.classList.add('d-none');
  canvas.classList.remove('opacity-01');
}

/**
 * This functions draws images on the canvas
 * 
 * @param {drawing context} ctx - This is the 2d context of the canvas
 * @param {image} img - This is the image to draw on the canvas
 * @param {position} posX - This is the x-coordinate of the image on where it is inserted
 * @param {position} posY - This is the y-coordinate of the image on where it is inserted
 * @param {size} width - This is the width of the image
 * @param {size} height - This is the height of te image
 */
function awaitImgLoad(ctx, img, posX, posY, width, height) {
  img.onload = function () {
    ctx.drawImage(img, posX, posY, width, height);
  };
}

/**
 * This function plays an audio
 * 
 * @param {audio} audio - This is the audio you give into the function to play
 */
function playAudio(path) {
  let newAudio = allSounds.audioCache[path];
  if (path == 'audio/chicken_noise.mp3') {
    newAudio.loop = true;
  }
  newAudio.play();
}

/**
 * This function mutes all audios from the audioCache{}
 * 
 */
function muteAllAudios() {
  let allAudios = Object.values(audios);
  allAudios.forEach((audio) => {
    audio.muted = true;
  });
}


/**
 * This function unmutes all audios from the audioCache{}
 * 
 */
function unmuteAllAudios() {
  let allAudios = Object.values(audios);
  allAudios.forEach((audio) => {
    audio.muted = false;
  });
}

/**
 * This function mutes the intro audio whne the mute audio gets clicked
 * 
*/
function muteUnmuteAudio() {
  let speakerStartScreen = document.getElementById('myDivspeakerIcon');
  let speakerInGameScreen = document.getElementById('onGameSpeaker');
  if (!k) {
    muteAllAudios();
    speakerStartScreen.src = 'img/mute.png';
    speakerInGameScreen.src = 'img/mute.png';
    k = true;
  } else {
    playAudio('audio/chicken_noise.mp3');
    unmuteAllAudios();
    speakerStartScreen.src = 'img/unmute.png';
    speakerInGameScreen.src = 'img/unmute.png';
    k = false;
  }
}

/**
 * This function adds keydown eventlistener to the keys to fire an action
 * 
 */
addEventListener("keydown", (e) => {
  if (e.code == "ArrowRight") {
    keyboard.RIGHT = true;
  }
  if (e.code == "ArrowLeft") {
    keyboard.LEFT = true;
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

/**
 * This function adds keyup eventlistener to the key to fire an action whne they get released
 * 
 */
addEventListener("keyup", (e) => {
  if (e.code == "ArrowRight") {
    keyboard.RIGHT = false;
  }
  if (e.code == "ArrowLeft") {
    keyboard.LEFT = false;
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

/**
 * This function adds and removes touch eventlistener to the arrow images and the salsa bottle for controlling the game on mobile devices
 * 
 */
function addTouchEventListener() {
  document.getElementById('moveLeft').addEventListener('touchstart', (e) => {
    keyboard.LEFT = true;
  });
  document.getElementById('moveLeft').addEventListener('touchend', (e) => {
    keyboard.LEFT = false;
  });
  document.getElementById('moveRight').addEventListener('touchstart', (e) => {
    keyboard.RIGHT = true;
  });
  document.getElementById('moveRight').addEventListener('touchend', (e) => {
    keyboard.RIGHT = false;
  });
  document.getElementById('throwBottle').addEventListener('touchstart', (e) => {
    keyboard.D = true;
  });
  document.getElementById('throwBottle').addEventListener('touchend', (e) => {
    keyboard.D = false;
  });
  document.getElementById('jump').addEventListener('touchstart', (e) => {
    keyboard.SPACE = true;
  });
  document.getElementById('jump').addEventListener('touchend', (e) => {
    keyboard.SPACE = false;
  });
}