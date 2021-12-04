import Phaser from "phaser";
const GROUND_KEY = "ground";
const DUDE_KEY = "dude";
const STAR_KEY = "star";
const BOMB_KEY = "bomb";
const VOITURERG_KEY = "voitureRG";
const VOITURERD_KEY = "voitureRD";
const VOITUREJG_KEY = "voitureJG";
const VOITUREJD_KEY = "voitureJD";
const COFFRE ='coffre';
import ScoreLabel from "./ScoreLabel.js";
import ScoreLabel2 from "./ScoreLabel2.js";
import BombSpawner from "./BombSpawner.js";
import skyAsset from "../../assets/back.png";
import platformAsset from "../../assets/platform.png";
import starAsset from "../../assets/star.png";
import voitureRougeGAsset from "../../assets/voitureRougeGauche.png";
import voitureRougeDAsset from "../../assets/voitureRougeDroite.png";
import voitureJauneGAsset from "../../assets/voitureJauneGauche.png";
import voitureJauneDAsset from "../../assets/voitureJauneDroite.png";
import dudeAsset from "../../assets/dude.png";
import coffre from "../../assets/coffre.png";

class GameScene extends Phaser.Scene {
  constructor() {
    super("game-scene");
    this.player = undefined;
    this.cursors = undefined;
    this.scoreLabel = undefined;
    this.scoreReel = undefined;
    this.stars = undefined;
    this.bombSpawner = undefined;
    this.mechants = undefined;
    this.gameOver = false;
    this.timedEvent = undefined;
    this.coffre =undefined;
  }

  preload() {
    // weight et comme dans configs
    this.load.image("sky", skyAsset);
    this.load.image(COFFRE, coffre);
    this.load.image(GROUND_KEY, platformAsset);
    this.load.image(STAR_KEY, starAsset );
    this.load.image(VOITURERG_KEY, voitureRougeGAsset);
    this.load.image(VOITURERD_KEY, voitureRougeDAsset);
    this.load.image(VOITUREJG_KEY, voitureJauneGAsset);
    this.load.image(VOITUREJD_KEY, voitureJauneDAsset);
    this.load.spritesheet(DUDE_KEY, dudeAsset , {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create() {

        
        this.add.sprite(500,400,'sky');
        this.coffre = this.createCoffre();
        this.Scene = "sky";
        this.player = this.createPlayer();
        this.cursors = this.input.keyboard.createCursorKeys();
        this.mechants = this.add.group(); 
        this.stars = this.createStars();
        //affichage score
        this.scoreLabel = this.createScoreLabel(16, 16, 0);
        this.scoreReel = this.createScoreLabel2(16, 40, 0);
        //apparition des voitures
        this.timedEvent = this.time.addEvent({ delay: 2000, callback: this.createMechants, callbackScope: this, loop: true });
        this.timedEvent = this.time.addEvent({ delay: 2000, callback: this.createMechants2, callbackScope: this, loop: true });
        this.timedEvent = this.time.addEvent({ delay: 2000, callback: this.createMechants3, callbackScope: this, loop: true });
        this.timedEvent = this.time.addEvent({ delay: 1500, callback: this.createMechants4, callbackScope: this, loop: true });
        this.timedEvent = this.time.addEvent({ delay: 1500, callback: this.createMechants5, callbackScope: this, loop: true });
        this.timedEvent = this.time.addEvent({ delay: 1750, callback: this.createMechants6, callbackScope: this, loop: true });
        //collision voiture avec joueur
        this.physics.add.collider(this.player, this.coffre,this.resetCoins,null,this);
        this.physics.add.collider(this.player, this.mechants,this.hitVoiture,null,this);
        this.physics.add.overlap(
          this.player,
          this.stars,
          this.collectStar,
          null,
          this
        );
  
  }

  update() {
    // End GAME
    if (this.gameOver) {
      return;
    }

    //Movement JOUEUR
    this.player.setVelocityX(0);
    this.player.setVelocityY(0);

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-200);
      this.player.anims.play("left", true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(200);
      this.player.anims.play("right", true);
      
    } else if (this.cursors.up.isDown){
      this.player.setVelocityY(-200);
      this.player.anims.play("turn", true);
    } 
    else if (this.cursors.down.isDown){
      this.player.setVelocityY(200);
      this.player.anims.play("turn", true);
    } 
    else {
      this.player.setVelocityX(0);
      this.player.anims.play("turn");
    }
   
  }

  createPlayer() {
    const player = this.physics.add.sprite(500, 700, DUDE_KEY);
    player.setCollideWorldBounds(true);
    /* The 'left' animation uses frames 0, 1, 2 and 3 and runs at 10 frames per second. 
    The 'repeat -1' value tells the animation to loop.
    */
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers(DUDE_KEY, { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: DUDE_KEY, frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers(DUDE_KEY, { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    return player;
  }


  //
  createCoffre(){
    const coff = this.physics.add.sprite(500,780,COFFRE);
    coff.setVelocityX(0);
    coff.setVelocityY(0);
    coff.setBounceX(0.1);
    coff.setCollideWorldBounds(true);
    return coff;
  }
 

  createMechants2(){
    //ligne 1
    const mechant = this.physics.add.sprite(1000, 595, VOITURERG_KEY);
    mechant.setCollideWorldBounds(false);
    mechant.setVelocityX(-200);
    this.mechants.add(mechant);
    return mechant;
    
  }

  createMechants3(){
    //ligne 2
    const mechant = this.physics.add.sprite(0, 540, VOITUREJD_KEY);
    mechant.setCollideWorldBounds(false);
    mechant.setVelocityX(200);
    this.mechants.add(mechant);
    return mechant;
    
  }

  createMechants4(){
    //ligne3 
    const mechant = this.physics.add.sprite(0, 435, VOITURERD_KEY);
    mechant.setCollideWorldBounds(false);
    mechant.setVelocityX(250);
    this.mechants.add(mechant);
    return mechant;
    
  }

  createMechants5(){
    //ligne 4
    const mechant = this.physics.add.sprite(1000, 330, VOITURERG_KEY);
    mechant.setCollideWorldBounds(false);
    mechant.setVelocityX(-250);
    this.mechants.add(mechant);
    return mechant;
    
  }

  createMechants6(){
    //ligne 5
    const mechant = this.physics.add.sprite(1000, 275, VOITUREJG_KEY);
    mechant.setCollideWorldBounds(false);
    mechant.setVelocityX(-250);
    this.mechants.add(mechant);
    return mechant;
    
  }

  createMechants(){
    //ligne 6
    const mechant = this.physics.add.sprite(0, 222, VOITURERD_KEY);
    mechant.setCollideWorldBounds(false);
    mechant.setVelocityX(200);
    this.mechants.add(mechant);
    return mechant;
    
  }

  hitVoiture() {
    //this.scoreLabel.setText("GAME OVER : ( \nYour Score = " + this.scoreLabel.score);
    this.physics.pause();

    //player.setTint(0xff0000);

    //player.anims.play("turn");

    this.gameOver = true;
  }
  createStars() {
    const stars = this.physics.add.group({
      key: STAR_KEY,
      repeat: 2,
      setXY: { x: 200, y: 18, stepX: 255 },
    });

    /*stars.children.iterate((child) => {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });*/

    return stars;
  }

  collectStar(player, star) {
    star.disableBody(true, true);
    this.scoreLabel.add(1);

  }


  createScoreLabel(x, y, score) {
    const style = { fontSize: "32px", fill: "#000" };
    const label = new ScoreLabel(this, x, y, score, style);
    console.log("score:", label);
    this.add.existing(label);

    return label;
  }

  createScoreLabel2(x, y, score) {
    const style = { fontSize: "32px", fill: "#000" };
    const label = new ScoreLabel2(this, x, y, score, style);
    console.log("score:", label);
    this.add.existing(label);

    return label;
  }

  resetCoins(star){

    if (this.stars.countActive(true) === 0) {
      //  A new batch of stars to collect
      this.stars.children.iterate((child) => {
        child.enableBody(true, child.x,12, true, true);
      });
    }
    const scorF= this.scoreLabel.getScore();
    this.scoreLabel.setScore(0);
    console.log("score:", scorF);
    this.scoreReel.add(scorF);
  }

}

export default GameScene;
