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
            gravity: { y: 100 },
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
}

function create() {
    const width = this.scale.width;
    const height = this.scale.height;

    ground = this.physics.add.staticGroup();
    ground.create(width / 2, height - 32, "ground").setScale(2).refreshBody();

    player = this.physics.add.sprite(width / 2, height / 2, "player").setScale(1.5);
    player.body.setSize(player.width * 0.5, player.height * 0.7);

    this.physics.add.collider(player, ground);

    cursors = this.input.keyboard.createCursorKeys();
}

function update() {

}

const game = new Phaser.Game(config);
