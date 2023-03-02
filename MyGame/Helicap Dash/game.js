var config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    parent: "Helicap Dash",
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 350,
    height: 550,
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
var sky;
var aero;
var enemy1;
var enemy2;
var enemy3;
var enemy4;
var enemy5;
var scoreText;
var score = 0;
var gameOverCheck = false;
var gameOverText;
var restartText;
var highScoreText;
var highscore = 0;
var enemySpeed = 200;
var instrText;
var up;
var gameOverAud;
var logobtn;

function preload() {
  this.load.image("logobtn", "../image/logo.png");
  this.load.audio("up", "aud/up.mp3");
  this.load.audio("gameOverAud", "aud/gameover.mp3");
  this.load.image("sky", "img/sky.jpg");
  this.load.spritesheet("aero", "img/aero.png", {
    frameWidth: 46,
    frameHeight: 36,
    endFrame: 30,
  });
  this.load.spritesheet("enemy", "img/enemy.png", {
    frameWidth: 46,
    frameHeight: 36,
    endFrame: 30,
  });
}

function create() {
  up = this.sound.add("up");
  gameOverAud = this.sound.add("gameOverAud");
  sky = this.add.image(0, 0, "sky");
  sky.setOrigin(0, 0);
  sky.setScrollFactor(0);

  aero = this.physics.add.sprite(10, 200, "aero");
  aero.setCollideWorldBounds(true);
  aero.setGravity(100, 800);

  this.anims.create({
    key: "fly",
    frames: this.anims.generateFrameNumbers("aero", { start: 0, end: 1 }),
    frameRate: 10,
    repeat: -1,
  });
  this.input.on("pointerdown", function () {
    aero.setVelocityY(-200);
    aero.setVelocityX(-200);
    if(gameOverCheck==false){
      up.play();
    }
  });
  enemy1 = this.physics.add.sprite(500, Phaser.Math.Between(0, 550), "enemy");
  enemy1.setGravity(0, 0);
  enemy2 = this.physics.add.sprite(550, Phaser.Math.Between(0, 550), "enemy");
  enemy2.setGravity(0, 0);
  enemy3 = this.physics.add.sprite(600, Phaser.Math.Between(0, 550), "enemy");
  enemy3.setGravity(0, 0);
  enemy4 = this.physics.add.sprite(650, Phaser.Math.Between(0, 550), "enemy");
  enemy4.setGravity(0, 0);
  enemy5 = this.physics.add.sprite(700, Phaser.Math.Between(0, 550), "enemy");
  enemy5.setGravity(0, 0);

  this.anims.create({
    key: "efly",
    frames: this.anims.generateFrameNumbers("enemy", { start: 0, end: 1 }),
    frameRate: 10,
    repeat: -1,
  });
  scoreText = this.add.text(16, 16, "Score: 0", {
    fontSize: "20px",
  });
  instrText = this.add.text(230, 16, "Tap the Screen", {
    fontSize: "13px",
    fill: "#ff0000",
  });
  logobtn = this.add.image(1, 500,"logobtn").setInteractive();
  logobtn.setOrigin(0, 0);
  logobtn.on("pointerdown", ()=>{
    window.open("../index.html", "_blank");
  },this);
  this.physics.add.overlap(aero, enemy1, gameOver, null, this);
  this.physics.add.overlap(aero, enemy2, gameOver, null, this);
  this.physics.add.overlap(aero, enemy3, gameOver, null, this);
  this.physics.add.overlap(aero, enemy4, gameOver, null, this);
  this.physics.add.overlap(aero, enemy5, gameOver, null, this);
}

function update() {
  aero.anims.play("fly");
  enemy1.anims.play("efly");
  enemy1.setVelocityX(-enemySpeed);
  enemy2.anims.play("efly");
  enemy2.setVelocityX(-enemySpeed);
  enemy3.anims.play("efly");
  enemy3.setVelocityX(-enemySpeed);
  enemy4.anims.play("efly");
  enemy4.setVelocityX(-enemySpeed);
  enemy5.anims.play("efly");
  enemy5.setVelocityX(-enemySpeed);
  if (enemy1.x < -100) {
    enemySpeed += 1;
    score += 10;
    scoreText.setText("Score: " + score);
    enemy1.x = 400;
    enemy1.y = Phaser.Math.Between(0, 550);
  }
  if (enemy2.x < -100) {
    enemySpeed += 1;
    score += 10;
    scoreText.setText("Score: " + score);
    enemy2.x = 450;
    enemy2.y = Phaser.Math.Between(0, 550);
  }
  if (enemy3.x < -100) {
    enemySpeed += 1;
    score += 10;
    scoreText.setText("Score: " + score);
    enemy3.x = 500;
    enemy3.y = Phaser.Math.Between(0, 550);
  }
  if (enemy4.x < -100) {
    enemySpeed += 1;
    score += 10;
    scoreText.setText("Score: " + score);
    enemy4.x = 450;
    enemy4.y = Phaser.Math.Between(0, 550);
  }
  if (enemy5.x < -100) {
    enemySpeed += 1;
    score += 10;
    scoreText.setText("Score: " + score);
    enemy5.x = 600;
    enemy5.y = Phaser.Math.Between(0, 550);
  }
}

function gameOver() {
  gameOverCheck = true;
  gameOverAud.play();
  aero.setTint(0xff0000);
  this.physics.pause();
  gameOverText = this.add.text(60, 100, "Game Over", {
    fontSize: "40px",
  });
  restartText = this.add
    .text(100, 300, "Restart", {
      fontSize: "30px",
    })
    .setInteractive();
  restartText.on("pointerdown", () => {
    this.scene.restart();
    score = 0;
    enemySpeed = 200;
    gameOverCheck=false;
  });
  if (score > highscore) {
    highscore = score;
  }
  highScoreText = this.add.text(100, 400, "High Score: " + highscore, {
    fontSize: "20px",
  });
}
