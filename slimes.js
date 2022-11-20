class slimes {
    // Margin
    marginX = 35;
    marginY = 25;

    // Position
    x = 0; 
    y = 0;

    originX = 0;
    originY = 0;

    trueX = 0;
    trueY = 0;

    // Size
    width = 120;
    height = 120;

    trueWidth = 45;
    trueHeight = 50;

    // Stats
    health = 60;
    mass = 30; // kg
    speed = { // m/s
        max: 1.25,
        current: 0
    };

    // Animations
    animation = new Image();
    animationFrame = 0;
    frameOffset = 0;
    interval = 6;
    yOffset = 2;

    // Functions
    constructor(data) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.originX = this.x + this.width/2;
        this.originY = this.y + this.height;

        this.trueX = this.x + this.marginX;
        this.trueY = this.y + this.marginY;

        this.animation.src = "animations/slimes.png";

        this.health = data.health;
        this.mass = data.mass;
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
    };
    Move = function(frame) {
        this.ApplyForce(7); 
        this.animationFrame = Math.floor(frame/this.interval) + this.frameOffset;

        if (this.animationFrame > 7) {
            this.animationFrame -= (8 * Math.floor(this.animationFrame/8));
        }
        
        if (this.animationFrame > 3) {
            // Move Up
            if (this.originY > player.originY) {
                this.y -= this.speed.current;
            }
            // Move Down
            if (player.originY > this.originY) {
                this.y += this.speed.current;
            }
            // Move Right
            if (player.originX > this.originX) {
                this.x += this.speed.current;
            }
            // Move Left
            if (this.originX > player.originX) {
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
        ctx.drawImage(this.animation, this.animationFrame*this.width, this.yOffset*this.height, this.width, this.width, this.x, this.y, this.width, this.height);
    }
}
