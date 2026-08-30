const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: '#333232',
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
            gravity: { y: 20 },
            debug: true
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
}

function create() {
    const width = this.scale.width;
    const height = this.scale.height;

    player = this.physics.add.sprite(width / 2, height / 2, "player");

    ground = this.physics.add.staticGroup();

    ground.create(height, 200, "ground").setScale(2).refreshBody();

    this.physics.add.collider(player, ground);

    cursors = this.input.keyboard.createCursorKeys();
}

function update() {

}

const game = new Phaser.Game(config);
