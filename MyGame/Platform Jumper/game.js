var config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    parent: "Platform Jumper",
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 600,
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

var game = new Phaser.Game(config);
var player;
var platforms;
var moveplatforms;
var plt1;
var plt2;
var plt3;
var plt4;
var plt5;
var plt6;
var cup;
var balls;
var ball;
var cursors;
var go = false;
var score = 0;
var scoreText;
var pjhighscore = 0;
var highScoreText;
var replayText;
var collectSound;
var gameOverSound;
var logobtn;
var rightbtn;
var leftbtn;
var upbtn;

function preload() {
  this.load.image("logobtn", "../image/logo.png");
  this.load.audio("collect", "assets/collect.mp3");
  this.load.audio("gameover", "assets/gameover.mp3");
  this.load.image("sky", "assets/sky.jpg");
  this.load.spritesheet("player", "assets/man.png", {
    frameWidth: 49.6,
    frameHeight: 100,
    endFrame: 30,
  });
  this.load.image("ground", "assets/platform.jpg");
  this.load.image("cup", "assets/cup.png");
  this.load.spritesheet("ball", "assets/ball.png", {
    frameWidth: 100,
    frameHeight: 100,
  });
  this.load.image("right", "assets/right.png");
  this.load.image("left", "assets/left.png");
  this.load.image("up", "assets/up.png");
}
function create() {
  collectSound = this.sound.add("collect");
  gameOverSound = this.sound.add("gameover");
  this.add.image("400", "300", "sky");
  cup = this.physics.add.image(400, 50, "cup").setScale(0.05);
  platforms = this.physics.add.staticGroup();
  platforms.create(400, 580, "ground").setScale(0.5).refreshBody();
  moveplatforms = this.physics.add.group();
  plt1 = moveplatforms
    .create(Phaser.Math.Between(0, 700), Phaser.Math.Between(0, 400), "ground")
    .setScale(0.03, 0.1)
    .setBounce(0.2)
    .setCollideWorldBounds(true);
  plt2 = moveplatforms
    .create(Phaser.Math.Between(0, 700), Phaser.Math.Between(0, 400), "ground")
    .setScale(0.03, 0.1)
    .setBounce(0.2)
    .setCollideWorldBounds(true);
  plt3 = moveplatforms
    .create(Phaser.Math.Between(0, 700), Phaser.Math.Between(0, 400), "ground")
    .setScale(0.03, 0.1)
    .setBounce(0.2)
    .setCollideWorldBounds(true);
  plt4 = moveplatforms
    .create(Phaser.Math.Between(0, 700), Phaser.Math.Between(0, 400), "ground")
    .setScale(0.03, 0.1)
    .setBounce(0.2)
    .setCollideWorldBounds(true);
  plt5 = moveplatforms
    .create(Phaser.Math.Between(0, 700), Phaser.Math.Between(0, 400), "ground")
    .setScale(0.03, 0.1)
    .setBounce(0.2)
    .setCollideWorldBounds(true);
  plt6 = moveplatforms
    .create(Phaser.Math.Between(0, 700), Phaser.Math.Between(0, 400), "ground")
    .setScale(0.03, 0.1)
    .setBounce(0.2)
    .setCollideWorldBounds(true);
  player = this.physics.add
    .sprite(100, 450, "player")
    .setScale(0.5)
    .setGravity(0, 900);
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  balls = this.physics.add.group();
  this.anims.create({
    key: "expload",
    frames: this.anims.generateFrameNumbers("ball", { start: 1, end: 2 }),
    frameRate: 10,
  });
  this.anims.create({
    key: "yes",
    frames: [{ key: "ball", frame: 0 }],
    frameRate: 5,
  });
  ball = balls.create(100, 16, "ball").setScale(0.5);
  ball.setBounce(1);
  ball.setCollideWorldBounds(true);
  ball.setVelocity(-100, 100);
  ball.allowGravity = false;
  ball.anims.play("yes", true);
  this.anims.create({
    key: "ideal",
    frames: [{ key: "player", frame: 3 }],
    frameRate: 10,
  });
  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("player", { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1,
  });
  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("player", { start: 4, end: 7 }),
    frameRate: 10,
    repeat: -1,
  });
  scoreText = this.add.text(16, 16, "Score: 0", {
    fontSize: "32px",
    color: "#f5f5f5",
    stroke: "#080808",
    strokeThickness: 2,
  });
  logobtn = this.add.image(1, 500, "logobtn").setInteractive();
  logobtn.setOrigin(0, 0);
  logobtn.on(
    "pointerdown",
    () => {
      window.open("../index.html", "_blank");
    },
    this
  );
  rightbtn = this.add.image(700, 550, "right").setInteractive();
  leftbtn = this.add.image(100, 550, "left").setInteractive();
  upbtn = this.add.image(200, 550, "up").setInteractive();

 
  this.physics.add.collider(player, platforms);
  this.physics.add.collider(player, moveplatforms);
  this.physics.add.collider(platforms, cup);
  cursors = this.input.keyboard.createCursorKeys();

  this.physics.add.overlap(player, cup, cuphit, null, this);
  this.physics.add.overlap(player, balls, gameOver, null, this);
}
function update() {
rightbtn.on("pointerover", function (pointer) {
    player.anims.play("run", true);
    player.setVelocityX(260);
  });
  leftbtn.on("pointerover", function (pointer) {
    player.anims.play("walk", true);
    player.setVelocityX(-260);
  });
  upbtn.on("pointerover", function (pointer) {
    if (player.body.touching.down) {
      player.setVelocityY(-650);
    }
  });
  if (plt1.y > 550) {
    plt1.y = -20;
    plt1.x = Phaser.Math.Between(0, 800);
  } else {
    plt1.setVelocityY(20);
  }
  if (plt2.y > 550) {
    plt2.y = -20;
    plt2.x = Phaser.Math.Between(0, 800);
  } else {
    plt2.setVelocityY(30);
  }
  if (plt3.y > 550) {
    plt3.y = -20;
    plt3.x = Phaser.Math.Between(0, 800);
  } else {
    plt3.setVelocityY(40);
  }
  if (plt4.y > 550) {
    plt4.y = -20;
    plt4.x = Phaser.Math.Between(0, 800);
  } else {
    plt4.setVelocityY(50);
  }
  if (plt5.y > 550) {
    plt5.y = -20;
    plt5.x = Phaser.Math.Between(0, 800);
  } else {
    plt5.setVelocityY(60);
  }
  if (plt6.y > 550) {
    plt6.y = -20;
    plt6.x = Phaser.Math.Between(0, 800);
  } else {
    plt6.setVelocityY(70);
  }
  if (cursors.left.isDown && go == false) {
    player.setVelocityX(-260);
    player.anims.play("left", true);
  } else if (cursors.right.isDown && go == false) {
    player.setVelocityX(260);
    player.anims.play("right", true);
  } else if (cursors.up.isDown && player.body.touching.down && go == false) {
    player.setVelocityY(-650);
  } else {
    player.setVelocityX(0);
    player.anims.play("ideal");
  }
}
function cuphit(player, _cup) {
  collectSound.play();
  score += 10;
  scoreText.setText("Score: " + score);
  player.y = 450;
  player.x = 0;
  var x =
    player.x < 100
      ? Phaser.Math.Between(400, 800)
      : Phaser.Math.Between(0, 400);
  ball = balls.create(x, 16, "ball").setScale(0.5);
  ball.setBounce(1);
  ball.setCollideWorldBounds(true);
  ball.setVelocity(-100, 100);
  ball.allowGravity = false;
  ball.anims.play("yes", true);
  cup.enableBody(true, 400, 50, true, true);
}
function gameOver(player, ball) {
  gameOverSound.play();
  if (score > localStorage.getItem("pjhighscore")) {
    pjhighscore = score;
    localStorage.setItem("pjhighscore", pjhighscore);
  }
  highScoreText = this.add.text(
    500,
    16,
    "HighScore: " + localStorage.getItem("pjhighscore"),
    {
      fontSize: "32px",
      color: "#f5f5f5",
      stroke: "#080808",
      strokeThickness: 2,
    }
  );
  this.add.text(120, 250, "Game Over", {
    fontSize: "102px",
    color: "#f5f5f5",
    stroke: "#080808",
    strokeThickness: 2,
  });
  replayText = this.add
    .text(300, 350, "Replay", {
      fontSize: "50px",
      color: "#f5f5f5",
      stroke: "#080808",
      strokeThickness: 2,
    })
    .setInteractive();
  replayText.on("pointerdown", () => {
    this.scene.restart();
    go = false;
    score = 0;
  });
  go = true;
  ball.anims.play("expload", true);
  player.setTint(0xff0000);
  this.physics.pause();
}
