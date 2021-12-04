import Phaser from "phaser";

export default class BombSpawner {
  /**
   * @param {Phaser.Scene} scene
   */
  constructor(scene, bombKey = "bomb") {
    this.scene = scene;
    this.key = bombKey;

    this._group = this.scene.physics.add.group();
  }

  get group() {
    return this._group;
  }

  spawn() {

    const bomb = this.group.create(300, 300, this.key);
    bomb.setBounce(1);

    bomb.setCollideWorldBounds(false);
    bomb.setVelocitx(200, 20);
    return bomb;
  }
}
