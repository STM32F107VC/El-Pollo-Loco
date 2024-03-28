let canvas;
let world;



function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas);
    console.log('My character is', world.character);
}

addEventListener("keydown", (event) => { });

/**
 * Onkeydown event listener 
 */
onkeydown = (event) => {
    let getKeyValue = event.code;
    if (getKeyValue === 'Space') world.character.jump();
    // console.log('Key with number: ' + event.code + ' ' + 'was pressed.');
    else if (getKeyValue === 'KeyA') world.character.moveLeft();
    else if (getKeyValue === 'KeyD') world.character.moveRight();
};