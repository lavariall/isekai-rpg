import Phaser from 'phaser';
import { SpriteStack } from '../SpriteStack';

/**
 * Handles the visual representation of the hero, including animations and tilting.
 */
export class HeroGraphics extends SpriteStack {
    /**
     * Creates an instance of HeroGraphics.
     * @param {Phaser.Scene} scene The Phaser scene this graphics object belongs to.
     * @param {number} x The initial x-coordinate.
     * @param {number} y The initial y-coordinate.
     */
    constructor(scene: Phaser.Scene, x: number, y: number) {

        // We use the new concept texture prefix 'hero_layer'
        // There are 7 layers total
        super(scene, x, y, 'hero_layer', 7);
        
        // Scale is now 1.0 as assets are pre-processed to correct size
        const scale = 1.0; 
        this.layers.forEach(layer => {
            layer.setScale(scale);
        });

        // Adjust spacing for the new fixed sizes
        this.spacing = 1.0; 
    }

    /**
     * Internal Phaser update loop for the hero graphics.
     * @param {number} time The current time.
     * @param {number} delta The delta time since the last frame.
     */
    preUpdate(time: number, delta: number) {
        super.preUpdate(time, delta);
    }

    /**
     * Updates the hero's visual tilt and rotation based on movement.
     * @param {number} vx The horizontal velocity or movement direction.
     * @param {number} vy The vertical velocity or movement direction.
     */
    public updateMovement(vx: number, vy: number) {

        // Tilting effect
        this.setTilt(vx * 3, vy * 3);

        // Angle based on movement
        if (vx !== 0 || vy !== 0) {
            this.angle = Phaser.Math.RadToDeg(Math.atan2(vy, vx));
        }
    }
}
