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

let basics = [];
let basicData = {
    health: 60,
    damage: 1,
    mass: 30,
    maxSpeed: 1.75,
    interval: 6,
    yOffset: 0
};

let speedies = [];
let speedyData = {
    health: 40,
    damage: 0.5,
    mass: 27,
    maxSpeed: 2.2,
    interval: 5,
    yOffset: 1
};

let grumpies = [];
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
    cnvs.style.background = "grey";

    frame = 1;

    for (let i = 0; i < 3; i++) {
        basics[i] = new slimes(basicData);
    }
    for (let i = 0; i < 2; i++) {
        speedies[i] = new slimes(speedyData);
    }
    for (let i = 0; i < 2; i++) {
        grumpies[i] = new slimes(grumpyData);
    }

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

            // Reset game after 1.5 seconds
            setTimeout(() => {
                player.Init(CANVAS_WIDTH/2, CANVAS_HEIGHT/2);
                start();
            }, 1500);
            break;
        case "new_wave":
            // Load next wave screen
            
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

    // Render player
    player.Update(keyPressed, frame);

    // Render entities
    for (let i = 0; i < basics.length; i++) {
        basics[i].Update(frame);
        player.Damage(basics[i]);
    }
    for (let i = 0; i < speedies.length; i++) {
        speedies[i].Update(frame);
        player.Damage(speedies[i]);
    }
    for (let i = 0; i < grumpies.length; i++) {
        grumpies[i].Update(frame);
        player.Damage(grumpies[i]);
    }

    // Render HUD
    hud.health_bar.Load(Math.floor(player.health/10));

    // Check if player died
    if (player.health <= 0) {
        reset("death");
    }

    // New wave
    // nextWave = frame % 800 == 0? true : false;
    // if (nextWave) {
    //     wave++;

    //     player.health += 15.5;

    //     for (let i = 0; i < basics.length + Math.floor(wave/3); i++) {
    //         basics[i] = new slimes(basicData);
    //     }
    //     for (let i = 0; i < speedies.length + Math.floor(wave/7); i++) {
    //         speedies[i] = new slimes(speedyData);
    //     }
    //     for (let i = 0; i < grumpies.length + Math.floor(wave/5); i++) {
    //         grumpies[i] = new slimes(grumpyData);
    //     }

    //     nextWave = false;
    // }

    frame++;
}

start();