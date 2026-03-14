import Phaser from 'phaser';

/**
 * A visual particle effect for the whirlwind attack.
 * Spawns behind the blade and fades out quickly.
 */
export class WhirlwindParticle extends Phaser.GameObjects.Image {
    /**
     * Creates an instance of WhirlwindParticle.
     * @param {Phaser.Scene} scene The Phaser scene this particle belongs to.
     * @param {number} x Initial x-coordinate.
     * @param {number} y Initial y-coordinate.
     * @param {number} angle The orientation of the particle.
     * @param {string} texture The texture key to use.
     */
    constructor(scene: Phaser.Scene, x: number, y: number, angle: number, texture: string = 'wind_particle') {
        super(scene, x, y, texture);
        scene.add.existing(this);

        this.setAlpha(0.6);
        this.setScale(1.0);
        this.angle = angle;

        // Fading and shrinking effect
        scene.tweens.add({
            targets: this,
            alpha: 0,
            scaleX: 0.1,
            scaleY: 0.1,
            duration: 300,
            onComplete: () => this.destroy()
        });
    }
}
