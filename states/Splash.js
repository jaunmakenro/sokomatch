var Splash = function() {};

Splash.prototype = {

    loadScripts: function() {
        // source font loader: https://github.com/typekit/webfontloader
        game.load.script('mixins', 'lib/mixins.js');
        game.load.script('prop', 'scripts/prop.js');
        game.load.script('WebFont', 'vendor/webfontloader.js');
        game.load.script('GameMenu', 'states/gamemenu.js');
        game.load.script('main', 'states/main.js');
        game.load.script('GameOver', 'states/gameover.js');
        game.load.script('Credits', 'states/credits.js');
        game.load.script('Options', 'states/options.js');
        game.load.script('Styles', 'lib/styles.js');
        game.load.script('Map', 'scripts/map.js');
        game.load.script('Player', 'scripts/player.js');
        game.load.script('Propsmap', 'scripts/propsmap.js');
    },

    loadBgm: function() {
        // thanks Kevin Macleod at http://incompetech.com/
        // game.load.audio('dangerous', 'assets/bgm/Dangerous.mp3');
        // game.load.audio('exit', 'assets/bgm/Exit the Premises.mp3');
    },

    loadImages: function() {
        game.load.spritesheet('buttons1', 'assets/images/buttons1.png', 100, 100);
        game.load.spritesheet('pinguin', 'assets/images/pinguin.png', 64, 64);
        game.load.spritesheet('props', 'assets/images/props.png', 64, 64);
        game.load.image('curses', 'assets/images/curses_1280x600.png');
        //game.load.image('walls', 'assets/images/tilemap1.png');
        //game.load.image('tiles', 'assets/images/tilesSpace.png');
        game.load.spritesheet('tiles', 'assets/images/tilesSpace.png', 64, 64);
        game.load.image('starField', 'assets/images/starfield720x1280.jpg');
        game.load.image('UpArrow', 'assets/images/arrowUpW.png');
        game.load.image('DownArrow', 'assets/images/arrowDownW.png');
        game.load.image('LeftArrow', 'assets/images/arrowLeftW.png');
        game.load.image('RightArrow', 'assets/images/arrowRightW.png');
    },

    loadFonts: function() {
        WebFontConfig = {
            custom: {
                families: ['Souses'],
                urls: ['assets/style/Souses.css']
            }
        }
    },

    init: function() {
        //create our objects
        this.loadingBar = game.make.sprite(game.world.centerX - (387 / 2), 400, "loading");

        this.logo = game.make.sprite(game.world.centerX, 200, 'brand');
        this.logo.anchor.setTo(0.5);
        this.logo.scale.setTo(0.1);

        this.status = game.make.text(game.world.centerX, 380, 'Loading...', { fill: 'white' });
        this.status.anchor.setTo(0.5);
    },

    // The preload function then will call all of the previously defined functions:
    preload: function() {
        // add every previsouly created objects
        game.add.sprite(0, 0, 'back');
        game.add.existing(this.logo);
        game.add.existing(this.loadingBar);
        game.add.existing(this.status);

        this.load.setPreloadSprite(this.loadingBar);

        this.loadScripts();
        this.loadImages();
        this.loadFonts();
        this.loadBgm();
    },

    //Every assets loaded, start the game
    create: function() {
        this.status.setText("Ready !"); //change text

        //add game states
        game.state.add("GameMenu", GameMenu);
        game.state.add("main", main);
        game.state.add("GameOver", GameOver);
        game.state.add("Credits", Credits);
        game.state.add("Options", Options);

        // musicPlayer = game.add.audio('dangerous');
        // musicPlayer.loop = true;
        //add music
        // if (gameOptions.playMusic) {
        // musicPlayer.play();
        // }

        //load main menu after a smal delay
        setTimeout(function(params) {
            console.log("load menu")
            game.state.start("GameMenu");
            // game.state.start("main");
        }, 1)
    }
}