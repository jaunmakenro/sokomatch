"use strict";

var main = function() {}
var map
var propsmap
var score = 0
var moves = 0

main.prototype = {
    init: function() {},

    preload: function() {},

    create: function() {
        //handle background
        //game.stage.backgroundColor = '#000000';
        this.back = game.add.sprite(0, 0, 'starField', 1)
        this.back.width = this.game.width
        this.back.height = this.game.height

        this.score = game.add.text(50, 50, "00000", styles.score)

        //create map
        console.log("start")
        map = new Map(7, 6)

        propsmap = new propsMap(7, 6)

        propsmap.add(3, 1, 0)
        propsmap.add(4, 2, 0)

        //create player
        this.player = new Player(2, 1);

        //input keys
        this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.upKey.onUp.add(function() { this.player.moveToDir("up"); }, this);

        this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        this.downKey.onUp.add(function() { this.player.moveToDir("down"); }, this);
        // this.downKey.onUp.add(this.player.moveToDir, "down");

        this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.leftKey.onUp.add(function() { this.player.moveToDir("left"); }, this);

        this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.rightKey.onUp.add(function() { this.player.moveToDir("right"); }, this);

        //show arrow buttons
        var arrowZoneHeight = this.game.height / 3
        this.down = game.add.sprite(this.game.width / 2, 0, 'DownArrow', 1)
        this.down.anchor.set(0.5)
        this.down.height = arrowZoneHeight / 2 - 5
        this.down.width = this.back.width / 3
        this.down.y = this.game.height - this.down.height / 2 - 5
        this.down.inputEnabled = true;
        this.down.events.onInputDown.add(function() { this.player.moveToDir("down"); }, this);

        this.up = game.add.sprite(this.game.width / 2, 0, 'UpArrow', 1)
        this.up.anchor.set(0.5)
        this.up.height = arrowZoneHeight / 2 - 5
        this.up.width = this.back.width / 3
        this.up.y = this.game.height - this.down.height * 1.5 - 5
        this.up.inputEnabled = true;
        this.up.events.onInputDown.add(function() { this.player.moveToDir("up"); }, this);

        this.left = game.add.sprite(0, this.game.height - arrowZoneHeight / 2, 'LeftArrow', 1)
        this.left.anchor.set(0.5)
        this.left.height = arrowZoneHeight / 2
        this.left.width = this.back.width / 3
        this.left.x = this.down.width / 2 + 50
        this.left.inputEnabled = true;
        this.left.events.onInputDown.add(function() { this.player.moveToDir("left"); }, this);

        this.right = game.add.sprite(0, this.game.height - arrowZoneHeight / 2, 'RightArrow', 1)
        this.right.anchor.set(0.5)
        this.right.height = arrowZoneHeight / 2
        this.right.width = this.back.width / 3
        this.right.x = this.game.width - (this.down.width / 2 + 50)
        this.right.inputEnabled = true;
        this.right.events.onInputDown.add(function() { this.player.moveToDir("right"); }, this);
    },

    update: function() {
        this.score.text = score
    },
};