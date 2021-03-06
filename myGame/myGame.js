/*global Phaser*/


var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
var game_state = {}


game_state.main = function() {};
game_state.main.prototype = {


    preload: function() {
        game.load.image('sky', 'assets/sky.png');
        game.load.image('ground', 'assets/platform.png');
        game.load.image('star', 'assets/star.png');
        game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    },


    create: function() {
        game.physics.startSystem(Phaser.Physics.Arcade);
        game.add.sprite(0, 0, 'sky');
        // game.add.sprite(0, 0, 'star');

        this.platforms = game.add.group();
        this.platforms.enableBody = true;
        var ground = this.platforms.create(0, game.world.height - 64, 'ground');
        ground.scale.setTo(2, 2);
        ground.body.immovable = true;

        var ledge = this.platforms.create(500, 400, 'ground');
        ledge.body.immovable = true;
        this.player = game.add.sprite(32, game.world.height - 150, 'dude');
        game.physics.arcade.enable(this.player);

        this.player.body.bounce.y = 0.2;
        this.player.body.gravity.y = 300;
        this.player.body.collideWorldBounds = true;
        this.player.animations.add('left', [0, 1, 2, 3], 10, true);
        this.player.animations.add('right', [5, 6, 7, 8], 10, true);
        this.cursors = game.input.keyboard.createCursorKeys();

        this.stars = game.add.group();
        this.stars.enableBody = true;


        for (var i = 0; i < 12; i++) {
            this.stars.enableBody = true;
            var star = this.stars.create(90 * 70, 0, 'star');
            star.body.gravity.y = 200;
            star.body.bounce.y = 0.7 + Math.random() * 0.2;
        }





    },



    update: function() {
        game.physics.arcade.collide(this.player, this.platforms);
        game.physics.arcade.collide(this.stars, this.platforms);
        this.player.body.velocity.x = 0;
      if (this.cursors.left.isDown) {   this.player.body.velocity.x = -150;
        this.player.animations.play('left');
}
       else if (this.cursors.right.isDown) {
            this.player.body.velocity.x = 150;
        this.player.animations.play('right');
}
      else{  
          this.player.animations.stop();
        this.player.frame = 4;
}
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.body.velocity.y = -350;
}



    },
    collectStar: function(player, star) {
        star.kill();
    }



},
game.state.add('main', game_state.main);
game.state.start('main');
