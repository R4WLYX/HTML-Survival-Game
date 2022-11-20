var canvas = document.createElement("canvas");
canvas.width = 1000;
canvas.height = 500;
canvas.style.background = "grey";
var ctx = canvas.getContext("2d");
document.body.appendChild(canvas);

var pxm = 50;

let keyPressed = [];
let frame = 0;

addEventListener("keydown", (e) => {
    keyPressed[e.keyCode] = true;
});
addEventListener("keyup", (e) => {
    keyPressed[e.keyCode] = false;
}); 

// let basic = slimes;
// basic.Init({
//     health: 60,
//     mass: 30,
//     maxSpeed: 1.25,
//     interval: 6,
//     yOffset: 0
// });

// let speedy = slimes;
// speedy.Init({
//     health: 40,
//     mass: 27,
//     maxSpeed: 1.5,
//     interval: 5,
//     yOffset: 1
// });

// let grumpy = slimes;
// grumpy.Init({
//     health: 75,
//     mass: 38,
//     maxSpeed: 1,
//     interval: 6,
//     yOffset: 2
// });

function update() {
    requestAnimationFrame(update);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    player.Update(keyPressed, frame);
    basic.Update(frame);
    speedy.Update(frame);
    grumpy.Update(frame);

    frame++;
}

update()