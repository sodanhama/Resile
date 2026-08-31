const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: '#4F646F',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene : {
        preload: preload,
        create: create,
        update: update
    },
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    }
}

let player
let ground
let cursors
let speed = 1


function preload() {
    this.load.spritesheet("player", "./assets/playerspritesheet.png", {
        frameWidth: 160,
        frameHeight: 160
    });

    this.load.image("ground", "./assets/ground.png");

    this.load.image("platform", "./assets/platform.png");
}

function create() {
    const width = this.scale.width;
    const height = this.scale.height;

    ground = this.physics.add.staticGroup();
    ground.create(width / 2, height - 32, "ground").setScale(2).refreshBody();
    
    platform = this.physics.add.staticGroup();
    platform.create(500, 500, "platform").setScale(0.5).refreshBody();

    player = this.physics.add.sprite(width / 2, 0, "player").setScale(1.25);
    player.body.setSize(player.width * 0.5, player.height * 0.7);

    this.physics.add.collider(player, ground);
    this.physics.add.collider(player, platform);

    cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    if (cursors.space.isDown && player.body.touching.down) {
        player.setVelocityY(-200);
    }

    if (cursors.left.isDown) {
        player.setVelocityX(-160);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
    } else {
        player.setVelocityX(0);
    }
}

const game = new Phaser.Game(config);
