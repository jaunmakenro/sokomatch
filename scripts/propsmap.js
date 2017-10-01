"use strict";

var propsMap = function(width, height) {
    this.width = width
    this.height = height
    this.nextSpawn = { x: null, y: null }
    this.props = [];
    this.maxPropType = 0;
    for (var y = 0; y < this.height; y++) {
        // Create the nested array for the y values
        this.props.push([]);
        // Add all the tiles
        for (var x = 0; x < this.width; x++) {
            this.props[y].push(null)
        }
    }

    this.movementDuration = 200

    //create shadow
    this.shadow = game.add.sprite(-100, -100, 'props', 16)
    this.spawnCounter = -2
    this.shadow.width = map.tilesize
    this.shadow.height = map.tilesize
    this.shadow.anchor.set(0.5)
    this.shadow.scale.set(0.2 * this.spawnCounter)
};

//return true if the given coordinates are walkables
propsMap.prototype.isWalkable = function(x, y) {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
        return false;
    } else {
        if (this.getPropAt(x, y) === null) {
            return true;
        } else {
            return false
        }
    }
};

// Gets the prop for a given coordinate set
propsMap.prototype.getPropAt = function(x, y) {
    //console.log("get prop at  " + x + " " + y)
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
        return null;
    } else {
        //console.log("get prop at " + x + " " + y)
        var tempProp = this.props[y][x]
            //console.log(this.props)

        if (tempProp === null) {
            return null
        } else {
            return tempProp
        }
    }
};

propsMap.prototype.tryPushTo = function(x, y, dx, dy) {
    var propToMove = this.getPropAt(x, y);
    var propAtDest = this.getPropAt(x + dx, y + dy);
    //move the prop
    if (propAtDest == null) { // & map.isWalkable(x + dx, y + dy)) { // && propToMove.pushable) {
        this.props[y + dy][x + dx] = propToMove
        this.removePropAt(x, y)
        propToMove.moveTo(x + dx, y + dy)

        this.patternCheckAround(x + dx, y + dy);
        moves += 1
    }
};

//create new prop at given coords
propsMap.prototype.add = function(x, y, kind) {
    if (this.getPropAt(x, y) == null) {
        var test = new prop(x, y, kind);
        this.props[y][x] = test;
        this.patternCheckAround(x, y);
        //this.patternCheckAround(x, y);
    }
    this.updateScore()
};

//remove prop at given coords
propsMap.prototype.removePropAt = function(x, y) {
    console.log("remove " + x + " " + y)
    if (this.getPropAt(x, y) != null) {
        this.props[y][x] = null
    }
};

//remove prop at given coords
propsMap.prototype.destroyPropAt = function(x, y) {
    console.log("destroy " + x + " " + y)
    if (this.getPropAt(x, y) != null) {
        this.props[y][x].destroy()
        delete this.props[y][x]
    }
};

//check if the last moved prop is part of a pattern
propsMap.prototype.patternCheckAround = function(lastMovedPropX, lastMovedPropY) {
    var movedProp = propsmap.getPropAt(lastMovedPropX, lastMovedPropY)
    var propType = movedProp.sprite.frame
    var findedProps = [];

    var offsets = [
        { x: -1, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 }
    ]

    //pour chaque case adjacente
    for (var offset = 0; offset < offsets.length; offset++) {
        var dir = offsets[offset];
        var tempX = lastMovedPropX + dir.x
        var tempY = lastMovedPropY + dir.y
        var propToCheck = propsmap.getPropAt(tempX, tempY)
        if (propToCheck != null) {
            if (propToCheck.sprite.frame == propType) {
                findedProps.push(propToCheck)
            }
        }
    }

    //console.log(findedPropsCoord)
    //si on a trouvé au moins un prop pareil, on regarde autour
    if (findedProps.length > 0) {
        var firtBatchOffindedProps = findedProps.slice();
        for (var propCoordid = 0; propCoordid < firtBatchOffindedProps.length; propCoordid++) {
            var propCoord = firtBatchOffindedProps[propCoordid];
            //console.log("check around " + propCoord.x + " " + propCoord.y)
            //pour chaque case adjacente
            for (var offset = 0; offset < offsets.length; offset++) {
                var dir = offsets[offset];
                var tempX = propCoord.x + dir.x
                var tempY = propCoord.y + dir.y
                if (!(tempX == lastMovedPropX & tempY == lastMovedPropY)) {
                    var propToCheck = propsmap.getPropAt(tempX, tempY)
                    if (propToCheck != null) {
                        if (propToCheck.sprite.frame == propType) {
                            findedProps.push(propToCheck)
                        }
                    }
                }
            }
        }
    }
    //console.log(findedPropsCoord)

    // debugger;
    //si on a trouvé + de 2 prop pareil on les supprime et on crée un de niveau sup
    if (findedProps.length > 1) {
        for (var Pid = 0; Pid < findedProps.length; Pid++) {
            findedProps[Pid].goToAndDestroy(movedProp.x, movedProp.y);
            this.props[findedProps[Pid].y][findedProps[Pid].x] = null
        }

        var ThisPropmap = this
        setTimeout(function() {
            movedProp.sprite.frame = propType + 1
            ThisPropmap.patternCheckAround(movedProp.x, movedProp.y);
            ThisPropmap.maxPropType = Math.max(ThisPropmap.maxPropType, propType + 1)
        }, 200)
    }

};

//handle shadow position and scale evolution and spawning new props
propsMap.prototype.handleShadowAndSpawn = function() {
    //choose next spawn point

    if (this.nextSpawn.x == null) {
        // debugger
        var emptyCoord = this.findEmptyCoord(2)
        if (emptyCoord == null) {
            // debugger
            emptyCoord = this.findEmptyCoord(1)
            if (emptyCoord == null) {
                console.log("game over")
                game.state.start("gameover");
            }
        }
        //move shadow to spawn point
        this.nextSpawn.x = emptyCoord.x
        this.nextSpawn.y = emptyCoord.y
        game.add.tween(this.shadow).to({ x: map.fromMapXToPix(this.nextSpawn.x, 0.5), y: map.fromMapYToPix(this.nextSpawn.y, 0.5) }, 400, Phaser.Easing.Default, true);
    }

    //console.log("handle shadow")
    //increment spawn counter, if at limit, spawn prop and reinitialize spawn position 
    this.spawnCounter++;
    if (this.spawnCounter === 6) {
        if (propsmap.getPropAt(this.nextSpawn.x, this.nextSpawn.y) == null) {
            propsmap.add(this.nextSpawn.x, this.nextSpawn.y, game.rnd.integerInRange(0, this.maxPropType)) //spanw prp among already seen props
        }
        this.spawnCounter = -1
        this.nextSpawn.x = null
        this.nextSpawn.y = null
    }
    //grow shadow
    var scale = 0.2 * Math.max(0, this.spawnCounter);
    game.add.tween(this.shadow.scale).to({ x: scale, y: scale }, 100, Phaser.Easing.Default, true);
}

//count number of empty spot in the map minus the given margin
propsMap.prototype.countEmpty = function(margin) {
    var empty = 0
    for (var x = margin; x < this.width - margin; x++) {
        for (var y = margin; y < this.height - margin; y++) {
            if (this.getPropAt(x, y) == null) {
                empty++;
            }
        }
    }
    return empty
};

//find an empty spot within map minus margin
propsMap.prototype.findEmptyCoord = function(margin) {
    if (this.countEmpty(margin) != 0) {
        var x = game.rnd.integerInRange(margin, this.width - margin - 1);
        var y = game.rnd.integerInRange(margin, this.height - margin - 1);
        //check if swpan point is valid, change if not
        while (!(map.isWalkable(x, y) & this.isWalkable(x, y))) {
            x = game.rnd.integerInRange(margin, this.width - margin - 1)
            y = game.rnd.integerInRange(margin, this.height - margin - 1)
        }
        return { x: x, y: y }
    } else {
        return null
    }
};

//calculate score and update value
propsMap.prototype.updateScore = function() {
    var tempScore = 0
    for (var x = 0; x < this.width; x++) {
        for (var y = 0; y < this.height; y++) {
            var prop = this.getPropAt(x, y)
            if (prop != null) {
                var value = prop.sprite.frame
                tempScore = tempScore + Math.pow(3, value)
            }
        }
    }
    score = tempScore
};