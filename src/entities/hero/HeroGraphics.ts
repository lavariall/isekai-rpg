import Phaser from 'phaser';

/**
 * Handles the visual representation of the hero, including animations and tilting.
 */
export class HeroGraphics extends Phaser.GameObjects.Sprite {
    /**
     * Creates an instance of HeroGraphics.
     * @param {Phaser.Scene} scene The Phaser scene this graphics object belongs to.
     * @param {number} x The initial x-coordinate.
     * @param {number} y The initial y-coordinate.
     */
    constructor(scene: Phaser.Scene, x: number, y: number) {
        // Start with the first frame of the idle animation
        super(scene, x, y, 'hero_idle_0');
        scene.add.existing(this);
        
        // Play the idle animation defined in GameScene
        this.play('hero_idle');

        // Scale is now 1.0 as assets are pre-processed to correct size
        this.setScale(1.0);
    }

    /**
     * Updates the hero's visual tilt and rotation based on movement.
     * @param {number} vx The horizontal velocity or movement direction.
     * @param {number} vy The vertical velocity or movement direction.
     */
    public updateMovement(_vx: number, _vy: number) {
        // Hero animation frames are now kept at the same global orientation (upright).
    }
}
