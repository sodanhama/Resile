const config = {
    type: Phaser.AUTO,
    width: 1450,
    height: 810,
    backgroundColor: '#222',
    scene : {
        preload: preload,
        create: create,
        update: update
    },
    pixelArt: true,
}

let players
let cursors

function preload() {
    this.load.image("player", "./assets/player.png");
}

function create() {
    const width = this.scale.width;
    const height = this.scale.height;
    player = this.add.image(width / 2, height / 2, "player");
    player.setScale(10);
    cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    let speed = 3
    const gravity = 0.5
    if (cursors.left.isDown) {
        player.x -= speed
    } else if (cursors.right.isDown) {
        player.x += speed
    } 
    if (cursors.space.isDown) {
        player.y -= speed
    }
    speed += gravity
    player.y += speed
}

const game = new Phaser.Game(config);