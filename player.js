var player = {
    // Margin
    marginX: 35,
    marginY: 15,

    // Position
    x: 0, 
    y: 0,

    originX: 0,
    originY: 0,

    trueX: 0,
    trueY: 0,

    // Size
    width: 120,
    height: 120,

    trueWidth: 50,
    trueHeight: 95,

    // Stats
    health: 160,
    mass: 60, // kg
    speed: { // m/s
        max: 5.5, 
        current: 0
    },

    // Animations
    animation: new Image(),

    // Functions
    Init: function(x, y) {
        this.x = x - this.width/2;
        this.y = y - this.height/2;

        this.originX = this.x + this.width/2;
        this.originY = this.y + this.height;

        this.trueX = this.x + this.marginX;
        this.trueY = this.y + this.marginY;

        this.animation.src = "animations/player.png";
    },
    Update: function(key, frame) {
        // Friction
        player.ApplyForce(-7.5);

        // Check if player is moving
        if (checkKey(key)) {
            player.Move(key, frame);
        } else {
            // Idle
            player.Animate(frame, "idle");
        }

        this.originX = this.x + this.width/2;
        this.originY = this.y + this.height/2;

        this.trueX = this.x + this.marginX;
        this.trueY = this.y + this.marginY;
    },
    Move: function(key, frame) {
        let speed;

        this.ApplyForce(20); 
        speed = this.speed.current/key.length*pxm;
        
        // Move Up
        if ((key[38] || key[87]) && !(key[40] || key[83])) {
            this.y -= speed;
            
            if ((key[39] || key[68]) && !(key[37] || key[65])) {
                this.Animate(frame, "run-right");
            } else if ((key[37] || key[65]) && !(key[39] || key[68])) {
                this.Animate(frame, "run-left");
            } else {
                this.Animate(frame, "running");
            }
        } else if ((key[38] || key[87]) && (key[40] || key[83])) {
            if ((key[39] || key[68]) && !(key[37] || key[65])) {
                this.Animate(frame, "run-right");
            } else if ((key[37] || key[65]) && !(key[39] || key[68])) {
                this.Animate(frame, "run-left");
            } else {
                this.Animate(frame, "idle");
            }
        }

        // Move Down
        if ((key[40] || key[83]) && !(key[38] || key[87])) {
            this.y += speed;
            
            if ((key[39] || key[68]) && !(key[37] || key[65])) {
                this.Animate(frame, "run-right");
            } else if ((key[37] || key[65]) && !(key[39] || key[68])) {
                this.Animate(frame, "run-left");
            } else {
                this.Animate(frame, "running");
            }
        } else if ((key[40] || key[83]) && (key[38] || key[87])) {
            if ((key[39] || key[68]) && !(key[37] || key[65])) {
                this.Animate(frame, "run-right");
            } else if ((key[37] || key[65]) && !(key[39] || key[68])) {
                this.Animate(frame, "run-left");
            } else {
                this.Animate(frame, "idle");
            }
        }

        // Move Right
        if ((key[39] || key[68]) && !(key[37] || key[65])) {
            this.x += speed;
            this.Animate(frame, "run-right");

        } else if ((key[39] || key[68]) && (key[37] || key[65]) && !(key[38] || key[87]) && !(key[40] || key[83])) {
            this.Animate(frame, "idle")
        }

        // Move Left
        if ((key[37] || key[65]) && !(key[39] || key[68])) {
            this.x -= speed;
            this.Animate(frame, "run-left");

        } else if ((key[37] || key[65]) && (key[39] || key[68]) && !(key[38] || key[87]) && !(key[40] || key[83])) {
            this.Animate(frame, "idle")
        }
    },
    ApplyForce: function(force) {
        this.speed.current += force/this.mass;
        if (this.speed.current >= this.speed.max) {
            this.speed.current = this.speed.max;
        }
        if (this.speed.current < 0) {
            this.speed.current = 0;
        }
    },
    Animate: function(frame, type) {
        let animationFrame = 0;
        let interval = 2;
        let yOffset = 0;

        switch (type) {
            case "idle":
                interval = 16;
                yOffset = 0;
                break;
            case "running":
                interval = 2;
                yOffset = 1;
                break;
            case "run-right":
                interval = 2.5;
                yOffset = 2;
                break;
            case "run-left":
                interval = 2.5;
                yOffset = 3;
                break;
            default:
                interval = 16;
                yOffset = 0;
                break;
        }

        animationFrame = Math.floor(frame/interval);

        if (animationFrame > 5) {
            animationFrame -= (6 * Math.floor(animationFrame/6));
        }

        ctx.drawImage(this.animation, animationFrame*this.width, yOffset*this.height, this.width, this.width, this.x, this.y, this.width, this.height);
    }
}

let CANVAS_WIDTH = 1000;
let CANVAS_HEIGHT = 500;

player.Init(CANVAS_WIDTH/2, CANVAS_HEIGHT/2);
