//main phaser game object 
var
    game = new Phaser.Game("100%", "100%", Phaser.AUTO, 'game'),
    // game = new Phaser.Game(720, 1280, Phaser.AUTO, 'game'),

    gameOptions = { //used to carry music options and music object over every scenes        
        playSound: true,
        playMusic: false
    },
    musicPlayer

boot = function() {};

boot.prototype = {
    //preload asset used on splash screen
    preload: function() {
        game.load.image('back', 'assets/images/BackgroundNavyGridSprite800x600.png');
        game.load.image('loading', 'assets/images/loading.png');
        game.load.image('brand', 'assets/images/logoV1.png');
        game.load.script('Splash', 'states/Splash.js');
    },

    //run splash screen
    create: function() {
        //  Unless you specifically know your game needs to support multi-touch I would recommend setting this to 1
        this.input.maxPointers = 1;
        //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
        this.stage.disableVisibilityChange = true;
        //  This tells the game to resize the renderer to match the game dimensions (i.e. 100% browser width / height)
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;

        // if (this.game.device.desktop) {
        //     game.scale.setGameSize()
        //     console.log("desktop")
        // }

        game.state.add('Splash', Splash);
        game.state.start('Splash');
    }

};

game.state.add('boot', boot);
game.state.start('boot');