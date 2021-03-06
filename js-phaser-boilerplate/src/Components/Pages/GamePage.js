import Phaser from "phaser";
import GameScene from "../Game/GameScene.js";
import music from "../../assets/density1.mp3";

var game;

const GamePage = () => {
  let phaserGame = `
  
<div class=\"container-gp\">

  <div id="gameDiv" class="d-flex justify-content-center my-3">
  <br>
  <div id="gameDiv"></div>
  </div>

  <span id="playAgain" type="submit" class=\"btn-play\"><a href="game"></a></span>
  
  <audio id="audioPlayer" controls autoplay loop>
  <source 
  src="${music}"
    type="audio/mpeg"/>
  Your browser does not support the audio element.
  </audio>
</div>



<div class=\"traffic-lights shape\">
  <div class=\"shadow\"></div>
  <div class=\"light red\"></div>
  <div class=\"light amber\"></div>
  <div class=\"light green\"></div> 
</div>

<div class=\"traffic-lights-r shape\">
  <div class=\"shadow\"></div>
  <div class=\"light red\"></div>
  <div class=\"light amber\"></div>
  <div class=\"light green\"></div>
</div>
`;




  
  
  let page = document.querySelector("#page");
  page.innerHTML = phaserGame;

  let config = {
    type: Phaser.CANVAS,
    width: 1000,
    height: 800,
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y:  0},
        debug: false,
      },
    },
    scene: [GameScene],
    //  parent DOM element into which the canvas created by the renderer will be injected.
    parent: "gameDiv",
  };

  // there could be issues when a game was quit (events no longer working)
  // therefore destroy any started game prior to recreate it
  if (game) game.destroy(true);
  game = new Phaser.Game(config);
  
  let playAgain = document.querySelector("#playAgain");

  playAgain.addEventListener("click", onPlayAgain);  

  function onPlayAgain(){
    location.reload();
  }
};

export default GamePage;
