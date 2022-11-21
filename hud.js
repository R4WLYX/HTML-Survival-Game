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