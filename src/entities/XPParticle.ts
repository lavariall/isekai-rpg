import Phaser from 'phaser';

export class XPParticle extends Phaser.GameObjects.Image {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'xp_particle');
        scene.add.existing(this);
        
        scene.tweens.add({
            targets: this,
            y: y - 20,
            alpha: 0,
            duration: 1000,
            onComplete: () => this.destroy()
        });
    }
}
