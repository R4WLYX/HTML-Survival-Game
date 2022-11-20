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

let basics = [];
let basicData = {
    health: 60,
    mass: 30,
    maxSpeed: 1.25,
    interval: 6,
    yOffset: 0
};
for (let i = 0; i < 8; i++) {
    basics[i] = new slimes(basicData);
}

let speedies = [];
let speedyData = {
    health: 40,
    mass: 27,
    maxSpeed: 1.5,
    interval: 5,
    yOffset: 1
};
for (let i = 0; i < 8; i++) {
    speedies[i] = new slimes(speedyData);
}

let grumpies = [];
let grumpyData = {
    health: 75,
    mass: 38,
    maxSpeed: 1,
    interval: 8,
    yOffset: 2
};
for (let i = 0; i < 8; i++) {
    grumpies[i] = new slimes(grumpyData);
}

function update() {
    requestAnimationFrame(update);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    player.Update(keyPressed, frame);

    for (let i = 0; i < basics.length; i++) {
        basics[i].Update(frame);
    }
    for (let i = 0; i < speedies.length; i++) {
        speedies[i].Update(frame);
    }
    for (let i = 0; i < grumpies.length; i++) {
        grumpies[i].Update(frame);
    }

    frame++;
}

update()
