document.body.style.margin = "0";
document.body.style.overflow = "hidden";
var cnvs = document.createElement("canvas");
cnvs.width = CANVAS_WIDTH;
cnvs.height = CANVAS_HEIGHT;
cnvs.style.padding = "0";
cnvs.style.background = "black";
cnvs.style.alignSelf = "center";
cnvs.style.justifySelf = "center";
var ctx = cnvs.getContext("2d")
document.body.appendChild(cnvs);

let keyPressed = [];
let frame = 1;
let mainLoop = null;

let nextWave = false;
let wave = 0;

let entities = [];

let basics = [];
let basicCount = 3;
let basicData = {
    health: 60,
    damage: 1,
    mass: 30,
    maxSpeed: 1.75,
    interval: 6,
    yOffset: 0
};

let speedies = [];
let speedyCount = 1;
let speedyData = {
    health: 40,
    damage: 0.5,
    mass: 27,
    maxSpeed: 2.2,
    interval: 5,
    yOffset: 1
};

let grumpies = [];
let grumpyCount = 2;
let grumpyData = {
    health: 75,
    damage: 1.4,
    mass: 38,
    maxSpeed: 1.2,
    interval: 8,
    yOffset: 2
};

addEventListener("keydown", (e) => {
    keyPressed[e.keyCode] = true;
});
addEventListener("keyup", (e) => {
    keyPressed[e.keyCode] = false;
});

function start() {
    hud.death_screen.Load();
    hud.score.Init()
    cnvs.style.background = "grey";

    frame = 1;

    basicCount = 3;
    speedyCount = 1;
    grumpyCount = 2;

    for (let i = 0; i < basicCount; i++) {
        basics[i] = new slimes(basicData);
    }
    for (let i = 0; i < speedyCount; i++) {
        speedies[i] = new slimes(speedyData);
    }
    for (let i = 0; i < grumpyCount; i++) {
        grumpies[i] = new slimes(grumpyData);
    }

    entities = [];

    entities.push(player);
    for (let i = 0; i < basics.length; i++) {
        entities.push(basics[i]);
    }
    for (let i = 0; i < speedies.length; i++) {
        entities.push(speedies[i]);
    }
    for (let i = 0; i < grumpies.length; i++) {
        entities.push(grumpies[i]);
    }

    entities.sort(function(a, b){return (a.bottom - 20) - (b.bottom - 20)});

    update();
}

function reset(state) {
    if (mainLoop) {
        cancelAnimationFrame(mainLoop);
    }

    switch (state) {
        case "death":
            // Load death screen
            ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
            cnvs.style.background = "black";
            hud.death_screen.Load();
            hud.score.Init()

            // Reset game after 1.5 seconds
            setTimeout(() => {
                basics = []
                basicCount = 3;
                speedies = []
                speedyCount = 1;
                grumpies = []
                grumpyCount = 2;
                player.Init(CANVAS_WIDTH/2, CANVAS_HEIGHT/2);
                start();
            }, 1500);
            break;
        case "next_wave":
            // Load next wave screen
            ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
            cnvs.style.background = "black";
            hud.score.Init()

            // Add slimes
            if (wave % 4 == 0) { basics.push(new slimes(basicData)); basicCount++; }
            if (wave % 7 == 0) { basics.push(new slimes(speedyData)); speedyCount++; }
            if (wave % 6 == 0) { basics.push(new slimes(grumpyData)); grumpyCount++; }

            // Heal Player
            player.health += 2.5;

            // Add score
            player.score += 1.5 + Math.floor(player.health/100 + 0.5) * (1.5 + wave/50);

            // Reset game after 1.5 seconds
            setTimeout(() => {
                player.x = CANVAS_WIDTH/2; 
                player.y = CANVAS_HEIGHT/2;
                start();
            }, 1500);
            break;     
        default:
            break;
    }
}

function update() {
    cnvs.width = CANVAS_WIDTH = window.innerWidth;
    cnvs.height = CANVAS_HEIGHT = window.innerHeight;

    mainLoop = requestAnimationFrame(update);
    ctx.clearRect(0, 0, cnvs.width, cnvs.height);

    // Render shadows
    shadow.Draw(player);

    for (let i = 0; i < basics.length; i++) {
        shadow.Draw(basics[i]);
    }
    for (let i = 0; i < speedies.length; i++) {
        shadow.Draw(speedies[i]);
    }
    for (let i = 0; i < grumpies.length; i++) {
        shadow.Draw(grumpies[i]);
    } 

    // Render Entites
    for (let i = 0; i < entities.length; i++) {
        entities[i].Update(frame);
    }
    entities.sort(function(a, b){return (a.bottom - 20) - (b.bottom - 20)});
    
    // Render HUD
    hud.health_bar.Load(player.health);
    hud.score.Load(player.score);

    // Check if player died
    if (player.health <= 0) {
        reset("death");
    }

    // New wave
    nextWave = frame % 800 == 0? true : false;
    if (nextWave) {
        frame++;
        wave++;
        reset("next_wave");
        nextWave = false;
    }

    frame++;
}

start();