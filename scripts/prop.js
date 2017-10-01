"use strict";

var prop = function(x, y, kind) {
    this.x = x;
    this.y = y;
    //create sprite
    this.sprite = game.add.sprite(map.fromMapXToPix(this.x, 0.5), -100, 'props', 1)
    this.sprite.anchor.set(0.5)
    this.sprite.frame = kind
    this.sprite.height = map.tilesize
    this.sprite.width = map.tilesize
    game.add.tween(this.sprite).to({ x: map.fromMapXToPix(this.x, 0.5), y: map.fromMapYToPix(this.y, 0.5) }, 1000, Phaser.Easing.Bounce.Out, true);


    //create animations
    this.movementDuration = 200
}

// move prop, if hole -> fall

prop.prototype.moveTo = function(x, y) {
    this.x = x
    this.y = y
    var tween = game.add.tween(this.sprite).to({ x: map.fromMapXToPix(this.x, 0.5), y: map.fromMapYToPix(this.y, 0.5) }, this.movementDuration, Phaser.Easing.Default, true);
    if (!map.isWalkable(x, y)) {
        // debugger
        tween.onComplete.add(this.fall, this);
    }

}

//fall dawn
prop.prototype.fall = function() {
    var tween = game.add.tween(this.sprite.scale).to({ x: 0, y: 0 }, 1000, Phaser.Easing.Default, true);
    game.add.tween(this.sprite).to({ angle: 700 }, 1000, Phaser.Easing.Default, true);
    tween.onComplete.add(this.destroy, this);
}

//check if destination cell is walkable then move
prop.prototype.destroy = function() {
    this.sprite.destroy()
    delete this
}

prop.prototype.goToAndDestroy = function(destX, destY) {
    //function destroyprop() {
    // console.log("let's remove " + propCoord.x + " " + propCoord.y)
    //    propsmap.destroy()
    //movedProp.sprite.frame = propType + 1
    //}
    //tween to result, then destroy
    var tween = game.add.tween(this.sprite).to({ x: map.fromMapXToPix(destX, 0.5), y: map.fromMapYToPix(destY, 0.5) }, 200, Phaser.Easing.Default, true);

    tween.onComplete.add(this.destroy, this);
}