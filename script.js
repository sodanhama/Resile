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
    this.load.spritesheet("player", "./assets/player-spritesheet.png", {
        frameWidth: 16,
        frameHeight: 16
    });
}

function create() {
    const width = this.scale.width;
    const height = this.scale.height;
    player = this.add.image(width / 2, height / 2, "player");
    player.setScale(10);
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

    currentState = states.idle;
    currentState.onEnter();
}

function update() {
    const nextState = currentState.onUpdate();

    if (nextState !== currentState) {
        currentState.onExit();
        currentState = states[nextState];
        currentState.onEnter();
    }
}

const states = {
    idle : {
        onEnter() {
            player.anims.stop();
        },
        onUpdate() {
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
            robot.x -= speed;
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
            robot.x += speed;
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
            robot.y -= speed;
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
            robot.y += speed;
            return "walk-down";
        },
        onExit() {}
    }
}

const game = new Phaser.Game(config);