var mixins = {

    //add menu entry
    addMenuOption: function(text, callback, x, y) {
        x = x || 30;
        if (!y) { this.optionsCount++; }
        y = y || 100 + this.optionsCount * 80;

        var newEntry = game.add.text(x, y, text, styles.navitem.default); //create entry text object

        //define event function
        var onOver = function(target) {
            target.setStyle(styles.navitem.hover)
        }
        var onOut = function(target) {
            target.setStyle(styles.navitem.default)
        }

        //enbale event
        newEntry.inputEnabled = true
        newEntry.events.onInputOver.add(onOver);
        newEntry.events.onInputOut.add(onOut);
        newEntry.events.onInputUp.add(callback);
    },

    addOptionButton: function(x, y, spriteSheet, onFrame, offFrame, option, onFunction, offFunction) {
        //creation du sprite, ajout des animation
        var bt = game.add.sprite(x, y, spriteSheet)
        bt.animations.add('on', [onFrame])
        bt.animations.add('off', [offFrame])

        //etat initial en fonction de l'option
        if (option) {
            console.log("option on")
            bt.animations.play('on');
            onFunction
        } else {
            console.log("option off")
            bt.animations.play('off')
            offFunction
        }

        //ajout evenement sur le bouton
        bt.inputEnabled = true
        bt.events.onInputUp.add(function(target) {
            option = !option;
            if (option) {
                console.log("option on")
                target.animations.play('on');
                onFunction
            } else {
                console.log("option off")
                target.animations.play('off')
                offFunction
            }
        });
    }
}