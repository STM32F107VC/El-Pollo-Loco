let canvas;
let world;
let keyboard = new Keyboard();


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    console.log('My character is', world.character);
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
});

// addEventListener("keydown", (event) => { });

/**
 * Onkeydown event listener
 */
// onkeydown = (event) => {
//     let getKeyValue = event.code;
//     if (getKeyValue === 'Space') world.character.jump();
//     else if (getKeyValue === 'KeyA') world.character.moveLeft();
//     else if (getKeyValue === 'KeyD') world.character.moveRight();
//     // console.log('Key with number: ' + event.code + ' ' + 'was pressed.');
// };