
let canvas;
let world;
let ctx;
let genImg = new Image();
let keyboard = new Keyboard();

function init() {
    // canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    // console.log('My character is', world.character);
}

function startGameScreen() {
    genImg.src = './img/9_intro_outro_screens/start/startscreen_2.png';
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    genImg.onload = function() {
        ctx.drawImage(genImg, 0, 0, 720, 480);
    }
}

addEventListener("keydown", (e) => {
    console.log(e.code);
    if (e.code == 'ArrowRight') {
        keyboard.RIGHT = true;
    }
    if (e.code == 'ArrowLeft') {
        keyboard.LEFT = true;
    }
    if (e.code == 'ArrowUp') {
        keyboard.UP = true;
    }
    if (e.code == 'ArrowDown') {
        keyboard.DOWN = true;
    }
    if (e.code == 'Space') {
        keyboard.SPACE = true;
    }
    if(e.code == 'KeyD') {
        keyboard.D = true;
    }
    if(e.code == 'KeyP') {
        keyboard.P = true;
    }

});

addEventListener("keyup", (e) => {
    if (e.code == 'ArrowRight') {
        keyboard.RIGHT = false;
    }
    if (e.code == 'ArrowLeft') {
        keyboard.LEFT = false;
    }
    if (e.code == 'ArrowUp') {
        keyboard.UP = false;
    }
    if (e.code == 'ArrowDown') {
        keyboard.DOWN = false;
    }
    if (e.code == 'Space') {
        keyboard.SPACE = false;
    }
    if(e.code == 'KeyD') {
        keyboard.D = false;
    }
    if(e.code == 'KeyP') {
        keyboard.P = false;
    }
});   