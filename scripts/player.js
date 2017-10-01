"use strict";

var Player = function(x, y) {
    this.x = x;
    this.y = y;
    //create sprite
    this.sprite = game.add.sprite(map.fromMapXToPix(this.x), map.fromMapYToPix(this.y), 'pinguin', 1)
    this.sprite.height = map.tilesize
    this.sprite.width = map.tilesize
        //create animations
    this.framerate = 40
    this.movementDuration = 200

    this.sprite.animations.add('walkFront', [0, 1, 2, 3, 4, 5, 6, 7], this.framerate, false)
    this.sprite.animations.play('walkFront');

    this.sprite.animations.add('walkRight', [16, 17, 18, 19, 20, 21, 22, 23], this.framerate, false)
    this.sprite.animations.add('walkBack', [32, 33, 34, 35, 36, 37, 38, 39], this.framerate, false)
    this.sprite.animations.add('walkLeft', [48, 49, 50, 51, 52, 53, 54, 55], this.framerate, false)
}

//check if destination cell is walkable then move
Player.prototype.moveToDir = function(dir) {
    var newX = this.x
    var newY = this.y;
    switch (dir) {
        case "down":
            newY++;
            break;
        case "up":
            newY--;
            break;
        case "left":
            newX--;
            break;
        case "right":
            newX++;
            break;

        default:
            break;
    }
    // debugger;
    if (map.isWalkable(newX, newY)) {
        if (!game.tweens.isTweening(this.sprite)) {
            if (propsmap.isWalkable(newX, newY)) {
                console.log("go " + dir)
                switch (dir) {
                    case "down":
                        this.y++;
                        game.add.tween(this.sprite).to({ y: map.fromMapYToPix(this.y) }, this.movementDuration, Phaser.Easing.Default, true);
                        this.sprite.animations.play('walkFront');
                        break;
                    case "up":
                        this.y--;
                        game.add.tween(this.sprite).to({ y: map.fromMapYToPix(this.y) }, this.movementDuration, Phaser.Easing.Default, true);
                        this.sprite.animations.play('walkBack');
                        break;
                    case "left":
                        this.x--;
                        game.add.tween(this.sprite).to({ x: map.fromMapXToPix(this.x) }, this.movementDuration, Phaser.Easing.Default, true);
                        this.sprite.animations.play('walkLeft');
                        break;
                    case "right":
                        this.x++;
                        game.add.tween(this.sprite).to({ x: map.fromMapXToPix(this.x) }, this.movementDuration, Phaser.Easing.Default, true);
                        this.sprite.animations.play('walkRight');
                        break;

                    default:
                        break;
                }
                moves++
            } else {
                propsmap.tryPushTo(newX, newY, newX - this.x, newY - this.y)
            }
        }
    }

    propsmap.handleShadowAndSpawn()
}