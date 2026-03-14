import Phaser from 'phaser';

/**
 * A simple visual particle representing experience points (XP).
 * Automatically tweens upwards and fades out upon creation.
 */
export class XPParticle extends Phaser.GameObjects.Image {
    /**
     * Creates an instance of an XPParticle.
     * @param {Phaser.Scene} scene The Phaser scene this particle belongs to.
     * @param {number} x The initial x-coordinate.
     * @param {number} y The initial y-coordinate.
     */
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
