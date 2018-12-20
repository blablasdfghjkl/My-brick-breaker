
window.onload = function() {
        
    let game = new Phaser.Game(400, 300, Phaser.AUTO, '', { preload: preload, create: create, update: update });

    function preload () {
        game.load.image('brick_pic1', 'static/images/brick_pic1.png');
        game.load.image('brick_pic2', 'static/images/brick_pic2.png');
        game.load.image('brick_pic3', 'static/images/brick_pic3.png');
        game.load.image('brick_pic4', 'static/images/brick_pic4.png');
        game.load.image('brick_pic5', 'static/images/brick_pic5.png');
        game.load.image('ball', 'static/images/ball_brick.png');
        game.load.image('bluePaddle', 'static/images/paddleBlue.png');
    }
    
    function create () {
        game.physics.startSystem(Phaser.Physics.Arcade);

        game.world.enableBody = true;

        this.ball = game.add.sprite(181, 190, 'ball');
        this.bluePaddle = game.add.sprite(261, 260, 'bluePaddle');
        this.bricks = game.add.group;//setup adding bricks to group
        game.physics.arcade.enable([this.ball, this.bluePaddle, this.bricks]);

        this.ball.body.bounce.setTo(1);
        this.ball.body.collideWorldBounds = true;
        this.bluePaddle.body.collideWorldBounds = true;
        this.bluePaddle.body.immovable = true;

        this.bricks = game.add.group();

        for (let i = 0; i < 5; i++) {
            for (let n = 0; n < 5; n++) {
                let brick = game.add.sprite(40 + n * 65, 20 + i * 33, 'brick_pic1');

                brick.body.immovable = true;
                
                brick.life = 4;

                this.bricks.add(brick);
            }
        }
        this.cursors = game.input.keyboard.createCursorKeys();
        
        this.ball.body.velocity.x = 200;
        this.ball.body.velocity.y = 200;
    }

    function update() {
        if (this.cursors.left.isDown) this.bluePaddle.body.velocity.x = -350;
        else if (this.cursors.right.isDown) this.bluePaddle.body.velocity.x = 350;
        else this.bluePaddle.body.velocity.x = 0;
        
        game.physics.arcade.collide(this.bluePaddle, this.ball, this.hitPaddle, null, this);
        
        game.physics.arcade.collide(this.ball, this.bricks, function(a, b) { hit(a, b); }, null, this);

        if (this.ball.y > this.bluePaddle.y)
            game.state.start(game.state.current);
    }
    function hit(ball, brick) {
        brick.life--;
        if (brick.life === 4)brick.loadTexture('brick_pic2')
        else if (brick.life === 3)brick.loadTexture('brick_pic3')
        else if (brick.life === 2)brick.loadTexture('brick_pic4')
        else if (brick.life === 1)brick.loadTexture('brick_pic5')
        else brick.kill();
    }  
};