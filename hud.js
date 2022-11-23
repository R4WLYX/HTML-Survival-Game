var hud = {
    health_bar: {
        marginX: 5,
        marginY: 5,
        
        width: 292,
        height: 72,

        sprite: new Image(),

        Load: function(_health) {
            let health = _health;
            this.sprite.src = "hud/health_bar.png";
            if (health == 0) {
                ctx.drawImage(this.sprite, 0*365, 0, 365, 90, this.marginX, this.marginY, this.width, this.height);
            } else {
                health = Math.floor((health+9)/10);
                ctx.drawImage(this.sprite, health*365, 0, 365, 90, this.marginX, this.marginY, this.width, this.height);
            }
        }
    },
    score: {
        marginX: 5,
        marginY: 5,
        
        width: 145,
        height: 35,

        sprite: new Image(),
        
        digits: {
            marginX: -5,

            width: 25,
            height: 35,

            sprite: new Image(),
        },

        Init: function() {
            this.marginX = CANVAS_WIDTH - this.width - this.marginX - this.digits.marginX*4 - 27*4;
        },

        Load: function(score) {
            // Score:
            this.sprite.src = "hud/score.png";

            ctx.drawImage(this.sprite, this.marginX, this.marginY, this.width, this.height);

            // Digits
            this.digits.sprite.src = "hud/digits.png";

            ctx.drawImage(this.digits.sprite, Number(String(score)[1])*this.digits.width, 0, this.digits.width, this.digits.height, this.marginX + this.width + this.digits.marginX*2, this.marginY, 25, 35);
            ctx.drawImage(this.digits.sprite, Number(String(score)[2])*this.digits.width, 0, this.digits.width, this.digits.height, this.marginX + this.width + this.digits.marginX*3 + this.digits.width, this.marginY, 25, 35);
            ctx.drawImage(this.digits.sprite, Number(String(score)[3])*this.digits.width, 0, this.digits.width, this.digits.height, this.marginX + this.width + this.digits.marginX*4 + this.digits.width*2, this.marginY, 25, 35);
            ctx.drawImage(this.digits.sprite, Number(String(score)[3])*this.digits.width, 0, this.digits.width, this.digits.height, this.marginX + this.width + this.digits.marginX*5 + this.digits.width*3, this.marginY, 25, 35);
        }
    },
    death_screen: {
        marginX: CANVAS_WIDTH/2 - 296/2,
        marginY: CANVAS_HEIGHT/2 - 56/2,
        
        width: 296,
        height: 56,

        sprite: new Image(),

        Load: function() {
            this.marginX = CANVAS_WIDTH/2 - 296/2;
            this.marginY = CANVAS_HEIGHT/2 - 56/2;
            this.sprite.src = "hud/death_screen.png";

            ctx.drawImage(this.sprite, this.marginX, this.marginY, this.width, this.height);
        }
    }
}