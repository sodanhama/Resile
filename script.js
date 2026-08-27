const config = {
    type: Phaser.AUTO,
    width: 1450,
    height: 810,
    backgroundColor: '#222',
    scene : {
        preload: preload,
        create: create,
        update: update
    }
}

let players
let cursors

function preload() {
    this.load.image("background", "https://images.unsplash.com/photo-1580757468214-c73f7062a5cb?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8MTYlM0E5fGVufDB8fDB8fHww");
    this.load.image("player", "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ce0c60c9-c49e-43c3-b561-007522eca5d2/daoc6ix-2480a3fe-400f-403c-913a-a38d950be7cb.png/v1/fill/w_1024,h_1024/pixel_despair_nagito_by_stevendrews09_daoc6ix-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTAyNCIsInBhdGgiOiIvZi9jZTBjNjBjOS1jNDllLTQzYzMtYjU2MS0wMDc1MjJlY2E1ZDIvZGFvYzZpeC0yNDgwYTNmZS00MDBmLTQwM2MtOTEzYS1hMzhkOTUwYmU3Y2IucG5nIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.caDRoUb7RLpUI_1YHDW89KNh0jqs77XzRCjpPtfAE-c");
}

function create() {
    const width = this.scale.width;
    const height = this.scale.height;
    this.add.image(width / 2, height / 2, "background");
    this.add.image(width / 2, height / 2, "player");
    cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    const speed = 3
    if (cursors.left.isDown) {
        player.x -= speed
    } else if (cursors.right.isDown) {
        player.x += speed
    } 
    if (cursors.up.isDown) {
        player.y -= speed
    } else if (cursors.down.isDown) {
        player.y += speed
    }
}

const game = new Phaser.Game(config);