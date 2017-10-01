var Options = function() {}

Options.prototype = {
    init: function() {
        //Create title text
        this.title = game.make.text(game.world.centerX, 50, 'Options', styles.header);
        this.title.anchor.setTo(0.5);
        this.title.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    },

    preload: function() {
        this.optionsCount = 0;
    },

    create: function() {
        //add elements
        game.add.sprite(0, 0, 'back');
        game.add.existing(this.title);

        this.addMenuOption('<-back', function() { game.state.start("GameMenu"); }, 20, 20)

        this.addOptionButton(50, 150, 'buttons1', 70, 80, gameOptions.playMusic, function() { musicPlayer.play(); }, function() { musicPlayer.start(); })
        this.addOptionButton(50, 250, 'buttons1', 142, 152, gameOptions.playSound)
    }
};

Phaser.Utils.mixinPrototype(Options.prototype, mixins);