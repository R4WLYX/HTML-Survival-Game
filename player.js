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

    middle: 0,
    bottom: 0,

    // Size
    width: 120,
    height: 120,

    trueWidth: 50,
    trueHeight: 95,

    // Stats
    health: 160,
    mass: 60, // kg
    speed: { // m/s
        max: 7.2, 
        current: 0
    },
    score: 10000,

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

        this.middle = this.x + this.width/2;
        this.bottom = this.y + this.height - this.marginY;

        this.health = 160;
        this.score = 10000;

        this.animation.src = "animations/player.png";
    },
    Update: function(frame) {
        // Friction
        this.ApplyForce(-7.5);

        // Check if player is moving
        if (checkKey(keyPressed) && !(this.trueY < 0 || this.trueX < 0 || this.trueY + this.trueHeight > CANVAS_HEIGHT || this.trueX + this.trueWidth > CANVAS_WIDTH)) {
            this.Move(keyPressed, frame);
        } else {
            // Idle
            if (!(this.trueY < 0 || this.trueX < 0 || this.trueY + this.trueHeight > CANVAS_HEIGHT || this.trueX + this.trueWidth > CANVAS_WIDTH)) {
                this.Animate(frame, "idle");
            }

            if (this.trueY < 0) {
                this.y = 0 - this.marginY;
            }
            if (this.trueX < 0) {
                this.x = 0 - this.marginX;
            }
            if (this.trueY + this.trueHeight > CANVAS_HEIGHT) {
                this.y = CANVAS_HEIGHT - this.trueHeight - this.marginY;
            }
            if (this.trueX + this.trueWidth > CANVAS_WIDTH) {
                this.x = CANVAS_WIDTH - this.trueWidth - this.marginX;
            }
        }

        this.originX = this.x + this.width/2;
        this.originY = this.y + this.height/2;

        this.trueX = this.x + this.marginX;
        this.trueY = this.y + this.marginY;

        this.middle = this.x + this.width/2;
        this.bottom = this.y + this.height - this.marginY;

        if (this.health < 0) {
            this.health = 0;
        } else if (this.health > 160) {
            this.health = 160;
        }
    },
    Move: function(key, frame) {
        let speed;

        this.ApplyForce(20); 
        speed = this.speed.current/key.length*pxm;

        let up = key[38] || key[87];
        let down = key[40] || key[83];
        let left = key[37] || key[65];
        let right = key[39] || key[68];
        
        // Move Up
        if ((up) && !(down)) {
            if (checkOutOfBounds(this)) {this.y -= speed;}
            if ((right) && !(left)) {
                this.Animate(frame, "run-right");
            } else if ((left) && !(right)) {
                this.Animate(frame, "run-left");
            } else {
                this.Animate(frame, "running");
            }
        } else if ((up) && (down)) {
            if ((right) && !(left)) {
                this.Animate(frame, "run-right");
            } else if ((left) && !(right)) {
                this.Animate(frame, "run-left");
            } else {
                this.Animate(frame, "idle");
            }
        }

        // Move Down
        if ((down) && !(up)) {
            if (checkOutOfBounds(this)) {this.y += speed;}
            if ((right) && !(left)) {
                this.Animate(frame, "run-right");
            } else if ((left) && !(right)) {
                this.Animate(frame, "run-left");
            } else {
                this.Animate(frame, "running");
            }
        } else if ((down) && (up)) {
            if ((right) && !(left)) {
                this.Animate(frame, "run-right");
            } else if ((left) && !(right)) {
                this.Animate(frame, "run-left");
            } else {
                this.Animate(frame, "idle");
            }
        }

        // Move Right
        if ((right) && !(left)) {
            if (checkOutOfBounds(this)) {this.x += speed;}
            this.Animate(frame, "run-right");
        } else if ((right) && (left) && !(up) && !(down)) {
            this.Animate(frame, "idle")
        }

        // Move Left
        if ((left) && !(right)) {
            if (checkOutOfBounds(this)) {this.x -= speed;}
            this.Animate(frame, "run-left");
        } else if ((left) && (right) && !(up) && !(down)) {
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
                interval = 2.25;
                yOffset = 2;
                break;
            case "run-left":
                interval = 2.25;
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
    },
    Damage: function(mob) {
        if (mob.animationFrame == 7) {
            if (checkCollision(this, mob)) {
                this.health -= mob.damage;
            }
        }
    }
}

player.Init(CANVAS_WIDTH/2, CANVAS_HEIGHT/2);