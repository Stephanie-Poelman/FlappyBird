// Create our 'main' state that will contain the game


// Initialize Phaser, and create a 400px by 490px game
var game = new Phaser.Game(400, 490);

var mainState = {
    preload: function () {
        // This function will be executed at the beginning
        // That's where we load the images and sounds
        this.game.load.image('bird', 'assets/bird.png');
        this.game.load.image('pipe', 'assets/pipe.png');
    },

    create: function () {
        // This function is called after the preload function
        // Here we set up the game, display sprites, etc.
        game.stage.backgroundColor = '#71c5cf';
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.bird = game.add.sprite(100, 245, 'bird');
        game.physics.arcade.enable(this.bird);
        this.bird.body.gravity.y = 1000;

        var spaceKey = game.input.keyboard.addKey(
            Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this);

        this.pipes = game.add.group();

        this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);
    },

    addOnePipe: function (x, y) {
        // Create a pipe at the position x and y
        var pipe = game.add.sprite(x, y, 'pipe');

        // Add the pipe to our previously created group
        this.pipes.add(pipe);

        // Enable physics on the pipe
        game.physics.arcade.enable(pipe);

        // Add velocity to the pipe to make it move left
        pipe.body.velocity.x = -200;

        // Automatically kill the pipe when it's no longer visible
        pipe.checkWorldBounds = true;
        pipe.outOfBoundsKill = true;
    },

    addRowOfPipes: function () {
        // Randomly pick a number between 1 and 5
        // This will be the hole position
        var hole = Math.floor(Math.random() * 5) + 1;

        // Add the 6 pipes
        // With one big hole at position 'hole' and 'hole + 1'
        for (var i = 0; i < 8; i++)
            if (i != hole && i != hole + 1)
                this.addOnePipe(400, i * 60 + 10);
    },

    update: function () {
        // This function is called 60 times per second
        // It contains the game's logic
        if (this.bird.y < 0 || this.bird.y > 490)
            this.restartGame();
    },

    // Make the bird jump
    jump: function () {
        // Add a vertical velocity to the bird
        this.bird.body.velocity.y = -350;
    },

// Restart the game
    restartGame: function () {
        // Start the 'main' state, which restarts the game
        this.game.time.events.remove(this.timer);
        game.state.start('main');
    },
};

// Add the 'mainState' and call it 'main'
game.state.add('main', mainState);

// Start the state to actually start the game
game.state.start('main');
