var Credits = function() {}

Credits.prototype = {
    init: function() {
        //Create title text
        this.title = game.make.text(game.world.centerX, 50, 'Credits', styles.header);
        this.title.anchor.setTo(0.5);
        this.title.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    },

    preload: function() {},

    create: function() {
        //add elements
        game.add.sprite(0, 0, 'back');
        game.add.existing(this.title);

        this.addMenuOption('<-back', function() { game.state.start("GameMenu"); }, 20, 20)

        var creditText = game.add.text(30, 200, "A game/prototype by Thomas Beauné : @JaunMakenro")
        creditText.fill = "white"
        creditText.boundsAlignH = "left"
        creditText.boundsAlignV = "top"
        creditText.wordWrap = true
        creditText.wordWrapWidth = 740
    }
};

Phaser.Utils.mixinPrototype(Credits.prototype, mixins);