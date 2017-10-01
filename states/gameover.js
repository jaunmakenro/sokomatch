var GameOver = function() {}

GameOver.prototype = {
    init: function() {
        //Create title text
        this.title = game.make.text(game.world.centerX, 50, 'Game Over', styles.header);

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

        this.addMenuOption('resStart', function() { game.state.start("gamemenu"); })
    },
};

Phaser.Utils.mixinPrototype(GameMenu.prototype, mixins);