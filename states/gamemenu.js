var GameMenu = function() {}

GameMenu.prototype = {
    init: function() {
        //Create title text
        this.title = game.make.text(game.world.centerX, 50, 'Main menu', styles.header);

        this.title.anchor.setTo(0.5);
        this.title.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    },

    preload: function() {
        this.optionsCount = 0;
    },

    create: function() {
        //add elements
        this.back = game.add.sprite(0, 0, 'back');
        this.back.width = this.game.width
        this.back.height = this.game.height

        game.add.existing(this.title);
        this.addMenuOption('Start', function() { game.state.start("main"); })
        this.addMenuOption('Options', function() { game.state.start("Options"); })
        this.addMenuOption('Credits', function() { game.state.start("Credits"); })
            //game.stage.disableVisibilityChange = true; // prevent pause when browser lose focus
    },
};

Phaser.Utils.mixinPrototype(GameMenu.prototype, mixins);