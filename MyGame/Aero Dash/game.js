class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: "StartScene" });
    this.bg;
    this.homelayer1;
    this.homelayer3;
    this.aero;
  }

  preload() {
    this.load.image("bg", "img/bg.jpg");
    this.load.image("homelayer1", "img/homelayer1.png");
    this.load.image("homelayer3", "img/homelayer3.png");

    this.load.spritesheet("aero", "img/aero.png", {
      frameWidth: 443,
      frameHeight: 278,
      endFrame: 2,
    });
  }

  create() {
    this.bg = this.add.tileSprite(
      0,
      0,
      game.config.width,
      game.config.height,
      "bg"
    );
    this.bg.setOrigin(0, 0);
    this.bg.setScrollFactor(0);

    this.homelayer1 = this.add.tileSprite(
      0,
      0,
      game.config.width,
      game.config.height,
      "homelayer1"
    );
    this.homelayer1.setOrigin(0, 0);
    this.homelayer1.setScrollFactor(0);

    this.homelayer3 = this.add.tileSprite(
      0,
      0,
      game.config.width,
      game.config.height,
      "homelayer3"
    );
    this.homelayer3.setOrigin(0, 0);
    this.homelayer3.setScrollFactor(0);

    this.aero = this.physics.add.sprite(130, 200, "aero");
    this.aero.setCollideWorldBounds(true);
    this.aero.setGravity(0, 0);
    this.aero.setScale(0.25);
    this.cameras.main.zoomTo(2, 5000);
    this.cameras.main.centerOn(this.aero.x, this.aero.y);

    this.anims.create({
      key: "fly",
      frames: this.anims.generateFrameNumbers("aero", { start: 0, end: 1 }),
      frameRate: 10,
      repeat: -1,
    });
    this.aero.play("fly");
    const startButton = this.add.text(this.aero.x-100, this.aero.y+60, "Start", {
      fill: "#ffffff",
      fontSize: "60px",
      stroke: "#000000",
      strokeThickness: 4,
    });
    startButton.setInteractive();
    startButton.on("pointerdown", () => {
      this.scene.start("GameScene");
    });
  }
  update() {
    this.bg.tilePositionX += 2;
    this.homelayer1.tilePositionX += 3;
    this.homelayer3.tilePositionX += 4;
  }
}

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
    this.bg;
    this.homelayer1;
    this.homelayer3;
    this.aero;
    this.shake;
    this.enemy1;
    this.enemy2;
    this.enemy3;
    this.scoreText;
    this.score = 0;
    this.gameOverCheck = false;
    this.gameOverText;
    this.restartText;
    this.highScoreText;
    this._adhs = 0;
    this.enemySpeed = 500;
    this.up;
    this.gameOverAud;
  }

  preload() {
    this.load.audio("up", "aud/up.mp3");
    this.load.audio("gameOverAud", "aud/gameover.mp3");
    this.load.image("bg", "img/bg.jpg");
    this.load.image("homelayer1", "img/homelayer1.png");
    this.load.image("homelayer3", "img/homelayer3.png");
    this.load.spritesheet("aero", "img/aero.png", {
      frameWidth: 440,
      frameHeight: 400,
      endFrame: 7,
    });
    this.load.spritesheet("enemy", "img/enemy.png", {
      frameWidth: 440,
      frameHeight: 400,
      endFrame: 2,
    });
  }

  create() {
    this.up = this.sound.add("up");
    this.gameOverAud = this.sound.add("gameOverAud");
    this.bg = this.add.tileSprite(
      0,
      0,
      game.config.width,
      game.config.height,
      "bg"
    );
    this.bg.setOrigin(0, 0);
    this.bg.setScrollFactor(0);

    this.homelayer1 = this.add.tileSprite(
      0,
      0,
      game.config.width,
      game.config.height,
      "homelayer1"
    );
    this.homelayer1.setOrigin(0, 0);
    this.homelayer1.setScrollFactor(0);

    this.homelayer3 = this.add.tileSprite(
      0,
      0,
      game.config.width,
      game.config.height,
      "homelayer3"
    );
    this.homelayer3.setOrigin(0, 0);
    this.homelayer3.setScrollFactor(0);

    this.aero = this.physics.add.sprite(10, 200, "aero");
    this.aero.setCollideWorldBounds(true);
    this.aero.setGravity(100, 800);
    this.aero.setScale(0.25);
    let hitArea = new Phaser.Geom.Circle(
      0,
      0,
      Math.max(this.aero.width, this.aero.height) / 2
    );
    this.aero.setInteractive(hitArea, Phaser.Geom.Circle.Contains);
    this.anims.create({
      key: "fly",
      frames: this.anims.generateFrameNumbers("aero", { start: 0, end: 1 }),
      frameRate: 60,
      repeat: -1,
    });
    this.anims.create({
      key: "hit",
      frames: [{ key: "aero", frame: 2 }],
      frameRate: 20,
    });

    this.aero.play("fly");

    this.input.on("pointerdown", () => {
      this.aero.setVelocityY(-200);
      this.aero.setVelocityX(-200);
      if (this.gameOverCheck == false) {
        this.up.play();
      }
    });

    this.enemy1 = this.physics.add
      .sprite(1400, Phaser.Math.Between(0, 550), "enemy")
      .setScale(0.25);
    this.enemy1.setGravity(0, 0);
    this.enemy2 = this.physics.add
      .sprite(1550, Phaser.Math.Between(0, 550), "enemy")
      .setScale(0.25);
    this.enemy2.setGravity(0, 0);
    this.enemy3 = this.physics.add
      .sprite(1600, Phaser.Math.Between(0, 550), "enemy")
      .setScale(0.25);
    this.enemy3.setGravity(0, 0);

    this.anims.create({
      key: "efly",
      frames: this.anims.generateFrameNumbers("enemy", { start: 0, end: 1 }),
      frameRate: 10,
      repeat: -1,
    });
    this.enemy1.play("efly");
    this.enemy2.play("efly");
    this.enemy3.play("efly");
    this.scoreText = this.add.text(16, 16, "Score: 0", {
      fontSize: "20px",
      stroke: "#000000",
      strokeThickness: 4,
    });

    this.physics.add.overlap(this.aero, this.enemy1, gameOver, null, this);
    this.physics.add.overlap(this.aero, this.enemy2, gameOver, null, this);
    this.physics.add.overlap(this.aero, this.enemy3, gameOver, null, this);
  }

  update() {
    if (this.gameOverCheck == false) {
      this.bg.tilePositionX += 2;
      this.homelayer1.tilePositionX += 3;
      this.homelayer3.tilePositionX += 4;
    } else {
      this.bg.tilePositionX += 0;
      this.homelayer1.tilePositionX += 0;
      this.homelayer3.tilePositionX += 0;
    }

    this.enemy1.setVelocityX(-this.enemySpeed);
    this.enemy2.setVelocityX(-this.enemySpeed);
    this.enemy3.setVelocityX(-this.enemySpeed);

    if (this.enemy1.x < -100) {
      this.enemySpeed += 1;
      this.score += 10;
      this.scoreText.setText("Score: " + this.score);
      this.enemy1.x = 1400;
      this.enemy1.y = Phaser.Math.Between(0, 550);
    }
    if (this.enemy2.x < -100) {
      this.enemySpeed += 1;
      this.score += 10;
      this.scoreText.setText("Score: " + this.score);
      this.enemy2.x = 1450;
      this.enemy2.y = Phaser.Math.Between(0, 550);
    }
    if (this.enemy3.x < -100) {
      this.enemySpeed += 1;
      this.score += 10;
      this.scoreText.setText("Score: " + this.score);
      this.enemy3.x = 1500;
      this.enemy3.y = Phaser.Math.Between(0, 550);
    }
  }
}
function gameOver() {
  this.cameras.main.zoomTo(2, 1000);
  this.cameras.main.centerOn(this.aero.x, this.aero.y);
  this.gameOverCheck = true;
  this.gameOverAud.play();
  // this.aero.setTint(0xff0000);
  this.aero.play("hit");
  this.physics.pause();
  this.gameOverText = this.add.text(
    this.aero.x - 100,
    this.aero.y - 100,
    "Game Over",
    {
      fontSize: "40px",
      stroke: "#000000",
      strokeThickness: 4,
    }
  );
  this.restartText = this.add
    .text(this.aero.x - 250, this.aero.y, "Restart", {
      fontSize: "30px",
      stroke: "#000000",
      strokeThickness: 4,
    })
    .setInteractive();
  this.restartText.on("pointerdown", () => {
    this.scene.restart();
    this.score = 0;
    this.enemySpeed = 500;
    this.gameOverCheck = false;
  });
  this.scoreText.x = this.aero.x + 150;
  this.scoreText.y = this.aero.y;
  if (this.score > localStorage.getItem("_adhs")) {
    this._adhs = this.score;
    localStorage.setItem("_adhs", this._adhs);
  }
  this.highScoreText = this.add.text(
    this.aero.x - 100,
    this.aero.y + 100,
    "High Score: " + localStorage.getItem("_adhs"),
    {
      fontSize: "20px",
      stroke: "#000000",
      strokeThickness: 4,
    }
  );
}

const config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    parent: "Aero Dash",
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1300,
    height: 600,
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
  scene: [StartScene, GameScene],
};

const game = new Phaser.Game(config);
