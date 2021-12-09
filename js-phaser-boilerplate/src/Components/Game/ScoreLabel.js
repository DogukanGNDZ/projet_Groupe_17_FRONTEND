import Phaser from "phaser";

const formatScore = (score) => `Pièces récupérées: ${score}`;

export default class ScoreLabel extends Phaser.GameObjects.Text {
  constructor(scene, x, y, score, style) {
    super(scene, x, y, formatScore(score), style);
    console.log("inside class", this.text);
    this.score = score;
  }

  setScore(score) {
    this.score = score;
    this.updateScoreText();
  }

  add(points) {
    this.setScore(this.score + points);
  }
  getScore(){
   return this.score;
  }

  updateScoreText() {
    this.setText(formatScore(this.score));
  }
}
