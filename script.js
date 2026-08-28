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
let speed = 3

let currentState

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
}

const states = {
    idle : {
        onEnter() {
            player.anims.stop();
        },
        onUpdate() {},
        onExit() {}
    },
    "walk-left": {
        onEnter() {},
        onUpdate() {},
        onExit() {}
    },
    "walk-right": {
        onEnter() {},
        onUpdate() {},
        onExit() {}
    },
    "walk-up": {
        onEnter() {},
        onUpdate() {},
        onExit() {}
    },
    "walk-down": {
        onEnter() {},
        onUpdate() {},
        onExit() {}
    }
}

const game = new Phaser.Game(config);