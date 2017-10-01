"use strict";

var Map = function(width, height) {
    this.width = width
    this.height = height

    //with walls
    // this.tiles = [
    //     ["0", "2", "2", "2", "2", "2", "2", "2", "2", "2", "2", "1"],
    //     ["13", "", "", "", "", "", "", "", "", "", "", "3"],
    //     ["13", "", "", "", "", "", "", "", "", "", "", "3"],
    //     ["13", "", "", "", "", "", "", "", "", "", "", "3"],
    //     ["13", "", "", "", "", "", "", "", "", "", "", "3"],
    //     ["13", "", "", "", "", "", "", "", "", "", "", "3"],
    //     ["13", "", "", "", "", "", "", "", "", "", "", "3"],
    //     ["13", "", "", "", "", "", "", "", "", "", "", "3"],
    //     ["10", "12", "12", "12", "12", "12", "12", "12", "12", "12", "12", "11"]
    // ]
    // var upT = 9
    // var downT = 8
    // var leftT = 9
    // var rightT = 9
    // var floorT = 0 //20 avec walls
    //     //todo add corners
    // this.data = [
    //     [upT, upT, upT, upT, upT, upT, upT, upT, upT, upT, upT, upT],
    //     [upT, "", "", "", "", "", "", "", "", "", "", upT],
    //     [upT, "", "", "", "", "", "", "", "", "", "", upT],
    //     [upT, "", "", "", "", "", "", "", "", "", "", upT],
    //     [upT, "", "", "", "", "", "", "", "", "", "", upT],
    //     [upT, "", "", "", "", "", "", "", "", "", "", upT],
    //     [upT, "", "", "", "", "", "", "", "", "", "", upT],
    //     [upT, "", "", "", "", "", "", "", "", "", "", upT],
    //     [leftT, downT, downT, downT, downT, downT, downT, downT, downT, downT, downT, rightT]
    // ]

    // DRAW background MAP USING buildin tilemap
    //  Creates a blank tilemap
    //this.tilemap = game.add.tilemap();
    //  Add a Tileset image to the map
    //this.tilemap.addTilesetImage('walls', 'walls', 64, 64);
    //this.tilemap.addTilesetImage('tiles', 'tiles', 64, 64);
    //this.tilemap.scale = 0.5

    //  Creates a new blank layer and sets the map dimensions.
    //  In this case the map is 10x10 tiles in size and the tiles are 16x16 pixels in size.
    //this.layer1 = this.tilemap.create('level1', 12, 9, 64, 64);
    // //  Resize the world

    //this.layer1.scale = 0.5
    //this.layer1.resizeWorld();

    //fill the map 
    // for (var x = 0; x < this.width; x++) {
    //     for (var y = 0; y < this.height; y++) {
    //         var tileToDraw = this.getTileAt(x, y)
    //         if (tileToDraw == "") {
    //             this.tilemap.putTile(floorT, x, y, this.layer1);
    //         } else {
    //             this.tilemap.putTile(tileToDraw, x, y, this.layer1);
    //         }

    //     }
    // }

    //create data
    this.data = []
    this.tiles = []
    for (var y = 0; y < this.height; y++) {
        this.data.push([]);
        this.tiles.push([]);
        for (var x = 0; x < this.width; x++) {
            this.tiles[y].push(null)
            if (x === 0 || y === 0 || x === this.width - 1 || y === this.height - 1) {
                this.data[y].push(" ")
            } else {
                this.data[y].push("_")
            }
        }

    }

    // debugger;
    //define margin and scale for responsiveness
    var playAreaHeight = game.height * (2 / 3)
    var tileWidth = game.width / (this.width)
    var tileHeight = playAreaHeight / (this.height)
    this.tilesize = Math.min(tileWidth, tileHeight)
    this.horyOffset = (game.width - this.width * this.tilesize) / 2
    this.vertOffset = (playAreaHeight - this.height * this.tilesize) / 2

    //homemade tilemap
    //fill the map
    // debugger;

    for (var x = 0; x < this.width; x++) {

        for (var y = 0; y < this.height; y++) {
            //create sprite
            var value = this.getTileAt(x, y)
            var tileToDraw = game.add.sprite(this.fromMapXToPix(x), -100, 'tiles', 0)
            tileToDraw.width = this.tilesize
            tileToDraw.height = this.tilesize
                // tileToDraw.anchor.set(0.5)
            game.add.tween(tileToDraw).to({ x: this.fromMapXToPix(x), y: this.fromMapYToPix(y) }, game.rnd.integerInRange(100, 2000), Phaser.Easing.Elastic.Out, true);

            //change sprite fro the last row
            if (value === " ") {
                // debugger
                if (y === this.height - 1 & (x != this.width - 1 & x != 0)) {
                    tileToDraw.frame = 8;
                } else {
                    tileToDraw.frame = 10;
                }
            }
            this.tiles[y][x] = (tileToDraw)
        }
    }
};

//convert map coordinate to pixel value
Map.prototype.fromMapXToPix = function(x, anchor) {
    anchor = anchor || 0; //optional parameter, used for centerred sprite
    return (x * this.tilesize + this.horyOffset + anchor * this.tilesize)
}

//convert map coordinate to pixel value
Map.prototype.fromMapYToPix = function(y, anchor) {
    anchor = anchor || 0; //optional parameter, used for centerred sprite
    return (y * this.tilesize + this.vertOffset + anchor * this.tilesize)
}

//return true if the given coordinates are walkables
Map.prototype.isWalkable = function(x, y) {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
        return false;
    } else {
        if (this.getTileAt(x, y) === '_') {
            return true;
        } else {
            return false
        }
    }
};

//return true if the given coordinates are walkables
Map.prototype.getTileAt = function(x, y) {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
        return null;
    } else {
        return this.data[y][x];
    }
};

// //draw map on main display 
// Game.Map.prototype.drawMap = function(centerX, centerY) {
//     // Make sure the x-axis doesn't go to the left of the left bound
//     this.topLeftX = Math.max(0, centerX - Math.ceil(Game.mainScreenWidth / 2));
//     // Make sure we still have enough space to fit an entire game screen
//     this.topLeftX = Math.min(this.topLeftX, this.width - Math.ceil(Game.mainScreenWidth / 2));
//     // Make sure the y-axis doesn't above the top bound
//     this.topLeftY = Math.max(0, centerY - Math.ceil(Game.mainScreenHeight / 2));
//     // Make sure we still have enough space to fit an entire game screen
//     this.topLeftY = Math.min(this.topLeftY, this.height - Math.ceil(Game.mainScreenHeight) / 2);

//     // Iterate through all visible map cells
//     for (var x = this.topLeftX; x < this.topLeftX + Game.mainScreenWidth; x++) {
//         for (var y = this.topLeftY; y < this.topLeftY + Game.mainScreenHeight; y++) {
//             // Fetch the glyph for the tile and render it to the screen at the offset position.
//             var glyph = this.getTile(x, y).glyph;

//             //rocher
//             if (glyph.char.toString() == ['.', '#'].toString()) {
//                 if (Game.displayMode == "tile") {
//                     //bitmasking score calculation : https://gamedevelopment.tutsplus.com/tutorials/how-to-use-tile-bitmasking-to-auto-tile-your-level-layouts--cms-25673
//                     var score = 0
//                     var wall = ['.', '#'].toString()
//                     var nw = this.getTile(x - 1, y - 1).glyph.char.toString() //north west
//                     var n = this.getTile(x, y - 1).glyph.char.toString() //north
//                     var ne = this.getTile(x + 1, y - 1).glyph.char.toString() //north east
//                     var w = this.getTile(x - 1, y).glyph.char.toString() //west
//                     var e = this.getTile(x + 1, y).glyph.char.toString() //east
//                     var sw = this.getTile(x - 1, y + 1).glyph.char.toString() //south west
//                     var s = this.getTile(x, y + 1).glyph.char.toString() //south
//                     var se = this.getTile(x + 1, y + 1).glyph.char.toString() //south east

//                     if (nw == wall && (n == wall && w == wall)) { score += 1 } //north west
//                     if (n == wall) { score += 2 } //north
//                     if (ne == wall && (n == wall && e == wall)) { score += 4 } //north east
//                     if (w == wall) { score += 8 } //west
//                     if (e == wall) { score += 16 } //east
//                     if (sw == wall && (s == wall && w == wall)) { score += 32 } //south west
//                     if (s == wall) { score += 64 } //south
//                     if (se == wall && (s == wall && e == wall)) { score += 128 } //south east

//                     //on récupére la bonne tile n fonction du score et on l'affiche
//                     var tile = ""
//                     var coresp = { 2: 1, 8: 2, 10: 3, 11: 4, 16: 5, 18: 6, 22: 7, 24: 8, 26: 9, 27: 10, 30: 11, 31: 12, 64: 13, 66: 14, 72: 15, 74: 16, 75: 17, 80: 18, 82: 19, 86: 20, 88: 21, 90: 22, 91: 23, 94: 24, 95: 25, 104: 26, 106: 27, 107: 28, 120: 29, 122: 30, 123: 31, 126: 32, 127: 33, 208: 34, 210: 35, 214: 36, 216: 37, 218: 38, 219: 39, 222: 40, 223: 41, 248: 42, 250: 43, 251: 44, 254: 45, 255: 46, 0: 47 }
//                     tile = "t" + coresp[score]
//                     Game.display.draw(x - this.topLeftX, y - this.topLeftY, ['.', tile], glyph.fg, glyph.bg);
//                 } else {
//                     Game.display.draw(x - this.topLeftX, y - this.topLeftY, "#", glyph.fg, glyph.bg);
//                 }
//             } else { //si autre que rocher, on affiche
//                 Game.display.draw(x - this.topLeftX, y - this.topLeftY, glyph.char, glyph.fg, glyph.bg);
//             }
//         }

//     }
// };