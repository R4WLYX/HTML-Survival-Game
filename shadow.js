var shadow = {
    // Margin
    marginX: 35,
    marginY: 40,

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
    trueHeight: 35,

    // Sprite
    sprite: new Image(),

    Draw: function(parent) {
        ctx.globalAlpha = 0.25;
        ctx.drawImage(this.sprite, parent.middle - this.marginX - this.trueWidth/2 - this.width*0.2/2, parent.bottom - this.marginY - (this.height - this.marginY)/4, this.width*1.2, this.height);
        ctx.globalAlpha = 1;
    }
}

shadow.originX = shadow.x + shadow.width/2;
shadow.originY = shadow.y + shadow.height/2;

shadow.sprite.src = "sprites/shadow.png";