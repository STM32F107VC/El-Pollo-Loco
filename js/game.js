let canvas;
let world;

//Test variable
let test;


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas);
    console.log('My character is', world.character);
}

addEventListener("keypress", (e) => {
    console.log(e);
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