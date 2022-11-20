class slimes {
    // Margin
    marginX = 35;
    marginY = 25;

    // Position
    x = 0; 
    y = 0;
    zIndex = 1;

    originX = 0;
    originY = 0;

    trueX = 0;
    trueY = 0;

    middle = 0;
    bottom = 0;

    // Size
    width = 120;
    height = 120;

    trueWidth = 45;
    trueHeight = 50;

    // Stats
    health = 60;
    damage = 7;
    mass = 30; // kg
    speed = { // m/s
        max: 1.25,
        current: 0
    };

    // Player tracker
    tracker = {
        x: 0,
        y: 0
    };
    counter = 0;

    // Animations
    animation = new Image();
    animationFrame = 0;
    frameOffset = 0;
    interval = 6;
    yOffset = 2;

    // Functions
    constructor(data) {
        this.x = Math.random()*CANVAS_WIDTH - this.marginX - 160;
        this.y = Math.random()*CANVAS_HEIGHT - this.marginY - 160;

        if ((this.x > CANVAS_WIDTH/2) - 240 || (this.x < CANVAS_WIDTH/2 + 240)) {
            this.x = Math.random()*CANVAS_WIDTH*2 - this.marginX - 160;
            this.y = Math.random()*CANVAS_HEIGHT*2 - this.marginY - 160;
        }

        this.originX = this.x + this.width/2;
        this.originY = this.y + this.height;

        this.trueX = this.x + this.marginX;
        this.trueY = this.y + this.marginY;

        this.middle = this.x + this.width/2 - 2;
        this.bottom = this.y + this.height - this.marginY - 8;

        this.tracker.x = player.middle + (Math.random()*10 - 5);
        this.tracker.y = player.trueY + player.height/2 + player.trueHeight/2 + (Math.random()*10 - 5);
        this.counter = Math.floor(Math.random()*4 - 1);

        this.animation.src = "animations/slimes.png";

        this.health = data.health;
        this.damage = data.damage;
        this.mass = data.mass + (Math.random() - 0.5)*1.25;
        this.speed.max = data.maxSpeed;
        this.frameOffset = Math.floor(Math.random()*7);
        this.interval = data.interval;
        this.yOffset = data.yOffset;
    };
    Update = function(frame) {
        // Friction
        this.ApplyForce(-2.5);
        
        // Move mob
        this.Move(frame);

        this.originX = this.x + this.width/2;
        this.originY = this.y + this.height/2;

        this.trueX = this.x + this.marginX;
        this.trueY = this.y + this.marginY;

        this.middle = this.x + this.width/2 - 2;
        this.bottom = this.y + this.height - this.marginY - 8;
    };
    Move = function(frame) {
        

        this.ApplyForce(7); 
        this.animationFrame = Math.floor(frame/this.interval) + this.frameOffset;

        if (this.animationFrame > 7) {
            this.animationFrame -= (8 * Math.floor(this.animationFrame/8));
            this.counter++;
            if (this.counter == 4) {
                this.tracker.x = player.middle + (Math.random()*10 - 5);
                this.tracker.y = player.trueY + player.height/2 + player.trueHeight/2 + (Math.random()*10 - 5);
    
                this.counter = 0;
            }
        }
        
        if (this.animationFrame > 3) {
            // Move Up
            if (this.originY > this.tracker.y) {
                this.y -= this.speed.current;
            }
            // Move Down
            if (this.tracker.y > this.originY) {
                this.y += this.speed.current;
            }
            // Move Right
            if (this.tracker.x > this.originX) {
                this.x += this.speed.current;
            }
            // Move Left
            if (this.originX > this.tracker.x) {
                this.x -= this.speed.current;
            }
        }

        this.Animate();
    };
    ApplyForce = function(force) {
        this.speed.current += force/this.mass;
        if (this.speed.current >= this.speed.max) {
            this.speed.current = this.speed.max;
        }
        if (this.speed.current < 0) {
            this.speed.current = 0;
        }
    };
    Animate = function() {
        ctx.globalAlpha = 0.95;
        ctx.drawImage(this.animation, this.animationFrame*this.width, this.yOffset*this.height, this.width, this.width, this.x, this.y, this.width, this.height);
        ctx.globalAlpha = 1;
    }
}
