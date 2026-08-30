const config = {
    type: Phaser.AUTO,
    width: 1450,
    height: 800,
    backgroundColor: '#474056',
    scene : {
        preload: preload,
        create: create,
        update: update
    },
    pixelArt: true,
}

let player
let cursors
let speed = 1
let currentState

const states = {
    idle : {
        onEnter() {
            player.anims.stop();
            player.setFrame(0);
        },
        onUpdate() {
            if (cursors.shift.isDown) {speed = 6;}
            else {speed = 3;}
            if (cursors.left.isDown) return "walk-left";
            if (cursors.right.isDown) return "walk-right";
            if (cursors.up.isDown) return "walk-up";
            if (cursors.down.isDown) return "walk-down";
            return "idle";
        },
        onExit() {}
    },
    "walk-left": {
        onEnter() {
            player.anims.play("walk-left", true);
        },
        onUpdate() {
            if (!cursors.left.isDown) return "idle";
            player.x -= speed;
            return "walk-left";
        },
        onExit() {}
    },
    "walk-right": {
        onEnter() {
            player.anims.play("walk-right", true);
        },
        onUpdate() {
            if (!cursors.right.isDown) return "idle";
            player.x += speed;
            return "walk-right";
        },
        onExit() {}
    },
    "walk-up": {
        onEnter() {
            player.anims.play("walk-up", true);
        },
        onUpdate() {
            if (!cursors.up.isDown) return "idle";
            player.y -= speed;
            return "walk-up";
        },
        onExit() {}
    },
    "walk-down": {
        onEnter() {
            player.anims.play("walk-down", true);
        },
        onUpdate() {
            if (!cursors.down.isDown) return "idle";
            player.y += speed;
            return "walk-down";
        },
        onExit() {}
    }
}

function preload() {
    this.load.spritesheet("player", "./assets/player-spritesheet.png", {
        frameWidth: 160,
        frameHeight: 160
    });
}

function create() {
    const width = this.scale.width;
    const height = this.scale.height;

    player = this.add.sprite(width / 2, height / 2, "player");

    cursors = this.input.keyboard.createCursorKeys();

    this.anims.create({
        key: "walk-left",
        frames: this.anims.generateFrameNumbers("player", { start: 18, end: 23 }),
        frameRate: 10,
        repeat: -1
    })

    this.anims.create({
        key: "walk-right",
        frames: this.anims.generateFrameNumbers("player", { start: 12, end: 17 }),
        frameRate: 10,
        repeat: -1
    })
    
    this.anims.create({
        key: "walk-down",
        frames: this.anims.generateFrameNumbers("player", { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1
    })

    this.anims.create({
        key: "walk-up",
        frames: this.anims.generateFrameNumbers("player", { start: 6, end: 11 }),
        frameRate: 10,
        repeat: -1
    })

    currentState = "idle";
    states[currentState].onEnter();
}

function update() {
    const nextState = states[currentState].onUpdate();

    if (nextState !== currentState) {
        states[currentState].onExit();
        states[nextState].onEnter();
        currentState = nextState;
    }
}

const game = new Phaser.Game(config);
