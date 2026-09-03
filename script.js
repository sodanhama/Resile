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
let garbage = 5
let score = 0

const states = {
    idle: {
        onEnter() {
            player.anims.stop();
        },
        onUpdate() {
            if (cursors.left.isDown) return "walk-left";
            if (cursors.right.isDown) return "walk-right";
            if (cursors.space.isDown) return "jump";
            return "idle";
        },
        onExit() {}
    },
    "walk-left": {
        onEnter() {
            player.anims.play("walk-left", true)
        },
        onUpdate() {
            if (!cursors.left.isDown) return "idle";
            return "walk-left";
        },
        onExit() {}
    },
    "walk-right": {
        onEnter() {
            player.anims.play("walk-right", true)
        },
        onUpdate() {
            if (!cursors.right.isDown) return "idle";
            return "walk-right";
        },
        onExit() {}
    },
    "jump": {
        onEnter() {
            player.anims.play("jump", true)
        },
        onUpdate() {
            if (player.body.velocity.y > 0) return "fall";
            return "jump";
        },
        onExit() {}
    },
    "fall": {
        onEnter() {
            player.anims.play("fall", true)
        },
        onUpdate() {
            if (player.body.touching.down) return "idle";
            return "fall";
        },
        onExit() {}
    }
}

function preload() {
    this.load.spritesheet("player", "./assets/playerspritesheet.png", {
        frameWidth: 160,
        frameHeight: 160
    });

    this.load.image("ground", "./assets/ground.png");

    this.load.image("platform", "./assets/platform.png");

    this.load.image("trash", "./assets/trash.png");
}

function create() {
    const width = this.scale.width;
    const height = this.scale.height;

    ground = this.physics.add.staticGroup();
    ground.create(width / 2, height - 32, "ground").setScale(2).refreshBody();
    
    platforms = this.physics.add.staticGroup({
        key: "platform",
        repeat: 3,
        setXY: { x: 0, y: 200, stepX: 500, stepY: 240 },
    });

    player = this.physics.add.sprite(0, 0, "player").setScale(1);
    player.body.setSize(player.width * 0.5, player.height * 0.5);

    trash = this.physics.add.group({
        key: "trash",
        repeat: garbage - 1,
        setXY: { x: 50, y: 600, stepX: 310, stepY: -40 }
    });

    this.physics.add.overlap(player, trash, (player, trash) => {
        trash.disableBody(true, true);
        score += 1;
        console.log(score)
    });
    for (platform of platforms.getChildren()) {
        this.physics.add.collider(player, platform);
        this.physics.add.collider(trash, platform);
    }
    this.physics.add.collider(trash, ground);
    this.physics.add.collider(player, ground);

    this.anims.create({
        key: "walk-left",
        frames: this.anims.generateFrameNumbers("player", { start: 18, end: 23 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: "walk-right",
        frames: this.anims.generateFrameNumbers("player", { start: 12, end: 17 }),
        frameRate: 10,
        repeat: -1
    });    

    this.anims.create({
        key: "jump",
        frames: this.anims.generateFrameNumbers("player", { start: 6, end: 11 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: "fall",
        frames: this.anims.generateFrameNumbers("player", { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1
    });

    currentState = "idle";
    states[currentState].onEnter();

    cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    if (score >= 5) {
        window.alert("Congratulations! You have collected all the trash!");
        game.AUTO.destroy(true);
    }
    if (cursors.space.isDown && player.body.touching.down) {
        player.setVelocityY(-300);
    }

    if (cursors.left.isDown) {
        player.setVelocityX(-160);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
    } else {
        player.setVelocityX(0);
    }

    const nextState = states[currentState].onUpdate();

    if (nextState !== currentState) {
        states[currentState].onExit();
        states[nextState].onEnter();
        currentState = nextState;
    }
}

const game = new Phaser.Game(config);
