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
const MUR1='mur1';

import ScoreLabel from "./ScoreLabel.js";
import ScoreLabel2 from "./ScoreLabel2.js";
import BombSpawner from "./BombSpawner.js";
import skyAsset from "../../assets/back.png";
import platformAsset from "../../assets/platform.png";
import starAsset from "../../assets/coin16x16.png";
import voitureRougeGAsset from "../../assets/voitureRougeGauche.png";
import voitureRougeDAsset from "../../assets/voitureRougeDroite.png";
import voitureJauneGAsset from "../../assets/voitureJauneGauche.png";
import voitureJauneDAsset from "../../assets/voitureJauneDroite.png";
import dudeAsset from "../../assets/dude.png";
import coffre from "../../assets/coffre.png";

//import des murs
import mur1 from "../../assets/mur1.png";
import mur2 from "../../assets/mur2.png";
import mur3 from "../../assets/mur3.png";
import mur4 from "../../assets/mur4.png";
import mur5 from "../../assets/mur5.png";
import mur8 from "../../assets/mur8.png";
import mur9 from "../../assets/mur9.png";
import mur10 from "../../assets/mur10.png";
import mur11 from "../../assets/mur11.png";

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
    //charge mur
    this.load.image(MUR1, mur1);
    this.load.image("mur2", mur2);
    this.load.image("mur3", mur3);
    this.load.image("mur4", mur4);
    this.load.image("mur5", mur5);
    this.load.image("mur8", mur8);
    this.load.image("mur9", mur9);
    this.load.image("mur10", mur10);
    this.load.image("mur11", mur11);
    
    //charge Voiture
    this.load.image(VOITURERG_KEY, voitureRougeGAsset);
    this.load.image(VOITURERD_KEY, voitureRougeDAsset);
    this.load.image(VOITUREJG_KEY, voitureJauneGAsset);
    this.load.image(VOITUREJD_KEY, voitureJauneDAsset);
    
    this.load.spritesheet(STAR_KEY, starAsset , {
      frameWidth: 15,
      frameHeight: 48,
    });
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
        
        //this.timedEvent = this.time.addEvent({ delay: 2700, callback: this.createMechants, callbackScope: this, loop: true });
        //LIGNE 6
        this.timedEvent = this.time.addEvent({ delay: 0, callback: this.spwan, callbackScope: this, loop: 0 });
        
        //this.timedEvent = this.time.addEvent({ delay: 2700, callback: this.createMechants2, callbackScope: this, loop: true });
        //LIGNE 1
        this.timedEvent = this.time.addEvent({ delay: 0, callback: this.spwan2, callbackScope: this, loop: 0 });
        
        //this.timedEvent = this.time.addEvent({ delay: 2400, callback: this.createMechants3, callbackScope: this, loop: true });
        //LIGNE 2
        this.timedEvent = this.time.addEvent({ delay: 0, callback: this.spwan3, callbackScope: this, loop: 0 });
        
        //this.timedEvent = this.time.addEvent({ delay: 2500, callback: this.createMechants4, callbackScope: this, loop: true });
        //LIGNE 3
        this.timedEvent = this.time.addEvent({ delay: 0, callback: this.spwan4, callbackScope: this, loop: 0 });
        
        //this.timedEvent = this.time.addEvent({ delay: 2400, callback: this.createMechants5, callbackScope: this, loop: true });
        //LIGNE 4
        this.timedEvent = this.time.addEvent({ delay: 0, callback: this.spwan5, callbackScope: this, loop: 0 });
        
        //this.timedEvent = this.time.addEvent({ delay: 2850, callback: this.createMechants6, callbackScope: this, loop: true });
        //LIGNE 5
        this.timedEvent = this.time.addEvent({ delay: 0, callback: this.spwan6, callbackScope: this, loop: 0 });
        
        
        //collision voiture avec joueur
        this.physics.add.collider(this.player, this.coffre,this.resetCoins,null,this);
        //this.physics.add.collider(this.player, this.mechants,this.hitVoiture,null,this);
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
        const platforms = this.createPlatforms();
        this.physics.add.collider(this.player, platforms);
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
    //LIGNE 1
    const mechant = this.physics.add.sprite(1000, 595, VOITURERG_KEY);
    mechant.setCollideWorldBounds(false);
    mechant.setVelocityX(-200);
    this.mechants.add(mechant);
    return mechant;
    
  }

  createMechants3(){
    //LIGNE 2
    const mechant = this.physics.add.sprite(0, 540, VOITUREJD_KEY);
    mechant.setCollideWorldBounds(false);
    mechant.setVelocityX(175);
    this.mechants.add(mechant);
    return mechant;
    
  }

  createMechants4(){
    //LIGNE 3 
    const mechant = this.physics.add.sprite(0, 435, VOITURERD_KEY);
    mechant.setCollideWorldBounds(false);
    mechant.setVelocityX(160);
    this.mechants.add(mechant);
    return mechant;
    
  }

  createMechants5(){
    //LIGNE 4
    const mechant = this.physics.add.sprite(1000, 330, VOITURERG_KEY);
    mechant.setCollideWorldBounds(false);
    mechant.setVelocityX(-150);
    this.mechants.add(mechant);
    return mechant;
    
  }

  createMechants6(){
    //LIGNE 5
    const mechant = this.physics.add.sprite(0, 275, VOITUREJD_KEY);
    mechant.setCollideWorldBounds(false);
    mechant.setVelocityX(130);
    this.mechants.add(mechant);
    return mechant;
    
  }

  createMechants(){
    //LIGNE 6
    const mechant = this.physics.add.sprite(1000, 222, VOITURERG_KEY);
    mechant.setCollideWorldBounds(false);
    mechant.setVelocityX(-170);
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
    this.anims.create({
      key: "piece",
      frames: this.anims.generateFrameNumbers(STAR_KEY, { start: 1, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

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

  createPlatforms() {
    const platforms = this.physics.add.staticGroup();

    platforms.create(114, 169, MUR1);
    platforms.create(508, 169, 'mur2');
    platforms.create(862, 169, 'mur3');
    platforms.create(62, 380, 'mur4');
    platforms.create(296, 380, 'mur5');
    platforms.create(721, 380, 'mur5');
    platforms.create(849, 380, 'mur5');
    platforms.create(192, 487, 'mur8');
    platforms.create(502, 487, 'mur9');
    platforms.create(112, 645, 'mur10');
    platforms.create(665, 645, 'mur11');
    return platforms;
  }
  //LIGNE 1 
  spwan2() {
    let delay2 = Phaser.Math.Between(1500, 3000);
    this.time.addEvent({ delay: delay2, callback: this.createMechants2, callbackScope: this, loop: 0 });
    this.time.addEvent({ delay: delay2, callback: this.spwan2, callbackScope: this, loop: 0 })
  }

  //LIGNE 6
  spwan() {
    let delay1 = Phaser.Math.Between(1500, 3000);
    this.time.addEvent({ delay: delay1, callback: this.createMechants, callbackScope: this, loop: 0 });
    this.time.addEvent({ delay: delay1, callback: this.spwan, callbackScope: this, loop: 0 })
  }

  //LIGNE 2
  spwan3() {
    let delay3 = Phaser.Math.Between(1500, 3000);
    this.time.addEvent({ delay: delay3, callback: this.createMechants3, callbackScope: this, loop: 0 });
    this.time.addEvent({ delay: delay3, callback: this.spwan3, callbackScope: this, loop: 0 })
  }

  //LIGNE 3
  spwan4() {
    let delay4 = Phaser.Math.Between(1500, 3000);
    this.time.addEvent({ delay: delay4, callback: this.createMechants4, callbackScope: this, loop: 0 });
    this.time.addEvent({ delay: delay4, callback: this.spwan4, callbackScope: this, loop: 0 })
  }

  //LIGNE 4
  spwan5() {
    let delay5 = Phaser.Math.Between(1500, 3000);
    this.time.addEvent({ delay: delay5, callback: this.createMechants5, callbackScope: this, loop: 0 });
    this.time.addEvent({ delay: delay5, callback: this.spwan5, callbackScope: this, loop: 0 })
  }

  //LIGNE 5
  spwan6() {
    let delay6 = Phaser.Math.Between(1500, 3000);
    this.time.addEvent({ delay: delay6, callback: this.createMechants6, callbackScope: this, loop: 0 });
    this.time.addEvent({ delay: delay6, callback: this.spwan6, callbackScope: this, loop: 0 })
  }

}


export default GameScene;
