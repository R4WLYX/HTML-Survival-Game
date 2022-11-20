var hud = {
    health_bar: {
        marginX: 5,
        marginY: 5,
        
        width: 292,
        height: 72,

        sprite: new Image(),

        Load: function(state) {
            this.sprite.src = "hud/health_bar.png";
            ctx.drawImage(this.sprite, state*365, 0, 365, 90, this.marginX, this.marginY, this.width, this.height);
        }
    },
    death_screen: {
        marginX: CANVAS_WIDTH/2 - 296/2,
        marginY: CANVAS_HEIGHT/2 - 56/2,
        
        width: 296,
        height: 56,

        sprite: new Image(),

        Load: function() {
            this.sprite.src = "hud/death_screen.png";
            ctx.drawImage(this.sprite, this.marginX, this.marginY, this.width, this.height);
        }
    }
}