var slimes = {
    // Margin
    marginX: 35,
    marginY: 25,

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

    trueWidth: 45,
    trueHeight: 50,

    // Stats
    health: 60,
    mass: 30, // kg
    speed: { // m/s
        max: 1.25, 
        current: 0
    },

    // Animations
    animation: new Image(),
    interval: 6,
    yOffset: 2,

    // Functions
    Init: function({health, mass, maxSpeed, interval, yOffset}) {
        this.originX = this.x + this.width/2;
        this.originY = this.y + this.height;

        this.trueX = this.x + this.marginX;
        this.trueY = this.y + this.marginY;

        this.animation.src = "animations/slimes.png";

        this.health = health;
        this.mass = mass;
        this.speed.max = maxSpeed;
        this.interval = interval;
        this.yOffset = yOffset;
    },
    Update: function(frame) {
        // Friction
        this.ApplyForce(-2.5);
        
        // Move mob
        this.Move(frame);

        this.originX = this.x + this.width/2;
        this.originY = this.y + this.height/2;

        this.trueX = this.x + this.marginX;
        this.trueY = this.y + this.marginY;
    },
    Move: function(frame) {
        let speed;
        let animationFrame;

        this.ApplyForce(7); 
        speed = this.speed.current;
        animationFrame = Math.floor(frame/this.interval);

        if (animationFrame > 7) {
            animationFrame -= (8 * Math.floor(animationFrame/8));
        }
        
        if (animationFrame > 2) {
            // Move Up
            if (this.originY > player.originY) {
                this.y -= speed;
            }
            // Move Down
            if (player.originY > this.originY) {
                this.y += speed;
            }
            // Move Right
            if (player.originX > this.originX) {
                this.x += speed;
            }
            // Move Left
            if (this.originX > player.originX) {
                this.x -= speed;
            }
        }

        this.Animate(frame);
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
    Animate: function(frame) {
        let animationFrame = 0;

        animationFrame = Math.floor(frame/this.interval);

        if (animationFrame > 7) {
            animationFrame -= (8 * Math.floor(animationFrame/8));
        }

        ctx.drawImage(this.animation, animationFrame*this.width, this.yOffset*this.height, this.width, this.width, this.x, this.y, this.width, this.height);
    }
}

// class slimes {
//     // Margin
//     marginX = 35;
//     marginY = 25;

//     // Position
//     x = 0; 
//     y = 0;

//     originX = 0;
//     originY = 0;

//     trueX = 0;
//     trueY = 0;

//     // Size
//     width = 120;
//     height = 120;

//     trueWidth = 45;
//     trueHeight = 50;

//     // Stats
//     health = 60;
//     mass = 30; // kg
//     speed = { // m/s
//         max: 1.25, 
//         current: 0
//     };

//     // Animations
//     animation = new Image();
//     interval = 6;
//     yOffset = 2;

//     // Functions
//     Init = function({health, mass, maxSpeed, interval, yOffset}) {
//         this.originX = this.x + this.width/2;
//         this.originY = this.y + this.height;

//         this.trueX = this.x + this.marginX;
//         this.trueY = this.y + this.marginY;

//         this.animation.src = "animations/slimes.png";

//         this.health = health;
//         this.mass = mass;
//         this.speed.max = maxSpeed;
//         this.interval = interval;
//         this.yOffset = yOffset;
//     };
//     Update = function(frame) {
//         // Friction
//         this.ApplyForce(-2.5);
        
//         // Move mob
//         this.Move(frame);

//         this.originX = this.x + this.width/2;
//         this.originY = this.y + this.height/2;

//         this.trueX = this.x + this.marginX;
//         this.trueY = this.y + this.marginY;
//     };
//     Move = function(frame) {
//         let speed;
//         let animationFrame;

//         this.ApplyForce(7); 
//         speed = this.speed.current;
//         animationFrame = Math.floor(frame/this.interval);

//         if (animationFrame > 7) {
//             animationFrame -= (8 * Math.floor(animationFrame/8));
//         }
        
//         if (animationFrame > 2) {
//             // Move Up
//             if (this.originY > player.originY) {
//                 this.y -= speed;
//             }
//             // Move Down
//             if (player.originY > this.originY) {
//                 this.y += speed;
//             }
//             // Move Right
//             if (player.originX > this.originX) {
//                 this.x += speed;
//             }
//             // Move Left
//             if (this.originX > player.originX) {
//                 this.x -= speed;
//             }
//         }

//         this.Animate(frame);
//     };
//     ApplyForce = function(force) {
//         this.speed.current += force/this.mass;
//         if (this.speed.current >= this.speed.max) {
//             this.speed.current = this.speed.max;
//         }
//         if (this.speed.current < 0) {
//             this.speed.current = 0;
//         }
//     };
//     Animate = function(frame) {
//         let animationFrame = 0;

//         animationFrame = Math.floor(frame/this.interval);

//         if (animationFrame > 7) {
//             animationFrame -= (8 * Math.floor(animationFrame/8));
//         }

//         ctx.drawImage(this.animation, animationFrame*this.width, this.yOffset*this.height, this.width, this.width, this.x, this.y, this.width, this.height);
//     }
// }